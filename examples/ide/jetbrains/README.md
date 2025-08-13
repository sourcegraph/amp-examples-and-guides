# JetBrains IDE Integration with Amp

Set up Amp with JetBrains IDEs to automatically include your open file and text selection with every message.

**Stack:** IntelliJ IDEA, PyCharm, WebStorm, CLion, all JetBrains IDEs  
**Thread:** TODO

## Amp Prompt

```bash
amp --jetbrains
```

## Result

- Amp automatically includes your currently open file and highlighted text
- No need to copy/paste code or explain context
- Works with all JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.)
- Seamless integration through MCP Server plugin

## Try it locally

### 1. Install the JetBrains MCP Server plugin

- Open your JetBrains IDE
- Go to **Settings/Preferences** → **Plugins**
- Search for and install **MCP Server**
- Restart your IDE

### 2. Install or update Amp CLI

```bash
npm install -g @sourcegraph/amp
```

### 3. Launch Amp with JetBrains integration

In your IDE terminal or external terminal:

```bash
amp --jetbrains
```

### 4. Test the integration

1. Open a code file in your editor
2. Highlight a method or function
3. In the Amp terminal, ask: "What does this function do?"

Amp will automatically know your current file and selection context.

### Troubleshooting

If Amp doesn't connect to your IDE, switch to classic terminal mode:
- Go to **Settings/Preferences** → **Tools** → **Terminal**
- Uncheck "Use new terminal" option
- Restart the terminal
