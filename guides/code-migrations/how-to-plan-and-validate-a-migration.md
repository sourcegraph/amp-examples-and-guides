# Plan and Validate Migrations with Amp Toolbox: A Deterministic Approach

## Overview: Why This Process Matters

Large-scale code migrations require 100% accuracy - there's no room for "probably correct" assumptions. LLMs naturally fill gaps with assumptions when information is incomplete, which can lead to silent business logic drift that breaks functionality. Using Amp + Custom Amp toolbox tools gives the LLMs access to deterministic data and the ability to easily detect when there is an issue to rework it. Additionally, using subagents with extracted methods and symbols from these tools (instead of feeding entire large files) significantly reduces hallucinations by providing focused, structured input to each Amp sub agent. 

**The Core Problem:**
When migrating code at scale, LLMs face incomplete information and will make assumptions to fill gaps. This creates several risks:
- Business logic changes silently without detection
- Method signatures altered beyond intended scope  
- Critical validation rules modified or removed
- New functionality added outside migration requirements

**The Solution: Amp + Toolbox + Custom Tools**

Amp Toolbox provides LLMs with deterministic tools that eliminate guesswork:
- **Parse code structures** using tree-sitter instead of pattern matching
- **Extract business rules** systematically rather than inferring them
- **Detect logic drift** automatically through before/after comparisons
- **Validate scope adherence** by comparing intended vs actual changes

Don't let the LLM make assumptions, give it the tools to get the information. If the tools don't exist, create them!

We recommend using tools to express specific, deterministic and project-local behaviour, like:
- Running test and build actions in the project
- Exposing CLI tools in a controlled manner

This guide demonstrates a systematic approach using Amp Toolbox to eliminate guesswork from the migration process through custom tools and validation.

## Toolbox Setup

Before starting any migration, set up a structured toolbox organization:

**Set the toolbox location for migration tools**:
   ```bash
   export AMP_TOOLBOX="/Users/yourname/Library/Application Support/Amp/toolbox"
   ```


**Tools Created:**
These are the example tools that were created for this migration:
- [`go-parser`](guides/code-migrations/migration_tools/toolbox/go-parser): Extract actual method signatures, not assumed ones using tree-sitter-go 
- [`bizlint-go`](guides/code-migrations/migration_tools/toolbox/bizlint-go): Detect business logic changes with precision - calls go-parser and adds business logic analysis



## Migration Process Overview

The migration process consists of 4 phases designed to eliminate assumptions and ensure accuracy:

```text
1. Create Tools → 2. Generate Plan → 3. Execute Migration → 4. Validate Results
```

### Phase 1: Create Toolbox Tools

Create specialized Amp toolbox tools to handle your specific migration needs, this is critical as it lets the LLMs work with deterministic data without assumptions.

**Example Tools:**
- **parser-go**: Tree-sitter wrapper to extract actual method signatures, not assumed ones
- **biz-drift**: Detect business logic changes with precision to flag any drift

**Key Prompts for Tool Creation:**

```text
Can you please create a toolbox tool using this example template https://github.com/sourcegraph/amp-contrib/blob/main/tools/tool-template.js as a guide

The tool should take a GO file and then extract the methods/classes and the method signature so we can pass in a file and get an array of objects as output.

Use tree-sitter go package to parse it.

It must follow the tool-template guideline closely - there is more documentation about how tools work here https://ampcode.com/news/toolboxes

Also create unit tests, you can make a copy of the go file here [path/to/test/file] as a test case.
```

