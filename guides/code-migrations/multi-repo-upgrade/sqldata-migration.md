# System.Data.SqlClient to Microsoft.Data.SqlClient Migration Plan

## Overview

This document outlines the migration plan for upgrading from `System.Data.SqlClient` to `Microsoft.Data.SqlClient` across 15 bank application projects (bank-app-1 through bank-app-15).

**Migration URL Reference**: <https://github.com/dotnet/SqlClient/blob/main/porting-cheat-sheet.md>

## Current State Analysis

### Project Structure
- **Projects**: 15 identical .NET Framework 4.8 applications (bank-app-1 to bank-app-15)
- **Architecture**: 4-tier structure per project:
  - `AcmeBankApp.Core` - Business logic layer
  - `AcmeBankApp.Data` - Data access layer
  - `AcmeBankApp.Web` - Presentation/UI layer  
  - `AcmeBankApp.Tests` - Unit testing project

### Current System.Data.SqlClient Usage

#### Primary Usage Locations
1. **DataHelper.cs** (in each Data project)
   - Direct usage of `SqlConnection`, `SqlCommand`, `SqlDataAdapter`, `SqlParameter`
   - Line 4: `using System.Data.SqlClient;`
   - Contains legacy ADO.NET patterns with security vulnerabilities

2. **AccountService.cs** (in each Data project)
   - Uses System.Data.SqlClient namespace for data operations

3. **Project Configuration Files**:
   - **packages.config**: `System.Data.SqlClient` version 4.6.0
   - **.csproj files**: Assembly references to System.Data.SqlClient 4.6.0
   - **Web.config/App.config**: Connection string providers

4. **Test Files**:
   - **LegacyDataHelperTests.cs**: Direct SqlParameter usage

### Dependencies per Project
- EntityFramework 6.2.0
- System.Data.SqlClient 4.6.0
- .NET Framework 4.8

## REVISED Migration Strategy (Post Oracle Review)

### Phase 0: Critical Compatibility Resolution (NEW - REQUIRED)
1. **Entity Framework Upgrade**: Upgrade EF 6.2.0 → 6.4.4 across all projects
2. **Provider Services Installation**: Add Microsoft.Data.SqlClient.EntityFramework package
3. **DbConfiguration Setup**: Configure provider services registration
4. **Connection String Security**: Update all connection strings with encryption settings
5. **Canary Testing**: Test Phase 0 changes on bank-app-1 only before proceeding

### Phase 1: Pre-Migration Validation  
1. **Performance Baseline**: Capture ADO.NET performance counters
2. **Build Verification**: Verify all 15 projects build successfully
3. **Integration Testing**: Add TLS connection health probes
4. **Native Dependencies**: Verify SNI.dll deployment on build agents

### Phase 2: Package Migration
1. **Entity Framework Upgrade**: EF 6.2.0 → 6.4.4 (if not done in Phase 0)
2. **Provider Package Installation**: Microsoft.Data.SqlClient + EntityFramework extension
3. **Remove System.Data.SqlClient**: Clean removal from packages.config
4. **Update Project References**: Modify .csproj with new assembly references

### Phase 3: Code Migration
1. **Provider Configuration**: Update DbConfiguration and Web.config provider settings
2. **Namespace Updates**: Change using statements to Microsoft.Data.SqlClient
3. **Connection String Updates**: Add Encrypt=false and TrustServerCertificate=true
4. **Assembly Redirects**: Verify AutoGenerateBindingRedirects for crypto dependencies

### Phase 4: Enhanced Post-Migration Validation
1. **Build Verification**: All projects must build without errors or warnings
2. **Integration Testing**: TLS handshake validation and connection pooling tests
3. **Performance Validation**: Compare performance counters vs baseline (±5% tolerance)
4. **Security Scanning**: CodeQL/SonarQube scan for SQL injection patterns

## Detailed Implementation Plan

### Files to Modify Per Project (REVISED - 84+ total files across 15 projects)

