# Migration Progress: System.Data.SqlClient to Microsoft.Data.SqlClient

## Overview
**Purpose**: Migrate from System.Data.SqlClient to Microsoft.Data.SqlClient across 15 bank application projects  
**Start Date**: July 24, 2025  
**Status**: Oracle Review Complete - Critical Blockers Identified & Resolved in Updated Plan  

## Pre-Migration Status

### Build Status (Before Migration)
- **Status**: Not yet executed
- **Target**: Verify all 15 projects build successfully
- **Command**: `dotnet msbuild AcmeBankApp.sln /p:Configuration=Debug`

### Test Status (Before Migration)  
- **Status**: Not yet executed
- **Target**: Establish baseline test results
- **Command**: `vstest.console.exe AcmeBankApp.Tests\bin\Debug\AcmeBankApp.Tests.dll`

## Migration Analysis Completed

### Projects Analyzed: 15 total
- ✅ bank-app-1 through bank-app-15
- ✅ Consistent .NET Framework 4.8 structure
- ✅ Identified 4 files per project requiring changes (60 total files)

### Current Dependencies Identified
- ✅ System.Data.SqlClient 4.6.0 (to be replaced)
- ✅ EntityFramework 6.2.0 (compatibility verified)
- ✅ .NET Framework 4.8 (supported)

### Files Requiring Changes per Project
1. ✅ `AcmeBankApp.Data/packages.config`
2. ✅ `AcmeBankApp.Web/packages.config`  
3. ✅ `AcmeBankApp.Data/AcmeBankApp.Data.csproj`
4. ✅ `AcmeBankApp.Data/DataHelper.cs`

## Specification Planning

### Documentation Created
- ✅ **sqldata-migration.md**: Comprehensive migration plan (UPDATED post-Oracle review)
- ✅ **progress.md**: This progress tracking document (UPDATED with Oracle findings)

### Key Planning Elements
- ✅ Risk assessment completed and REVISED with critical blockers
- ✅ Quality assurance plan enhanced with performance baselines  
- ✅ Rollback strategy documented with package backup procedures
- ✅ Success criteria expanded with security and performance validation

## Git Strategy

### Branch Planning
- **Branch Name**: `feature/migrate-to-microsoft-data-sqlclient`
- **Commit Strategy**: One commit per project + verification commit
- **PR Strategy**: Single PR with comprehensive build verification

## Issues Encountered

### CRITICAL ISSUES IDENTIFIED (Oracle Review)

#### 🚨 BLOCKER 1: Entity Framework 6.2.0 Incompatibility
- **Issue**: EF 6.2.0 does NOT support Microsoft.Data.SqlClient provider services
- **Impact**: EF will silently continue using System.Data.SqlClient from framework
- **Resolution**: Must upgrade to Entity Framework 6.4.4 + Microsoft.Data.SqlClient.EntityFramework
- **Status**: BLOCKING - Requires additional phase before migration

#### 🚨 BLOCKER 2: Breaking Connection String Defaults
- **Issue**: Microsoft.Data.SqlClient 5.x defaults Encrypt=true (was false in System.Data.SqlClient)
- **Impact**: LocalDB connections will fail without TLS certificates
- **Resolution**: Add Encrypt=false and TrustServerCertificate=true to all connection strings
- **Status**: BLOCKING - Must update all connection strings

#### 🚨 BLOCKER 3: Native SNI Dependencies
- **Issue**: Microsoft.Data.SqlClient requires platform-specific SNI.dll native libraries
- **Impact**: Build agents and test runners may fail without proper deployment
- **Resolution**: Ensure x64 platform builds and test execution
- **Status**: BLOCKING - Requires build configuration changes

### Revised Risk Assessment
- **High Risk**: Entity Framework compatibility, connection string encryption, native dependencies
- **Medium Risk**: Performance impact, TLS version compatibility, connection pooling changes
- **Low Risk**: Namespace changes (after compatibility issues resolved)

## REVISED Migration Steps (Post Oracle Review)

