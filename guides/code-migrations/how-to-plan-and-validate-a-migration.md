# Plan and Validate a migration with Amp and Deterministic Method/Rule Analysis

This guide shows how to use Amp and a CST/AST‑first workflow for deterministic migration planning and validation. Amp extracts accurately methods via tree-sitter and documents business rules. Then checks diffs pre/post, and proves changes with tools—not assumptions. 

With the correct instructions Amp can be instructed to install all dependencies, automatically create git worktrees to compare pre/post migration states, and generate a comprehensive report of the migration so you can evaluate the migration to determine if it needs further refinement before you scale this out to more projects/services.

### Benefits of this approach
- Deterministic by design: re‑run the same queries before/after and compare results.
- Evidence over assumptions: Amp uses tools, builds a small CLI to extract/validate rules, and shows build/test/AST outputs.
- Catches the right things: missing/extra methods and rule drift (operator/threshold/shape changes).
- LLM on rails: structured CST/AST keeps work reproducible and explainable.
- Prevent/reduce LLM hallucinations and automate high‑risk, repetitive validation work with repeatable prompting


## Amp + Tree-sitter Pipeline - How it works.

```
Parse → Extract → Classify → Generate → Compare
```

| Step | Purpose | Output |
|------|---------|--------|
| **Parse** | Source code analysis | CST/AST nodes |
| **Extract** | Method & guard detection | Structured data |
| **Classify** | Business logic vs noise | Classifications |
| **Generate** | Create manifest | BLM JSON |
| **Compare** | Drift detection | Diff report |


## Prompt patterns to use for migration use cases

Use clear, constraint‑heavy prompts that force tool‑verified work and evidence. These were used in the Go migration PR and Amp thread:

- Planning and scope
  - `“Come up with a migration plan to update service method signatures to endpoint‑style generics. Scope is limited to signature changes and minimal handler/test adaptations. Business logic must remain the same.”`
  - `“Document the plan and all outputs under `./specs/migration` and keep a `progress.md` with gates at each phase.”`
- Deterministic extraction and classification
  - `“Use tree‑sitter to extract a table of methods. Classify each as business logic vs noise. For business logic, extract guard rules to compare post‑migration.”`
- Build the validator
  - `“Build a CLI using tree‑sitter to detect implementation drift. It must compare operator tokens and resolved thresholds, confirm the exported method set, and validate new signature shapes.”`
- No assumptions — evidence only
  - `“Do not assume the migration is successful. Provide evidence: build output, test output, AST validation results, exported set, per‑method rule counts, and an intentional drift test that fails.”`
- Prove the tool works
  - `“Create a branch/worktree with deliberate rule changes that have been purposefully introduced business rule changes. Run the validator and include failing output to prove detection.”`
- Replay validation against a specific baseline
  - `“Re‑run validation using the pre‑migration commit as baseline (e.g., `c685680…`) against the current code.”`

These types of prompts ensure Amp:

- Makes no assumptions — it must use tools (build, test, AST) and show outputs.
- Creates deterministic tooling (Tree‑sitter) and then proves it works by catching intentional drift.
- Uses a multi‑phase plan with per‑phase files and a `progress.md`; keep build and tests green after each phase.


### Full working example: Migration planning prompt 

[Example Amp thread](https://ampcode.com/threads/T-99c8c924-9596-4910-8e04-4b76a09c36d6)

```text
I want to come up with a migration plan to update this codebase, currently i uses 1.10 syntax but it's on GO 1.24. 
The method signature in the files in the services dir should use the updated newer method signature.

As an example 
BEFORE: func (s * SampleService) Hello(ctx context.Context, req *dto.HelloRequest) (*dto.HelloResponse, error) {} 
AFTER: func (s *SampleService) Hello(ctx context.Context, req *endpoint.HTTPRequest[* sampleService.HelloRequest]) (*endpoint.HTTPResponse[*grabservicepb.HelloResponse], error) {} 

The scope of this migration is limited to changes related to implementating this change only. 

The business logic needs to remain the same and the test may also need to be refactored with some of these changes. 

I want you to use the go tree sitter package to do some initial analysis and come up with a plan. 

The Planning should have a few phases 

Business rule Extraction 
1. Extract a list of business logic, use tree sitter and generate a table of methods, for each method look at the code and work out if it is a business logic method or just noise
2. If it is business logic extract the rules into the table so we can validate the method still meets that rule after we migrate 

Migration Planning 
1. Come up with a migration plan to update the services and tests to use the new signature structure, the plan should have multiple phases, which each phase in its own file and a progress .md file so we can execute the migration over multiple threads. 
2. In the plan it should make sure the code builds and the tests are passing at the end of every phase 

Migration Validation 
1. We need check the migration to make sure the all the core methods for business rules are still there 
2. Are the business rules still doing the same thing? If the logic has changed we need to make sure we flag it as a blocker, you should build a CLI tool you can use to extract and validate the logic for example if >100 ends up changing to <100 or <98 this should be flagged as an issue. To ensure this doesn't get missed we should make a CLI tool you can call yourself to check for each method. We can call this validation phase - implementation drift validation 
3. We should check the scope of the migration to ensure we only updated what was required to meet the requirement of implementating the new signature 
4. If new methods are added or new functionality is added into the codebase please flag it, you should detect this by compareing the output from Steps 1, 2, and 3 and comparing it with original business rule extraction output. 

Can you come up with a plan on how to implement this and also insure the plan uses subagents where required 

Use the oracle to come up with this plan
```

## References

- Go sample migration PR (endpoint‑style generics + AST validator):
  - https://github.com/Isuru-F/example-com-go-api/pull/1
  - Amp thread with full prompt trail (public): https://ampcode.com/threads/T-99c8c924-9596-4910-8e04-4b76a09c36d6
- .NET reference migration (CST checks flagged two extra methods):
  - Repo: https://github.com/Isuru-F/dot-net-4-8-migration-example
  - PR: https://github.com/Isuru-F/dot-net-4-8-migration-example/pull/1
  - Highlight: https://github.com/Isuru-F/dot-net-4-8-migration-example/pull/1#issuecomment-3166767509
