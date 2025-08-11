# .NET 4.8 to Core 8 Migration Guide

## Preparation Phase

### Source Project Requirements
- Install OpenCover: `choco install opencover.portable -y`
- Verify build: `dotnet build` or via `msbuild`
- Set up `tree-sitter/c-sharp`
- CLI tools (optional) or VS Code
- Are you able to verify the migration? Do you need to build a test harness/client CLI project first?

### Generate Agent.md
- Document build/run/test procedures
- Always include "build and test" in Amp prompts

## Assessment Phase

### Safety Check
- Assess current test coverage [Example prompt -> Get test coverage report](https://ampcode.com/threads/T-4789e69b-5fcd-4a1a-8b3b-007286d713d5)
- Identify all business logic requirements and extract into `source-methods-vs-business-logic.md`
Note: We will do this after the migration and generate a `target-methods-vs-business-logic.md` file and compare.

### Test Coverage Enhancement
1. Build and test current state
2. Add unit tests for key components -> [Example prompt to backfill unit tests](- https://ampcode.com/threads/T-89dfffa2-fae6-4c6d-bbd5-a4574fa91605)
3. Re-run build and test
4. Generate updated coverage report

**Output:** Comprehensive test suite

## Analysis Phase

### Method Inventory
Use Tree-sitter C# to generate method report and ask the oracle for business logic classification and summary.

Create table with:
- Filename
- Method name
- Classification (noise vs business logic)
- Business logic description with enough detail extracted to verify after migration

Optional: Add unit tests for business rules

## Unit test coverage
- Generate unit test coverage report and review risk
- Add additional unit tests if required

## Planning Phase

### Multi-Step Migration Plan
Ask Amp to generate a plan for you. Instructions should include;
1. Analyise this project and create phase-by-phase breakdown - file per phase
2. Oracle review of plan
3. Build/test verification between phases
4. Maintain unit test coverage
5. API Inputs and Outputs/ contracts should remain the same. There should be no impact to clients that consume this prjects API.
5. Store plan to disk
6. Create progress tracking file
7. Document any blockers in progress file

## Execution Phase

### Phase-by-Phase Migration
- Ask Amp to create a new branch and Execute each phase, ask amp to sue subagents to maintain main thread context
- Ask amp to Build, compile, and run tests before starting next phase
- Document blockers in progress file with detailed reasoning
- If things do not go to plan, revise the original plan and start again. 
- Commit per phase to have waypoints you can come back to.


## Verification Phase

### Final Validation
- Run Tree-sitter comparison (migrated vs main branch)
- Identify missing or extra methods
- Flag any untested work as risk
- Build / test / run migrated code

## Success Criteria
- Maintained test coverage
- All business logic preserved
- Build/test passes at each phase
- Complete method inventory matches

## Next steps 
- Update CI scripts / github workflow actions with new framework build/ test steps