#### Phase 0: Entity Framework Upgrade (NEW - 6 files per project)
1. `AcmeBankApp.Data/packages.config`
   - **Change**: `<package id="EntityFramework" version="6.2.0" targetFramework="net48" />`
   - **To**: `<package id="EntityFramework" version="6.4.4" targetFramework="net48" />`
   - **Add**: `<package id="Microsoft.Data.SqlClient.EntityFramework" version="5.0.2" targetFramework="net48" />`

2. `AcmeBankApp.Data/DbConfiguration.cs` (NEW FILE)
   - **Create**: Provider services registration class

3. `AcmeBankApp.Data/App.config`
   - **Update**: Provider configuration and connection strings

4. `AcmeBankApp.Web/packages.config`
   - **Update**: EntityFramework version, add Microsoft.Data.SqlClient packages

5. `AcmeBankApp.Web/Web.config`
   - **Update**: Connection strings with encryption parameters
   - **Add**: DbProviderFactories registration

6. `AcmeBankApp.Web/AcmeBankApp.Web.csproj`
   - **Add**: AutoGenerateBindingRedirects=true property

#### Package Configuration (4 files per project)
1. `AcmeBankApp.Data/packages.config`
   - **Add**: `<package id="Microsoft.Data.SqlClient" version="5.1.1" targetFramework="net48" />`
   - **Remove**: `<package id="System.Data.SqlClient" version="4.6.0" targetFramework="net48" />`

2. `AcmeBankApp.Web/packages.config`  
   - **Add**: `<package id="Microsoft.Data.SqlClient" version="5.1.1" targetFramework="net48" />`
   - **Remove**: `<package id="System.Data.SqlClient" version="4.6.0" targetFramework="net48" />`

3. `AcmeBankApp.Data/AcmeBankApp.Data.csproj`
   - **Change**: Lines 47-49 System.Data.SqlClient reference
   - **To**: Microsoft.Data.SqlClient reference with updated version and path

4. `AcmeBankApp.Web/AcmeBankApp.Web.csproj`
   - **Change**: System.Data.SqlClient reference  
   - **To**: Microsoft.Data.SqlClient reference

#### Source Code (4 files per project)
1. `AcmeBankApp.Data/DataHelper.cs`
   - **Change**: `using System.Data.SqlClient;` (line 4)
   - **To**: `using Microsoft.Data.SqlClient;`

2. `AcmeBankApp.Data/Services/AccountService.cs`
   - **Change**: `using System.Data.SqlClient;`
   - **To**: `using Microsoft.Data.SqlClient;`

3. `AcmeBankApp.Tests/LegacyDataHelperTests.cs`
   - **Change**: `using System.Data.SqlClient;`
   - **To**: `using Microsoft.Data.SqlClient;`

4. `AcmeBankApp.Data/App.config`
   - **Update**: Entity Framework provider configuration
   - **Add**: DbProviderFactories registration and encryption settings

### Migration Commands (REVISED)

#### Phase 0: Entity Framework Upgrade (per project)
```powershell
# Navigate to each project directory
cd bank-app-{n}

# Upgrade Entity Framework first
nuget.exe update EntityFramework -ProjectName AcmeBankApp.Data -Version 6.4.4
nuget.exe update EntityFramework -ProjectName AcmeBankApp.Web -Version 6.4.4

# Install Microsoft.Data.SqlClient.EntityFramework provider
nuget.exe install Microsoft.Data.SqlClient.EntityFramework -Version 5.0.2 -ProjectName AcmeBankApp.Data
```

#### NuGet Package Updates (per project)
```powershell
# Install new SqlClient package (use update instead of uninstall/install)
nuget.exe update Microsoft.Data.SqlClient -Version 5.1.1 -ProjectName AcmeBankApp.Data
nuget.exe update Microsoft.Data.SqlClient -Version 5.1.1 -ProjectName AcmeBankApp.Web

# Remove old package (after new one is installed)
nuget.exe uninstall System.Data.SqlClient -ProjectName AcmeBankApp.Data
nuget.exe uninstall System.Data.SqlClient -ProjectName AcmeBankApp.Web
```

