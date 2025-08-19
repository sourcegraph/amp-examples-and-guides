# Integrating Code Search and Amp

> **_NOTE:_**: Combining Code Search and Amp should only be presented to **existing**
Code Search customers with a valid use-case.

## Using Amp on Multiple Repositories

### Qualifying Questions

* Is searching their **entire** organizations codebase a requirement? (Searching
across **EVERY** repository?)
  * **YES:** Contact [#discuss-field-engineering](https://sourcegraph.slack.com/archives/C095PTMTS31)
  * **NO:** Proceed to next question(s)

* Do they regularly work with multiple applications that interact with one
another? (Separate frontend/backend and internal libraries, all in different repositories.)
  * **YES:** Use Amp's
  [multi-root support](https://ampcode.com/news/multi-root-workspaces). Code Search is not required
  * **NO:** Code Search is not needed. Amp's functionality will serve their needs

### Examples

#### Remediating vulnerabilities in multiple repositories

##### Without Code Search (Example [Thread](https://ampcode.com/threads/T-22ad3789-6991-4380-ae08-801ac4d96af4)) [Preferred Solution]

Assume that the developer's repositories that all interact with each other are in a common root directory

```bash
~/sourcegraph/log4j travis.lyons@sourcegraph.com
❯ ls
Permissions Size User Date Modified Name
drwxr-xr-x@    - trly 31 Jul 10:28  Lipstick
drwxr-xr-x@    - trly 31 Jul 10:28  ndbench
drwxr-xr-x@    - trly 31 Jul 10:28  sample-vulnerable-log4j-direct-lib
drwxr-xr-x@    - trly 31 Jul 10:28  spring-webflow
drwxr-xr-x@    - trly 31 Jul 10:28  udpated-vulnerable-log4j-direct-lib
drwxr-xr-x@    - trly 31 Jul 10:28  updated-vulnerable-log4j-direct-app
```

1. Use Amp execute to take action on everything in the current directory.

```bash
amp -x 'upgrade each application to the latest version of log4j,
2.15.1 and commit the change to a local log4j/2.15.1 branch'

Successfully upgraded all applications to log4j 2.15.1 and committed changes to the `log4j/2.15.1` branch in each repository. The upgrades included:

- **Lipstick**: Updated from 2.8.2 to 2.15.1
- **ndbench**: Updated log4j-to-slf4j from 2.14.1 to 2.15.1
- **sample-vulnerable-log4j-direct-lib**: Updated from 2.14.1 to 2.15.1
- **spring-webflow**: Updated from 2.14.0 to 2.15.1
- **udpated-vulnerable-log4j-direct-lib**: Updated from 2.14.1 to 2.15.1
- **updated-vulnerable-log4j-direct-app**: Updated from 2.14.1 to 2.15.1
```

##### With Code Search (Example [Thread](https://ampcode.com/threads/T-652c6d27-8ae1-4e61-923d-a4d40071cb4b))

1. Identify repositories requiring remediation (log4j2 vulnerability)

```bash
src search -json -- '
file:build\.gradle[.kts]?|pom\.xml patterntype:regexp
org\.apache\.logging\.log4j 2\.(0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16)(\.[0-9]+)' \
| jq '.Results[] | {file: .file.path, repository: .repository.name}'
```

```json
{
  "file": "build.gradle",
  "repository": "github.com/spring-projects/spring-webflow"
}
{
  "file": "ndbench-es-plugins/build.gradle",
  "repository": "github.com/Netflix/ndbench"
}
{
  "file": "lib/build.gradle",
  "repository": "github.com/dhdiemer/sample-vulnerable-log4j-direct-lib"
}
{
  "file": "lib/build.gradle",
  "repository": "github.com/dhdiemer/udpated-vulnerable-log4j-direct-lib"
}
{
  "file": "app/build.gradle",
  "repository": "github.com/dhdiemer/updated-vulnerable-log4j-direct-app"
}
{
  "file": "build.gradle",
  "repository": "github.com/Netflix/Lipstick"
}
```

2. Pipe the search results into Amp

```bash
src search -json -- 'file:build\.gradle[.kts]?|pom\.xml
org\.apache\.logging\.log4j 2\.(0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16)(\.[0-9]+)
patterntype:regexp' \
| jq '.Results[] | {file: .file.path, repository: .repository.name}' \
| amp -x 'Update log4j in each of the listed repositories to the latest version, 2.15.1
using a sub-agent per repository, clone then commit the change locally in a new branch named log4j/2.15.1
Provide a list of which repositores were successfully updated and which were not.'

## Update Results

**All 6 repositories were successfully updated:**

✅ **spring-projects/spring-webflow** - Updated from 2.14.0 → 2.15.1
✅ **Netflix/ndbench** - Updated from 2.14.1 → 2.15.1
✅ **dhdiemer/sample-vulnerable-log4j-direct-lib** - Updated from 2.14.1 → 2.15.1
✅ **dhdiemer/udpated-vulnerable-log4j-direct-lib** - Updated from 2.14.1 → 2.15.1
✅ **dhdiemer/updated-vulnerable-log4j-direct-app** - Updated from 2.14.1 → 2.15.1
✅ **Netflix/Lipstick** - Updated from 2.8.2 → 2.15.1

All repositories now have the changes committed on branch `log4j/2.15.1`.
```

3. Validate Changes

```bash
>_ git log -n 1
commit b2c4637907281c95b74de3e6d3a8331c55292b80 (HEAD -> log4j/2.15.1)
Author: Travis Lyons <travis.lyons@sourcegraph.com>
Date:   Thu Jul 31 10:16:45 2025 -0400

    Update log4j to 2.15.1

    Co-authored-by: Amp <amp@ampcode.com>
    Amp-Thread-ID: https://ampcode.com/threads/T-652c6d27-8ae1-4e61-923d-a4d40071cb4b



>_ git diff HEAD~1
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
modified: build.gradle
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
@ build.gradle:129 @ project(':lipstick-server') {
    runtime 'com.netflix.eureka:eureka-client:1.1.141'
    runtime 'org.elasticsearch:elasticsearch:5.4.1'
    runtime 'org.elasticsearch.client:transport:5.4.1'
    runtime 'org.apache.logging.log4j:log4j-core:2.8.2'
    runtime 'org.apache.logging.log4j:log4j-api:2.8.2'
    runtime 'org.apache.logging.log4j:log4j-core:2.15.1'
    runtime 'org.apache.logging.log4j:log4j-api:2.15.1'
    runtime 'org.hibernate:hibernate-entitymanager:3.6.0.Final'
    runtime 'org.codehaus.jackson:jackson-mapper-asl:1.9.10'
  }
```
