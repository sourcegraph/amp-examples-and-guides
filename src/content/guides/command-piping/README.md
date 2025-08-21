---
title: "Command Piping"
description: "Command piping allows you to connect the output of one command to the input of another command to create complex workflows and automate tasks."
category: "Development Workflow"
order: 2
---

# Command Piping

Command piping is a powerful feature in the terminal that allows you to connect the output of one command to the input of another command. This can be used to create complex workflows and automate tasks.

Using [`amp --execute`](https://ampcode.com/news/amp-x), you can send the output of any shell command to Amp to quickly create agentic workflows.


## Code Linting

Amp can quickly cleanup linting issues identified by a projects existing code linting configuration.

`bun run lint | amp -x 'apply fixes for the identified linting issues`

[Example Thread](https://ampcode.com/threads/T-28cb7911-14bf-41c3-9605-8aff8cc7b85a)


## Log Analysis

## Build Troubleshooting

Amp can quickly fix build issues identified by a projects existing build configuration.

### Build system issues

```console
❯ ./gradlew build

[Incubating] Problems report is available at: file:///Users/trly/sourcegraph/field-engineering/training-java-monolith-refactor/build/reports/problems/problems-report.html

Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/8.14.2/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
```

[Example Thread](https://ampcode.com/threads/T-194bc44d-9b7b-4f87-bb42-d43f0d4d04aa)


### Fixing build issues with Amp

```console
❯ ./gradlew wrapper --warning-mode all | amp -x 'remediate any issues that will cause problems when upgrading to gradle 9'
Fixed the Gradle 9.0 compatibility issues:
- Updated property assignments to use `=` syntax
- Replaced deprecated `sourceCompatibility`/`targetCompatibility` with modern `java {}` block

The remaining warnings are from the Liberty plugin itself and can't be fixed without plugin updates.
