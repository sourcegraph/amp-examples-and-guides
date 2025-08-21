---
title: "JetBrains IDE Integration with Amp"
description: "Set up Amp with JetBrains IDEs to automatically include your open file and text selection with every message."
tags: ["ide", "jetbrains", "intellij", "pycharm", "webstorm", "integration", "plugin"]
order: 6
---

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
- Seamless integration through the Amp JetBrains plugin

## Try it locally

### 1. Install or update Amp CLI

```bash
npm install -g @sourcegraph/amp
```

### 2. Launch Amp with JetBrains integration

In your IDE terminal or external terminal:

```bash
amp --jetbrains
```

The Amp CLI will automatically detect JetBrains IDEs and install the plugin. You may need to restart your IDE after the first run.

### 3. Test the integration

1. Open a code file in your editor
2. Highlight a method or function
3. In the Amp terminal, ask: "What does this function do?"

Amp will automatically know your current file and selection context.

### Troubleshooting

If Amp doesn't connect to your IDE:
1. Ensure you're running `amp --jetbrains` from the same directory as your JetBrains project
2. Make sure you have the latest version of Amp CLI: `npm update -g @sourcegraph/amp`
3. Restart your JetBrains IDE after the plugin installation
4. Check that the Amp plugin is enabled in **Settings** → **Plugins**