**Example Thread:** [Creating Amp Toolbox Tools](https://ampcode.com/threads/T-6d2c0658-8182-45f1-9d64-46de4c0270ae)

### Phase 2: Generate Migration Plan

Ask Amp to create a comprehensive migration plan that leverages your custom tools.

**Key Planning Prompts:**

```text
I want to come up with a migration plan to update this codebase...

The Planning should have a few phases:

Business Rule Extraction:
1. Extract a list of business logic, use tree sitter and generate a table of methods, for each method look at the code and work out if it is a business logic method or just noise
2. If it is business logic extract the rules into the table so we can validate the method still meets that rule after we migrate

Migration Planning:
1. Come up with a migration plan to update the services and tests to use the new signature structure, the plan should have multiple phases, which each phase in its own file and a progress .md file so we can execute the migration over multiple threads.
2. In the plan it should make sure the code builds and the tests are passing at the end of every phase

Migration Validation:
1. We need check the migration to make sure all the core methods for business rules are still there
2. Are the business rules still doing the same thing? If the logic has changed we need to make sure we flag it as a blocker

Can you make sure the new plan contains a step 0 that will allow to test the tools are working correct. It should check parser-go extracts the expected symbols, it should check that bizlint-go picks up the correct rules drift as expected.

Use the oracle to come up with this plan and also ensure the plan uses subagents where required.
```

**Example Thread:** [Migration Plan Generation](https://ampcode.com/threads/T-1df11399-7728-4217-9257-a846fc41f4b7)

### Phase 3: Execute Migration with Toolbox Tools

Execute the migration plan with **Step 0** always being tool validation.

**Step 0: Validate Tools Work as Expected**
- Test that parser-go exports the correct list of methods
- Verify biz-drift can detect intentional logic changes
- Ensure all custom tools function before proceeding

**Execution Principles:**
- Use deterministic tools rather than assumptions
- Maintain build and test success after each phase  
- Document progress in phase-specific files
- Leverage subagents for parallel work where appropriate

**Example Thread:** [Migration Test Execution](https://ampcode.com/threads/T-45a41ce9-19d0-4b99-84be-05e8096c81ad)

### Phase 4: Validate Migration with Toolbox Tools

Prove the migration succeeded through evidence, not assumptions.

**Validation Requirements:**

```text
Do not assume the migration is successful. Provide evidence:
- Build output showing success
- Test output showing all tests pass
- AST validation results from custom tools
- Exported method set comparison
- Per-method rule counts and verification
- Business logic drift detection results

Create a branch/worktree with deliberate rule changes that have been purposefully introduced business rule changes. Run the validator and include failing output to prove detection works.
```

**What to Validate:**
1. **Build and Test Outputs**: Prove everything compiles and passes
2. **Tool Usage Documentation**: What tools were used and their outputs
3. **Business Logic Integrity**: No silent drift in rules or thresholds
4. **Scope Adherence**: Only intended changes were made
5. **Method Completeness**: All expected methods preserved

## Amp + Tree-sitter Pipeline

```text
Parse → Extract → Classify → Generate → Compare
```

| Step | Purpose | Output |
|------|---------|--------|
| **Parse** | Source code analysis via custom tools | CST/AST nodes |
| **Extract** | Method & guard detection | Structured data |
| **Classify** | Business logic vs noise | Classifications |
| **Generate** | Create manifest | BLM JSON |
| **Compare** | Drift detection | Diff report |

## Constraint-Heavy Prompt Patterns

Use these prompt patterns that force tool-verified work and evidence:

### Planning and Scope
```text
"Come up with a migration plan to update service method signatures to endpoint-style generics. Scope is limited to signature changes and minimal handler/test adaptations. Business logic must remain the same. [provide example before and after]"

"Document the plan and all outputs under ./specs/migration and keep a progress.md with gates at each phase."
```

### Deterministic Extraction
```text
"Use the go-parser tool to extract a table of methods. Classify each as business logic vs noise. For business logic, extract guard rules to compare post-migration."
```


### Evidence-Only Validation
```text
"Do not assume the migration is successful. Provide evidence: build output, test output, AST validation results, exported set, per-method rule counts, and an intentional drift test that fails."
```

### Proof of Tool Effectiveness
```text
"Create a branch/worktree with deliberate rule changes that have been purposefully introduced business rule changes. Run the validator and include failing output to prove detection."
```

## Benefits of This Approach

- **Deterministic by design**: Re-run the same queries before/after and compare results
- **Evidence over assumptions**: Amp uses tools, builds CLIs to extract/validate rules, shows build/test/AST outputs  
- **Catches the right things**: Missing/extra methods and rule drift (operator/threshold/shape changes)
- **LLM on rails**: Structured CST/AST keeps work reproducible and explainable
- **Prevent/reduce LLM hallucinations**: Automate high-risk, repetitive validation work with repeatable prompting

## Example: Go Method Signature Migration

Here's how the process worked for a real Go migration using endpoint-style generics:

**Before:**
```go
func (s *SampleService) Hello(ctx context.Context, req *dto.HelloRequest) (*dto.HelloResponse, error) {}
```

**After:**
```go
func (s *SampleService) Hello(ctx context.Context, req *endpoint.HTTPRequest[*sampleService.HelloRequest]) (*endpoint.HTTPResponse[*grabservicepb.HelloResponse], error) {}
```


**Migration Process:**
1. **Step 0**: Validate tools work - parser-go should extract expected symbols, bizlint-go should detect drift
2. **Extract**: Use tree-sitter to generate method table and classify business logic
3. **Plan**: Multi-phase approach with progress tracking
4. **Execute**: Update signatures while preserving business logic
5. **Validate**: Compare before/after using custom tools, prove no logic drift

## Working Examples

- **Tool Creation Process**: [Amp Toolbox Tools Creation](https://ampcode.com/threads/T-6d2c0658-8182-45f1-9d64-46de4c0270ae)
- **Migration Planning**: [Detailed Migration Plan Generation](https://ampcode.com/threads/T-1df11399-7728-4217-9257-a846fc41f4b7) 
- **Execution Example**: [Migration Test Execution](https://ampcode.com/threads/T-45a41ce9-19d0-4b99-84be-05e8096c81ad)

These examples demonstrate the complete workflow from tool creation through successful migration validation, proving the approach eliminates assumptions and ensures accuracy.
