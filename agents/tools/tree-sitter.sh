#!/usr/bin/env bash
set -uo pipefail
shopt -s lastpipe

# Global helpers
die() {
  printf '✗ %s\n' "$*" >&2
  exit 1
}
log() { printf '%s\n' "$*"; }
cleanup() { [[ -f ${TMP_QUERY:-} ]] && rm -f "$TMP_QUERY"; }
trap cleanup EXIT

description() {
  cat <<'EOF'
This tool allows you to extract methods, functions, classes, and other code structures
from source files using tree-sitter parsing.

It supports multiple programming languages and can extract various types of code elements:

- Methods/functions (Python, JavaScript, Java, C/C++, Go, Ruby, etc.)
- Class definitions
- Import/export statements
- Custom queries for specific language constructs
EOF
}

inputSchema() {
  local describe_action='
  The tree-sitter action to perform:
  list-languages shows all supported languages,
  extract-methods extracts all methods/functions from a file,
  extract-classes extracts class definitions,
  extract-imports extracts import/include statements,
  custom-query runs a custom tree-sitter query,
  parse-file shows the full AST for debugging,
  install-grammar installs tree-sitter grammar for specified languages
  '
  export describe_action
  jq -n '{
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["list-languages", "extract-methods", "extract-classes", "extract-imports", "custom-query", "parse-file", "install-grammar"],
        description: env.describe_action
      },
      args: { type: "array", items: { type: "string" }, description: "Additional arguments like file paths, query strings, or language overrides" },
      target: {type: "string", description: "Target file path to parse" }
    },
    required: ["action"]
  }'
}

schema() {
  jq -n --argjson inputSchema "$(inputSchema)" --arg desc "$(description)" '{
    name: "tree-sitter",
    description: $desc,
    inputSchema: $inputSchema
  }'
}

# Language and grammar mappings
declare -A FILE_EXT_TO_LANG=(
  [py]=python [js]=javascript [ts]=typescript [java]=java [c]=c
  [cpp]=cpp [cc]=cpp [cxx]=cpp [hpp]=cpp [rb]=ruby [go]=go [rs]=rust
  [php]=php [cs]=c_sharp [swift]=swift [kt]=kotlin [scala]=scala
  [sh]=bash [bash]=bash [html]=html [css]=css [json]=json
  [yaml]=yaml [yml]=yaml [xml]=xml
)

declare -A GRAMMAR_REPO=(
  [python]=https://github.com/tree-sitter/tree-sitter-python
  [javascript]=https://github.com/tree-sitter/tree-sitter-javascript
  [typescript]=https://github.com/tree-sitter/tree-sitter-typescript
  [java]=https://github.com/tree-sitter/tree-sitter-java
  [c]=https://github.com/tree-sitter/tree-sitter-c
  [cpp]=https://github.com/tree-sitter/tree-sitter-cpp
  [ruby]=https://github.com/tree-sitter/tree-sitter-ruby
  [go]=https://github.com/tree-sitter/tree-sitter-go
  [rust]=https://github.com/tree-sitter/tree-sitter-rust
  [php]=https://github.com/tree-sitter/tree-sitter-php
  [c_sharp]=https://github.com/tree-sitter/tree-sitter-c-sharp
  [swift]=https://github.com/tree-sitter/tree-sitter-swift
  [kotlin]=https://github.com/fwcd/tree-sitter-kotlin
  [scala]=https://github.com/tree-sitter/tree-sitter-scala
  [bash]=https://github.com/tree-sitter/tree-sitter-bash
  [html]=https://github.com/tree-sitter/tree-sitter-html
  [css]=https://github.com/tree-sitter/tree-sitter-css
  [json]=https://github.com/tree-sitter/tree-sitter-json
  [yaml]=https://github.com/ikatyang/tree-sitter-yaml
  [xml]=https://github.com/ObserverOfTime/tree-sitter-xml
)

detect_language() {
  local file="$1"
  local ext="${file##*.}"
  echo "${FILE_EXT_TO_LANG[$ext]:-unknown}"
}

get_grammar_repo() {
  [[ ${GRAMMAR_REPO[$1]+_} ]] || return 1
  echo "${GRAMMAR_REPO[$1]}"
}

get_method_query() {
  local lang="$1"
  case "$lang" in
  python) echo '(function_def name: (identifier) @method.name parameters: (parameters) @method.params)' ;;
  javascript | typescript) echo '[(method_definition name: (property_identifier) @method.name) (function_declaration name: (identifier) @method.name) (arrow_function) @method.arrow]' ;;
  java) echo '(method_declaration name: (identifier) @method.name parameters: (formal_parameters) @method.params)' ;;
  c | cpp) echo '(function_definition declarator: (function_declarator declarator: (identifier) @method.name parameters: (parameter_list) @method.params))' ;;
  ruby) echo '(method name: (identifier) @method.name parameters: (method_parameters)? @method.params)' ;;
  go) echo '[(method_declaration name: (field_identifier) @method.name) (function_declaration name: (identifier) @method.name)]' ;;
  rust) echo '(function_item name: (identifier) @method.name parameters: (parameters) @method.params)' ;;
  *) return 1 ;;
  esac
}

