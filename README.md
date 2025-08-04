# Amp Examples and Guides

## How to use this resource library

This repository is intended to be supplemental to the [Amp Manual](https://ampcode.com/manual).

## [Guides](./guides/)

Guides are intended to provide high-level guidance on using Amp with various development workflows and patterns, they shouldn't focus too specifically on any given language or pattern.

|Guide|Description
|:---|:---|
|[Command Piping](guides/command-piping/README.md)|Using the output of other commands to provide input to an Amp prompt|

## [Examples](./examples/)

Examples are intended to be used to address specific use-cases with languages, frameworks, or tools. Examples should be concise, focused, and should always contain a Thread link to provide additional context on how Amp solved an example use-case.

|Example|Description
|:---|:---|
|[Amp + Code Search](examples/amp+codesearch/README.md)|Utilizing Sourcegraph code search to make targeted changes across multiple repositories|

## Repository Layout

The repository is organized in such a way as to allow easy access to guides and examples for specific languages, frameworks, workflows, etc.

Below is a general example of how content should be organized within the repository.

```
.
├── examples
│   └── amp+codesearch
│       └── README.md
├── guides
│   └── command-piping
│       └── README.md
└── README.md
```