#### Required Configuration Files (NEW)

**DbConfiguration.cs** (Create in AcmeBankApp.Data):
```csharp
using System.Data.Entity;
using Microsoft.Data.SqlClient.EntityFramework;

[DbConfigurationType(typeof(EfConfig))]
public class EfConfig : DbConfiguration
{
    public EfConfig()
    {
        SetProviderServices("Microsoft.Data.SqlClient", 
            SqlProviderServices.Instance);
        SetProviderFactory("Microsoft.Data.SqlClient",
            Microsoft.Data.SqlClient.SqlClientFactory.Instance);
    }
}
```

**Web.config/App.config Updates**:
```xml
<connectionStrings>
  <add name="DefaultConnection" 
       connectionString="Server=(LocalDB)\MSSQLLocalDB;Database=AcmeBank;Encrypt=false;TrustServerCertificate=true;Integrated Security=true;" 
       providerName="Microsoft.Data.SqlClient" />
</connectionStrings>

<system.data>
  <DbProviderFactories>
    <add name="Microsoft.Data.SqlClient"
         invariant="Microsoft.Data.SqlClient"
         description=".NET Framework Data Provider for SQL Server (Microsoft)"
         type="Microsoft.Data.SqlClient.SqlClientFactory, Microsoft.Data.SqlClient" />
  </DbProviderFactories>
</system.data>
```

#### Build Commands (per project)
```bash
# Restore packages
nuget.exe restore AcmeBankApp.sln

# Build solution with x64 platform for SNI compatibility
dotnet msbuild AcmeBankApp.sln /p:Configuration=Debug /p:Platform=x64

# Run tests with x64 platform
vstest.console.exe AcmeBankApp.Tests\bin\Debug\AcmeBankApp.Tests.dll -- RunConfiguration.TargetPlatform=x64
```

#### Performance Baseline Commands
```powershell
# Capture ADO.NET performance counters before migration
Get-Counter "\\.NET Data Provider for SqlServer(*)\\*" -MaxSamples 10
```

## Risk Assessment

### Low Risk Items
- **Namespace Changes**: Simple find/replace operation
- **API Compatibility**: Microsoft.Data.SqlClient is a drop-in replacement
- **Connection Strings**: Existing connection strings should work unchanged

### Medium Risk Items
- **Entity Framework Integration**: Need to verify EF 6.2.0 compatibility
- **Package Restoration**: Ensure new packages download correctly
- **Build Configuration**: .csproj reference updates

### CRITICAL BLOCKERS (Oracle Review Findings)

### 🚨 BLOCKER 1: Entity Framework 6.2.0 Incompatibility
- **Issue**: EF 6.2.0 does NOT understand Microsoft.Data.SqlClient provider services
- **Impact**: EF will silently continue using System.Data.SqlClient from framework
- **Required Action**: Must upgrade to **Entity Framework 6.4.4** + **Microsoft.Data.SqlClient.EntityFramework**
- **Status**: BLOCKING - Cannot proceed without EF upgrade

### 🚨 BLOCKER 2: Breaking Connection String Changes
- **Issue**: Microsoft.Data.SqlClient 5.x defaults Encrypt=true (was false)
- **Impact**: Servers without valid TLS certificates will fail to connect
- **Required Action**: Add explicit connection string parameters
- **Status**: BLOCKING - Must update all connection strings

### 🚨 BLOCKER 3: Native SNI Dependencies  
- **Issue**: Microsoft.Data.SqlClient requires platform-specific native libraries
- **Impact**: Build/test agents may fail without proper SNI.dll deployment
- **Required Action**: Verify native binary deployment in CI/CD
- **Status**: BLOCKING - Could cause runtime failures

## Potential Additional Issues
1. **TLS Version Requirements**: Default minimum TLS 1.2 may fail on older SQL Servers
2. **Connection Pooling Changes**: Different idle connection resiliency behavior
3. **Performance Impact**: SNI native path could affect CPU usage

## Quality Assurance Plan