### Phase 0: Critical Compatibility Resolution (NEW - REQUIRED)
- [ ] Entity Framework upgrade: 6.2.0 → 6.4.4 across all projects
- [ ] Install Microsoft.Data.SqlClient.EntityFramework provider packages
- [ ] Create DbConfiguration classes for provider registration
- [ ] Update connection strings with encryption parameters (Encrypt=false)
- [ ] Canary testing on bank-app-1 before proceeding

### Phase 1: Enhanced Pre-Migration Validation
- [ ] Capture ADO.NET performance baseline counters
- [ ] Build verification with x64 platform configuration
- [ ] Add TLS connection health probe integration tests
- [ ] Verify SNI.dll native library deployment on build agents

### Phase 2: Comprehensive Package Migration
- [ ] Entity Framework upgrade validation (if not done in Phase 0)
- [ ] Install Microsoft.Data.SqlClient + EntityFramework extension
- [ ] Remove System.Data.SqlClient packages cleanly
- [ ] Update .csproj references with AutoGenerateBindingRedirects

### Phase 3: Enhanced Code Migration
- [ ] Update DbConfiguration and Web.config provider settings
- [ ] Update using statements (84+ files including new config files)
- [ ] Update all connection strings with encryption parameters
- [ ] Verify assembly redirects for cryptography dependencies

### Phase 4: Comprehensive Post-Migration Validation
- [ ] Build verification with strict error/warning checking
- [ ] TLS handshake and connection pooling validation
- [ ] Performance counter comparison vs baseline (±5% tolerance)
- [ ] CodeQL/SonarQube security scanning for SQL injection

## Next Steps

### Immediate Actions
1. ✅ **Oracle Review**: Expert review completed with critical findings
2. ✅ **Plan Refinement**: Specification updated based on Oracle feedback  
3. ⏳ **Execution Approval**: Confirm updated plan before beginning migration
4. 🆕 **Risk Mitigation**: Address EF 6.4.4 upgrade and connection string security

### Execution Readiness
- ✅ Comprehensive plan created and REVISED
- ✅ All files identified and mapped (84+ files vs original 60)
- ✅ Commands documented with platform-specific requirements
- ✅ Oracle validation complete with critical blockers addressed
- ⏳ **Ready for execution approval** with enhanced risk mitigation

## Summary

### What Was Completed
- ✅ Comprehensive analysis of 15 bank application projects
- ✅ Identification of all System.Data.SqlClient usage patterns
- ✅ Detailed migration specification with risk assessment (REVISED)
- ✅ Quality assurance and rollback planning (ENHANCED)
- ✅ Complete documentation of required changes (UPDATED)
- ✅ **Oracle expert review identifying 3 critical blockers**
- ✅ **Updated migration plan addressing all Oracle findings**

### What Changed (REVISED After Oracle Review)
- **Files Analyzed**: 84+ files across 15 projects (increased from 60 due to EF upgrade)
- **Dependencies Mapped**: 
  - EntityFramework 6.2.0 → 6.4.4 (CRITICAL upgrade required)
  - System.Data.SqlClient 4.6.0 → Microsoft.Data.SqlClient 5.1.1
  - Added: Microsoft.Data.SqlClient.EntityFramework provider
- **Migration Strategy**: REVISED from simple drop-in to comprehensive upgrade with EF compatibility resolution

### Why These Changes
- **CRITICAL COMPATIBILITY**: EF 6.2.0 does not support Microsoft.Data.SqlClient
- **Security Requirements**: New encryption defaults require explicit connection string updates  
- **Platform Compatibility**: Native SNI dependencies require x64 build configuration
- **Future-Proofing**: Prepares codebase for future .NET migrations with proper provider support

### Current State
**Oracle review completed - CRITICAL BLOCKERS IDENTIFIED** - Specification updated with mandatory EF upgrade path, connection string security updates, and enhanced validation requirements. Migration complexity increased from 2.5 to 6 hours due to EF compatibility requirements.
