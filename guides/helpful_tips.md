The purpose of this doc is to document tips dropfeed into a Slack channel 

<details>
<summary>Oracle Tip</summary>
💡 Amp Coding Tip 1: Meet Oracle - Your New Code Review Partner
"Oracle" - a powerful code analysis tool powered by OpenAI's o3 model that works alongside your main coding agent. Think of it as having a senior developer looking over your shoulder!
When to use Oracle:
  
* Code reviews: ```"Use the oracle to review the last commit's changes"```
* Debugging tricky issues: ```"Help me fix this bug. Use the oracle as much as possible"```
* Refactoring complex code: ```"Work with the oracle to figure out how we can refactor this duplication"```

Pro tip: Oracle requires explicit prompting - it won't activate automatically. Just mention "use the oracle" in your requests when you need that extra analytical power for complex coding challenges.
It's slower than Amp's main agent but incredibly thorough for analysis tasks. Perfect for those moments when you need a second pair of eyes on critical code! 🔍

</details>



<details>
<summary>Dan's Amp X post</summary>
:bulb: Amp Coding Tip 2: here is another helpful tip on how to use Amp (from one of our power users in Amp discord)
P.S. feel free to share any top tips/hacks/insights you've learnt from the first initial days of your Amp trial in :thread: 
<img width="803" height="876" alt="image" src="https://github.com/user-attachments/assets/31d4de53-bbfb-4145-8013-e1f2a8bdf7e2" />
</details>


<details>
<summary>AGENT.md tip</summary>
:bulb: Amp Coding Tip 3: AGENT.md Tip of the Day
Amp uses AGENT.md files to give your AI agent long-term memory and context.

🔹 No AGENT.md? No problem. Amp will offer to generate one for you.
🔹 You can create or update AGENT.md manually or just ask:
Update AGENT.md based on what I told you in this thread.

📎 Want to give your agent more context?
Just @-mention files in your AGENT.md like this:
```
See @doc/style.md and @rules/internal-api-conventions.md.  
When making commits, see @doc/git-commit-instructions.md.
```
🔍 Mentions follow these rules:
* Relative paths are relative to the AGENT.md file.
* Absolute paths and @~/some/path work too.
* Mentions in code blocks are ignored.
* Globs (e.g., @src/**/*.md) are not supported.

✅ You can have multiple AGENT.md files across your repo and in ~/.config/AGENT.md.
</details>



<details>
<summary>Amp CLI @ reference</summary>
:bulb: Amp Coding Tip 4: Amp CLI Tip: Use @ to Reference Files in Your Prompt
When using Amp CLI in interactive mode, you can type @ to bring up a fuzzy file search. This lets you quickly reference files in your prompt like:
  
"Summarize what's happening in @src/utils/helpers.ts"

Amp will include the content of the mentioned file in the context, so you don’t have to copy-paste anything manually. Super handy for large codebases! 

- You can also @ reference images and screenshots in the CLI, in addition to code and other text files.
- You can also @ reference files in non-interactive mode. For instance ```amp -x  "summarise recent changes in @/lib folder"```
</details>



<details>
<summary>Leverage Git Commands for Code Review and Debugging</summary>
:bulb: Amp Coding Tip 5: Leverage Git Commands for Code Review and Debugging
  
Instead of manually copying code changes or trying to describe what changed, use Git commands directly in your Amp prompts for more efficient workflows:
- Quick code review: "Run ```git diff``` to see the current changes and review them for potential edge cases or bugs"
- Debug recent changes: "Run ```git blame``` on [file] and figure out who added [problematic line], then look at the full commit to understand the context"
- Clean up before committing: "Run ```git diff``` to see all changes and remove any debug statements or console.logs"
- Understand feature history: "Find the commit that added [feature] using ```git log```, examine the whole commit, then help me improve this feature"

This approach gives Amp direct visibility into your actual code changes rather than requiring you to manually describe or copy-paste diffs. It's especially powerful because Amp can execute these commands directly and analyse the results in context, making code reviews and debugging much more thorough and efficient.

**Bonus:** If you frequently use specific git commands with custom flags, add them to your ```amp.commands.allowlist``` in settings to avoid permission prompts each time!
  
</details>


<details>
<summary>Refactoring with Amp</summary>
:bulb: Amp Coding Tip 6: Refactoring with Sourcegraph Amp
  
Our field guide reveals proven steps for successful code refactoring and migrations with Amp. Here's the process our FDEs use:
:magnifying_glass: Step 1: Plan Before You Code Ask Amp to compile requirements and identify breaking changes first. For example:
- What dependencies need updating?
- What are the breaking changes?
- How will the build environment change?
:dart: Step 2: Start with One File Guide Amp through migrating a single file first, then use it as a template:13
Check the diffs in @HeaderComponent.vue on the most recent commit and use it as a template to complete the migration

:clipboard: Step 3: Create Exhaustive Checklists Have Amp generate a checklist of all files needing migration with checkboxes - ensures nothing gets missed!

:robot_face: Step 4: Leverage Subagents Use subagents for discrete tasks - they have separate context windows and return only essential information, perfect for handling multiple files.

:spanner: Step 5: Integrate External Tools Use CLI tools for migration-specific tasks (e.g., dotnet upgrade assistant, JaCoCo for dead code analysis).

:white_tick: Step 6: Use Oracle for Review Ask the oracle to review diffs, analyze errors, and validate against your migration goals.

:zap: Step 7: Set Up Hooks Configure hooks to automatically correct common migration mistakes as they happen.

Check out our complete Code Migration Field Notes: https://ampcode.com/guides/code-migration#use-agentmd-files
The guide includes real examples from Vue 2→3 and .NET migrations. Let me know if you'd like help getting started! :rocket:

</details>