get_class_query() {
  local lang="$1"
  case "$lang" in
  python) echo '(class_definition name: (identifier) @class.name)' ;;
  javascript | typescript) echo '(class_declaration name: (identifier) @class.name)' ;;
  java) echo '(class_declaration name: (identifier) @class.name)' ;;
  cpp) echo '(class_specifier name: (type_identifier) @class.name)' ;;
  ruby) echo '(class name: (constant) @class.name)' ;;
  go) echo '(type_declaration (type_spec name: (type_identifier) @class.name type: (struct_type)))' ;;
  rust) echo '(struct_item name: (type_identifier) @class.name)' ;;
  *) return 1 ;;
  esac
}

get_import_query() {
  local lang="$1"
  case "$lang" in
  python) echo '[(import_statement) (import_from_statement) @import]' ;;
  javascript | typescript) echo '[(import_statement) (export_statement) @import]' ;;
  java) echo '(import_declaration (scoped_identifier) @import)' ;;
  c | cpp) echo '(preproc_include path: (string_literal) @import)' ;;
  go) echo '(import_declaration (import_spec path: (interpreted_string_literal) @import))' ;;
  rust) echo '(use_declaration argument: (scoped_identifier) @import)' ;;
  *) return 1 ;;
  esac
}

# Centralized query execution
run_query() {
  local kind="$1" file="$2" query="$3" language="${4:-$(detect_language "$file")}"
  [[ -f "$file" ]] || die "File not found: $file"

  TMP_QUERY=$(mktemp)
  echo "$query" >"$TMP_QUERY"

  local tag
  case "$kind" in
  method) tag='@method\.name' ;;
  class) tag='@class\.name' ;;
  import) tag='@import' ;;
  *) tag='' ;;
  esac

  log "${kind^}s in $file ($language):"

  local parsers_dir="$HOME/.config/tree-sitter/parsers"
  local lang_dir="$parsers_dir/$language"

  local output
  if [[ -d "$lang_dir" ]] && output=$(cd "$lang_dir" && tree-sitter query "$TMP_QUERY" "$file" 2>/dev/null); then
    if [[ $tag && -n "$output" ]]; then
      echo "$output" | grep -E "capture: [0-9]+ - ${tag#@}, start:" | sed -E 's/.*text: `([^`]*)`/\1/' | sort -u | sed 's/^/  - /'
    elif [[ -n "$output" ]]; then
      echo "$output"
    else
      log "  No results found"
    fi
  else
    log "  No results or grammar missing for $language"
  fi
  return 0
}

install_grammar() {
  local lang="$1"
  local parsers_dir="$HOME/.config/tree-sitter/parsers"
  local lang_dir="$parsers_dir/$lang"

  local repo_url
  repo_url=$(get_grammar_repo "$lang") || {
    log "  ✗ Grammar repository not found for language: $lang"
    return 1
  }

  log "  Installing grammar for $lang..."
  mkdir -p "$parsers_dir"

  if [[ -d "$lang_dir" ]]; then
    log "    Grammar directory already exists, updating..."
    if [[ -d "$lang_dir/.git" ]]; then
      if ! (cd "$lang_dir" && git pull --quiet 2>/dev/null); then
        log "    Git pull failed, removing corrupted directory and re-cloning..."
        rm -rf "$lang_dir"
        git clone --quiet "$repo_url" "$lang_dir" 2>/dev/null || {
          log "    ✗ Failed to clone $lang grammar"
          return 1
        }
      fi
    else
      log "    Directory exists but is not a git repository, removing and re-cloning..."
      rm -rf "$lang_dir"
      git clone --quiet "$repo_url" "$lang_dir" 2>/dev/null || {
        log "    ✗ Failed to clone $lang grammar"
        return 1
      }
    fi
  else
    log "    Cloning grammar repository..."
    git clone --quiet "$repo_url" "$lang_dir" 2>/dev/null || {
      log "    ✗ Failed to clone $lang grammar"
      return 1
    }
  fi

  log "    Building grammar..."
  if (cd "$lang_dir" && tree-sitter generate >/dev/null 2>&1 && tree-sitter build >/dev/null 2>&1); then
    log "  ✓ $lang grammar installed successfully"
  else
    log "    ✗ Failed to build $lang grammar"
    return 1
  fi
}

# Action implementations
run_list_languages() {
  log "Supported languages:"
  for lang in "${!GRAMMAR_REPO[@]}"; do
    log "  - $lang"
  done | sort
  return 0
}