### Pre-Migration Testing
1. **Baseline Build**: Verify all 15 projects build successfully
2. **Baseline Tests**: Run all unit tests and document results
3. **Database Connectivity**: Verify database connections work

### Post-Migration Testing
1. **Build Verification**: All projects must build without errors or warnings
2. **Unit Test Execution**: All existing tests must pass
3. **Integration Testing**: Enhanced verification including:
   - TLS handshake validation with Encrypt=false setting
   - Connection pooling behavior validation
   - User authentication (ValidateUserLegacy method)
   - Database queries (ExecuteQuery, ExecuteParameterizedQuery)
   - Account operations (AccountService functionality)
4. **Performance Testing**: Compare ADO.NET counters vs baseline (±5% tolerance)
5. **Security Scanning**: CodeQL scan for SQL injection patterns

### Success Criteria
- ✅ All 15 projects build successfully
- ✅ All existing unit tests pass
- ✅ No runtime exceptions during basic operations
- ✅ Database connectivity maintained
- ✅ No performance degradation

## Timeline and Execution

### Automated Execution Strategy
1. **Parallel Processing**: Use subagents to handle multiple projects simultaneously
2. **Batch Operations**: Group similar file modifications
3. **Rollback Strategy**: Git branching for easy reversion

### Execution Order
1. **Projects 1-5**: First batch for validation
2. **Projects 6-10**: Second batch after first batch success
3. **Projects 11-15**: Final batch

### REVISED Estimated Duration
- **Phase 0 (EF Upgrade + Canary)**: 2 hours (EF upgrade + bank-app-1 testing)
- **Phase 1 (Pre-Migration)**: 45 minutes (performance baseline + validation)
- **Package Updates**: 60 minutes (15 projects × 4 minutes including EF)
- **Code Changes + Configuration**: 90 minutes (namespace updates + config files)
- **Enhanced Build & Test Verification**: 120 minutes (performance validation)
- **Total**: ~6 hours (increased due to EF upgrade requirements)

## Version Control Strategy

### Git Branch Strategy
- **Branch Name**: `feature/migrate-to-microsoft-data-sqlclient`
- **Commit Strategy**: 
  - One commit per project for package updates
  - One commit per project for code changes
  - Final commit with build verification

### Pull Request Requirements
- Include build verification results
- Document any issues encountered
- List all modified files
- Include test execution summary

## Rollback Plan

### If Migration Fails
1. **Git Reset**: `git checkout main` to return to original state
2. **Package Restoration**: `nuget restore` with original packages.config
3. **Build Verification**: Ensure original state builds correctly

### Partial Failure Handling
- Complete migration on successful projects
- Document failed projects and specific issues
- Create separate remediation plan for failures

## Success Metrics

### Technical Metrics
- **Build Success Rate**: 100% (15/15 projects must build)
- **Test Pass Rate**: 100% (all existing tests must pass)
- **Zero Regression**: No new compilation errors or runtime exceptions

### Process Metrics
- **Automation Coverage**: 95%+ of changes automated
- **Manual Intervention**: Minimal manual fixes required
- **Documentation Quality**: Complete migration log

## Post-Migration Recommendations

### Immediate Actions
1. **Security Assessment**: Address SQL injection vulnerabilities (separate task)
2. **Dependency Updates**: Consider upgrading Entity Framework to 6.4+
3. **Code Modernization**: Implement proper error handling and logging

### Long-term Improvements
1. **Migration to .NET Core/.NET 5+**: Plan future framework upgrade
2. **Dependency Injection**: Replace static DataHelper with proper DI
3. **Repository Pattern**: Implement proper data access patterns

## Dependencies and Prerequisites

### Tools Required
- NuGet CLI
- MSBuild or Visual Studio
- Git for version control
- VSTest.Console for test execution

### Environment Requirements
- .NET Framework 4.8 installed
- Visual Studio or Build Tools
- SQL Server LocalDB for testing

### Team Prerequisites
- Access to modify all 15 repositories
- Build server access for CI/CD validation
- Database access for integration testing
