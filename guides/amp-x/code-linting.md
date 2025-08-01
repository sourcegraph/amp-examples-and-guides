# Automating Code Linting

With `amp --execute`, you can send the output of other shell commands directly to Amp to take action on. Allowing Amp to automate the cleanup of issues discovered by code linters configured in a project.

`bun run lint:fix | amp -x 'apply fixes for the identified linting issues`

[Example Thread](https://ampcode.com/threads/T-28cb7911-14bf-41c3-9605-8aff8cc7b85a)