run_extract_methods() {
  local target="$1" language="${2:-$(detect_language "$target")}"
  local query
  query=$(get_method_query "$language") || die "Language not supported for method extraction: $language"
  run_query method "$target" "$query" "$language"
  return 0
}

run_extract_classes() {
  local target="$1" language="${2:-$(detect_language "$target")}"
  local query
  query=$(get_class_query "$language") || die "Language not supported for class extraction: $language"
  run_query class "$target" "$query" "$language"
  return 0
}

run_extract_imports() {
  local target="$1" language="${2:-$(detect_language "$target")}"
  local query
  query=$(get_import_query "$language") || die "Language not supported for import extraction: $language"
  run_query import "$target" "$query" "$language"
  return 0
}

run_custom_query() {
  local target="$1" custom_query="$2" language="${3:-$(detect_language "$target")}"
  [[ -f "$target" ]] || die "File not found: $target"
  [[ -n "$custom_query" ]] || die "Custom query required"

  TMP_QUERY=$(mktemp)
  echo "$custom_query" >"$TMP_QUERY"

  log "Custom query results for $target:"
  if [[ "$language" != "unknown" ]] && tree-sitter query --scope "$language" "$TMP_QUERY" "$target" 2>/dev/null; then
    :
  else
    tree-sitter query "$TMP_QUERY" "$target" 2>/dev/null || log "Query failed or no results"
  fi
  return 0
}

run_parse_file() {
  local target="$1" language="${2:-$(detect_language "$target")}"
  [[ -f "$target" ]] || die "File not found: $target"

  log "AST for $target ($language):"
  if [[ "$language" != "unknown" ]]; then
    if ! tree-sitter parse --scope "$language" "$target" 2>/dev/null; then
      tree-sitter parse "$target" 2>/dev/null || log "Parse failed: Grammar for $language may not be installed"
    fi
  else
    tree-sitter parse "$target" 2>/dev/null || log "Parse failed: Could not detect language or grammar not available"
  fi
  return 0
}

run_install_grammar() {
  if [[ $# -eq 0 ]]; then
    log "Install tree-sitter grammar for specified languages."
    log ""
    log "Usage: install-grammar <language1> [language2] ... [languageN]"
    log ""
    log "Available languages:"
    log "  python, javascript, typescript, java, c, cpp, ruby, go, rust"
    log "  php, c_sharp, swift, kotlin, scala, bash, html, css, json, yaml, xml"
    log ""
    log "Examples:"
    log '  {"action": "install-grammar", "args": ["go", "python"]}'
    log '  {"action": "install-grammar", "args": ["javascript", "typescript", "rust"]}'
    return 0
  fi

  local languages=("$@")
  log "Installing grammar for: ${languages[*]}"
  log ""

  command -v git >/dev/null 2>&1 || die "git is required but not installed"
  command -v tree-sitter >/dev/null 2>&1 || die "tree-sitter is required but not installed"

  local success_count=0
  local total_count=${#languages[@]}

  for lang in "${languages[@]}"; do
    if install_grammar "$lang"; then
      ((success_count++))
    fi
  done

  log ""
  log "Installation complete: $success_count/$total_count grammars installed successfully"

  if [[ $success_count -eq $total_count ]]; then
    log "✓ All requested grammars installed successfully!"
  else
    log "✗ Some grammars failed to install"
    return 1
  fi
}

# Action dispatcher
declare -A DISPATCH=(
  [list - languages]=run_list_languages
  [extract - methods]=run_extract_methods
  [extract - classes]=run_extract_classes
  [extract - imports]=run_extract_imports
  [custom - query]=run_custom_query
  [parse - file]=run_parse_file
  [install - grammar]=run_install_grammar
)

run_tree_sitter_command() {
  local action="$1"
  local fn="${DISPATCH[$action]:-}"
  [[ $fn ]] || die "Unknown action: $action"
  "$fn" "${@:2}"
}

main() {
  case "$TOOLBOX_ACTION" in
  describe) schema ;;
  execute)
    local input_json
    input_json=$(cat)
    local action
    action=$(jq -r '.action' <<<"$input_json")
    local target
    target=$(jq -r '.target // ""' <<<"$input_json")

    local args=()
    readarray -t args < <(jq -r '.args[]? // empty' <<<"$input_json")

    case "$action" in
    extract-methods | extract-classes | extract-imports | custom-query | parse-file)
      [[ -n "$target" ]] || die "Target file required for action: $action"
      run_tree_sitter_command "$action" "$target" "${args[@]}"
      ;;
    list-languages | install-grammar)
      run_tree_sitter_command "$action" "${args[@]}"
      ;;
    *)
      run_tree_sitter_command "$action" "${args[@]}"
      ;;
    esac
    ;;
  *)
    die "Set TOOLBOX_ACTION to describe or execute, then run again"
    ;;
  esac
}

main "$@"
