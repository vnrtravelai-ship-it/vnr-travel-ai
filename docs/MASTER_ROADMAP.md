# MASTER ROADMAP
# VNR Travel AI

Single Source of Truth

Version:
4.8

Status:
ACTIVE DEVELOPMENT

Architecture:
Enterprise

Project Type:
Commercial SaaS Platform

Last Updated:
2026-07-24

Repository:
develop

------------------------------------------------------------
PROJECT PURPOSE
------------------------------------------------------------

VNR Travel AI is a commercial AI-powered railway travel planning platform designed specifically for Vietnam.

The platform is not merely an itinerary generator.

Its purpose is to become the intelligent travel operating system for railway passengers, tourism businesses, affiliate partners, and railway operators.

The project combines:

• deterministic planning
• business rule engines
• knowledge repositories
• AI reasoning
• self-healing pipelines
• affiliate commerce
• enterprise architecture

into one unified planning platform.

------------------------------------------------------------
COMMERCIAL OBJECTIVES
------------------------------------------------------------

Primary objectives

✓ Intelligent railway trip planning

✓ Railway-first travel recommendation

✓ AI itinerary generation

✓ Affiliate revenue generation

✓ Hotel recommendation

✓ Tour recommendation

✓ Restaurant recommendation

✓ Local specialty recommendation

✓ Budget optimization

✓ Multi-city travel planning

✓ Commercial booking platform

Future objectives

• Premium AI Planner

• Subscription model

• Enterprise dashboard

• Tourism analytics

• Railway operation intelligence

------------------------------------------------------------
TECHNOLOGY STACK
------------------------------------------------------------

Frontend

React
TypeScript
Vite

Backend

NodeJS

Express

TypeScript

Architecture

Enterprise Modular Architecture

Repository Pattern

Service Layer

Planning Engine

AI Orchestrator

Knowledge Repository

Scheduler Engine

Optimizer Engine

Database

Firebase

Firestore

Realtime Database

Authentication

Firebase Auth

Storage

Firebase Storage

AI Providers

Gemini

OpenAI

Claude (planned)

DeepSeek (planned)

Local LLM (planned)

Deployment

Railway

GitHub

CI/CD (planned)

------------------------------------------------------------
ARCHITECTURE PRINCIPLES
------------------------------------------------------------

The project follows these principles.

1.

Business Logic never belongs inside AI.

2.

Planning Engine is the single source of truth.

3.

AI only explains.

AI never decides business rules.

4.

Every planning result must pass validation.

5.

Every AI output must pass validation.

6.

Every AI response can be repaired automatically.

7.

The system must continue operating after AI failures.

8.

Every module is independently testable.

9.

Loose coupling.

High cohesion.

10.

Commercial readiness is more important than development speed.
# ============================================================
# DEVELOPMENT ROADMAP
# ============================================================

## Overall Development Strategy

The project is developed in sequential architecture-first sprints.

Each sprint must satisfy all of the following:

- Architecture review completed
- Source code implemented
- TypeScript lint passes
- Production build passes
- Git commit completed
- Git tag created
- Documentation synchronized
- Repository remains clean

No sprint may be skipped.

No sprint may be merged partially.

No sprint may start before the previous sprint is fully completed.

---

# ============================================================
# PHASE 1
# FOUNDATION
# ============================================================

Status

Completed

Objective

Build a stable commercial backend foundation.

Completed Modules

✔ Repository Pattern

✔ Provider Layer

✔ Planning Engine

✔ Scheduler Engine

✔ Knowledge Repository

✔ Budget Planner

✔ Affiliate Planner

✔ Itinerary Builder

✔ Cache Layer

✔ Dependency Injection

✔ Documentation Foundation

---

# ============================================================
# PHASE 2
# AI CORE
# ============================================================

Status

Completed

Objective

Separate business logic from LLM.

Completed Modules

✔ AI Provider Interface

✔ Gemini Provider

✔ OpenAI Provider

✔ Provider Factory

✔ Prompt Builder

✔ Prompt Optimizer

✔ Output Validator

✔ Retry Engine

✔ Self-Healing Engine

Result

Business decisions remain deterministic.

LLM becomes only a language generation layer.

---

# ============================================================
# PHASE 3
# PLANNING INTELLIGENCE
# ============================================================

Current Phase

Sprint 4.x

Objective

Allow AI to generate higher quality travel plans while remaining under strict rule validation.

Completed

Sprint 4.1

Planning Context

Sprint 4.2

Reflection Builder

Sprint 4.3

Repair Builder

Sprint 4.4

Reflection Engine

Sprint 4.5

Repair Engine

Sprint 4.6

Prompt Optimizer

Sprint 4.7

Output Validator

Sprint 4.8

Self-Healing

---

Current Sprint

Project Completion Audit

Objectives

Remove duplicate modules

Synchronize architecture

Complete placeholder files

Standardize documentation

Prepare for Sprint 4.9

Status

In Progress

---

Next Sprint

Sprint 4.9

Objective

Complete AI Pipeline Integration

Modules

AI Orchestrator

Planning Flow Integration

Retry Integration

Validator Integration

Repair Loop Integration

Prompt Optimization Integration

Production AI Pipeline

Expected Result

Single unified planning pipeline.

No duplicated execution path.

Commercial-ready AI orchestration.

---

Sprint 4.10

Objective

Recommendation Intelligence

Modules

Hotel Scorer

Restaurant Scorer

Tour Scorer

Railway Scorer

Budget Scorer

Ranking Engine

Preference Weight Engine

Distance Weight Engine

Expected Result

AI recommendations become significantly more accurate.

---

Sprint 4.11

Objective

Knowledge Expansion

Modules

Food Knowledge

Hotel Knowledge

Tour Knowledge

Railway Knowledge

Specialty Knowledge

Weather Knowledge

Pricing Knowledge

Result

Knowledge Repository becomes enterprise grade.

---

Sprint 4.12

Objective

Memory Layer

Modules

Conversation Memory

Preference Memory

Trip History

Context Compression

Embedding Preparation

Result

Long conversation support.

Personalized planning.

---

Sprint 4.13

Objective

Commercial Optimization

Modules

Affiliate Optimization

Revenue Optimization

Business Rules

Recommendation Conversion

Analytics

Result

Commercial-ready recommendation system.

# ==========================================================
# PART III
# MASTER DEVELOPMENT ROADMAP
# ==========================================================

Roadmap được chia thành các giai đoạn.

Mỗi Sprint chỉ được bắt đầu khi Sprint trước đã:

- Build PASS
- Lint PASS
- Commit
- Tag
- Push
- Documentation synchronized

Không được bỏ qua Sprint.

Không được triển khai song song.

Không được đảo thứ tự.

---

# PHASE 1

FOUNDATION

Status

100% Completed

Completed

Repository

Folder Structure

Dependency Injection

Planning Engine

Knowledge Layer

Scheduler

Itinerary

Budget

Affiliate

Planning Context

Cache

Template Loader

Application Container

Documentation Foundation

Architecture Governance

ADR

Coding Rules

Dependency Rules

Project Manifest

---

# PHASE 2

AI CORE

Status

In Progress

Purpose

Xây dựng AI Pipeline hoàn chỉnh.

Business Logic vẫn nằm 100% ở Backend.

AI chỉ có nhiệm vụ

- reasoning
- language generation
- repair
- explanation

Không được quyết định business rules.

---

Completed

Sprint 4.1

AI Provider Layer

Completed

Modules

AIProvider

GeminiProvider

OpenAIProvider

ProviderFactory

AIResponse

AIOrchestrator

Status

Completed

---

Sprint 4.2

Retry Engine

Completed

Modules

RetryPolicy

RetryEngine

RetryTypes

Status

Completed

---

Sprint 4.3

Reflection Engine

Completed

Modules

ReflectionBuilder

ReflectionEngine

ReflectionPrompt

ReflectionTypes

Purpose

AI tự đánh giá PlanningContext trước khi sinh kết quả.

Status

Completed

---

Sprint 4.4

Repair Engine

Completed

Modules

RepairBuilder

RepairEngine

RepairPrompt

RepairTypes

Purpose

Sinh Repair Payload.

Đề xuất hướng sửa.

Status

Completed

---

Sprint 4.5

Prompt Builder

Completed

Modules

PromptBuilder

Prompt Templates

Prompt Variables

Prompt Optimizer

Prompt Engine

Purpose

Sinh Prompt chuẩn.

Quản lý Prompt tập trung.

Status

Completed

---

Sprint 4.6

Prompt Optimizer

Completed

Capabilities

Prompt Compression

Prompt Cleaning

Prompt Prioritization

Prompt Composition

Status

Completed

---

Sprint 4.7

Output Validator

Completed

Modules

JSON Validator

Schema Validator

Output Validator

Validator Engine

Capabilities

JSON validation

Schema validation

Output verification

Status

Completed

---

Sprint 4.8

Self Healing

Completed

Modules

Healing Builder

Healing Prompt

Healing Engine

Healing Types

Capabilities

Automatic AI repair

Automatic retry

Output recovery

Pipeline self healing

Status

Completed

---

Current Progress

Sprint

4.8

Status

Completed

AI Core Completion

≈85%

Remaining

Project Completion Audit

Sprint 4.9

# ==========================================================
# PART IV — MASTER DEVELOPMENT ROADMAP
# ==========================================================

# Development Philosophy

The project is developed sequentially.

Every Sprint must satisfy:

1. Architecture consistency
2. Business rule integrity
3. Type safety
4. Documentation synchronization
5. Lint PASS
6. Build PASS
7. Git Commit
8. Git Tag
9. Git Push

No Sprint may be skipped.

No Sprint may be reordered.

---

# Sprint History

## Sprint 3.x

Status

Completed

Completed modules

✓ Planning Engine

✓ Knowledge Repository

✓ Scheduler Engine

✓ Itinerary Builder

✓ Budget Engine

✓ Affiliate Engine

✓ Dependency Injection

✓ Application Container

✓ Documentation Foundation

---

## Sprint 4

Status

IN PROGRESS

Purpose

Build the complete AI Core while keeping Planning Engine deterministic.

---

# Sprint 4.1

Completed

AI Provider Interface

Gemini Provider

OpenAI Provider

Provider Factory

AI Orchestrator

---

# Sprint 4.2

Completed

Retry Engine

Retry Policy

Retry Types

Automatic retry pipeline

---

# Sprint 4.3

Completed

Response Parser

AI Response normalization

JSON extraction

Response formatting

---

# Sprint 4.4

Completed

Reflection Engine

Reflection Builder

Reflection Types

Reflection Prompt

Reflection pipeline

---

# Sprint 4.5

Completed

Repair Engine

Repair Builder

Repair Prompt

Repair Types

Automatic repair workflow

---

# Sprint 4.6

Completed

Prompt Optimizer

Prompt Engine

Prompt Variables

Prompt Templates

Prompt Optimizer

Prompt standardization

---

# Sprint 4.7

Completed

Output Validator

JSON Validator

Schema Validator

Output Validator

Validator Engine

---

# Sprint 4.8

Completed

Self-Healing

Healing Builder

Healing Engine

Healing Prompt

Healing Types

Automatic recovery pipeline

---

# Sprint 4.9

NEXT

Current Sprint

Objectives

Complete Project Completion Audit.

Finish every placeholder file.

Complete Planning Knowledge.

Complete Planning Models.

Remove duplicated implementations.

Remove legacy modules.

Standardize imports.

Standardize naming.

Freeze AI Core architecture.

Expected Result

Commercial-grade AI Core.

Stable architecture.

100% synchronized documentation.

Ready for feature development.

---

# Sprint 5

Planned

Theme

Planning Intelligence

Modules

Weather Engine

Dynamic Pricing

Special Event Engine

Railway Knowledge Expansion

Hotel Knowledge Expansion

Food Knowledge Expansion

Tour Knowledge Expansion

Travel Recommendation Engine

Preference Learning

Intent Classification

Expected Result

Planning becomes context-aware.

Recommendations become personalized.

---

# Sprint 6

Planned

Theme

Commercial Platform

Modules

User Account

Authentication

Role Management

Saved Trips

History

Favorite Routes

Affiliate Dashboard

Admin Dashboard

Analytics

Monitoring

Payment Integration

Expected Result

Commercial SaaS platform.

---

# Sprint 7

Planned

Theme

Production Ready

Modules

Testing

CI/CD

Performance Benchmark

Caching

Observability

Metrics

Tracing

Logging

Security Audit

Load Testing

Deployment Automation

Expected Result

Enterprise production release.

---

# Release Milestones

Version

3.x

Foundation

Status

Completed

---

Version

4.x

AI Core

Status

In Progress

---

Version

5.x

Planning Intelligence

Status

Planned

---

Version

6.x

Commercial Platform

Status

Planned

---

Version

7.x

Enterprise Production

Status

Planned

---

# Completion Criteria

The project is considered complete only when:

✓ AI Core completed

✓ Planning Intelligence completed

✓ Commercial Platform completed

✓ Production deployment completed

✓ Documentation synchronized

✓ Test coverage acceptable

✓ Performance validated

✓ Security audit passed

✓ Monitoring operational

✓ CI/CD operational

---

# 9. DEVELOPMENT RULES

The following rules are mandatory.

They are considered part of the project architecture.

Every AI assistant and every developer must follow them.

Violation of these rules is considered an architectural defect.

---

## Rule 1

Business Logic NEVER lives inside AI.

Correct

Planning Engine
↓

Optimizer
↓

Prompt Builder
↓

AI

Wrong

AI decides

• hotels

• routes

• railway

• budget

• itinerary

---

## Rule 2

Planning Engine is always the single source of truth.

Everything produced by AI must originate from PlanningContext.

PlanningContext

↓

Prompt

↓

AI

↓

Natural language only

---

## Rule 3

AI Providers are stateless.

They never cache.

They never save.

They never modify business data.

They only generate responses.

---

## Rule 4

PlanningContext is immutable after Optimizer.

Allowed

PlanningContext

↓

Optimizer

↓

Freeze

↓

Prompt Builder

↓

AI

Forbidden

PlanningContext

↓

AI edits PlanningContext

---

## Rule 5

Every backend module has one responsibility.

Examples

Planning Engine

planning

Optimizer

quality

Scheduler

timing

Validator

validation

Self-Healing

repair

Retry

retry

Provider

LLM communication

---

## Rule 6

No circular dependency.

Architecture always points downward.

Controllers

↓

Services

↓

Planning

↓

Optimizer

↓

AI

↓

Providers

Never reverse.

---

## Rule 7

Every new module must satisfy

• Single Responsibility Principle

• Dependency Injection

• Testability

• Statelessness

• Type Safety

---

## Rule 8

Every public interface must have

TypeScript typing

JSDoc

meaningful naming

no "any"

---

## Rule 9

Never duplicate business logic.

Common logic must be extracted.

Examples

Validator

Prompt Builder

PlanningContext

Knowledge Repository

---

## Rule 10

All AI prompts originate from Prompt Builder.

Forbidden

Hardcoded prompts

inside

Controllers

Services

Providers

---

# 10. DEFINITION OF DONE

A Sprint is NOT complete until ALL requirements are satisfied.

Required checklist

✓ TypeScript PASS

✓ npm run lint PASS

✓ npm run build PASS

✓ Architecture preserved

✓ No duplicated logic

✓ Dependency Injection maintained

✓ Documentation updated

✓ CHANGELOG updated

✓ PROJECT_STATE updated

✓ ROADMAP updated

✓ ARCHITECTURE updated

✓ Commit

✓ Tag

✓ Push

---

A feature is NOT considered completed if only code exists.

Documentation is part of the feature.

Architecture is part of the feature.

Repository cleanliness is part of the feature.

---

# 11. CODE QUALITY RULES

TypeScript Strict Mode

Mandatory

Never use

any

Prefer

unknown

Use interfaces

Avoid inheritance unless necessary.

Prefer composition.

Never export mutable global state.

Never bypass validation.

Never skip Optimizer.

Never call Provider directly outside AI Orchestrator.

---

Naming Convention

Classes

PascalCase

Interfaces

PascalCase

Functions

camelCase

Variables

camelCase

Constants

UPPER_CASE

Files

feature.name.ts

Examples

planning.engine.ts

validator.engine.ts

retry.engine.ts

healing.engine.ts

prompt.builder.ts

---

Folder naming

lowercase

dot notation

No spaces.

No uppercase folders.

---
---

# 12. GIT WORKFLOW

The project follows a single stable development workflow.

Primary Branch

develop

Production Branch

main

Feature Branch

feature/<feature-name>

Hotfix Branch

hotfix/<issue-name>

Release Branch

release/<version>

---

## Standard Development Flow

Every feature must follow this sequence.

1.

Implement code

↓

2.

Run

npm run lint

↓

3.

Run

npm run build

↓

4.

Fix every error

↓

5.

Update documentation

↓

6.

git add .

↓

7.

git commit

↓

8.

git tag

↓

9.

git push origin develop --tags

No feature is considered complete before Step 9.

---

## Commit Convention

Use Conventional Commits.

Examples

feat:

new feature

fix:

bug fix

refactor:

internal improvement

perf:

performance

docs:

documentation

test:

testing

chore:

maintenance

Examples

feat: complete prompt optimizer pipeline

feat: complete AI validator pipeline

feat: complete AI self-healing pipeline

docs: synchronize architecture after Sprint 4.8

refactor: remove legacy optimizer

---

## Version Tagging

Every Sprint ends with a Git tag.

Examples

v4.6-prompt-optimizer

v4.7-output-validator

v4.8-self-healing

v4.9-retry-engine

Future releases

v5.0-commercial-beta

v6.0-public-release

---

# 13. DOCUMENTATION POLICY

Documentation is part of the source code.

Documentation must evolve together with code.

The following files are mandatory.

MASTER_ROADMAP.md

PROJECT_MANIFEST.md

PROJECT_STATE.md

ROADMAP_2026.md

CHANGELOG.md

ARCHITECTURE.md

ADR

Sprint Notes

No Sprint may close while these files are outdated.

---

## Documentation Update Order

Whenever a Sprint finishes

update

1.

CHANGELOG.md

↓

2.

PROJECT_STATE.md

↓

3.

ROADMAP_2026.md

↓

4.

ARCHITECTURE.md

↓

5.

MASTER_ROADMAP.md

↓

6.

PROJECT_MANIFEST.md (only if governance changes)

---

## Architecture Decision Records

Every major architectural decision requires a new ADR.

Example

ADR-006

AI Retry Strategy

ADR-007

Planner Memory Architecture

ADR-008

Weather Engine

ADR files are immutable after approval.

---

# 14. AI COLLABORATION PROTOCOL

The project is designed to allow multiple AI assistants.

Any AI joining the project must read, in order:

1.

MASTER_ROADMAP.md

↓

2.

PROJECT_MANIFEST.md

↓

3.

PROJECT_STATE.md

↓

4.

ARCHITECTURE.md

↓

5.

ROADMAP_2026.md

↓

6.

CHANGELOG.md

Only then may implementation begin.

---

## AI Responsibilities

AI must

understand architecture

respect roadmap

preserve folder structure

avoid duplicate implementations

avoid changing completed architecture

prefer extension over replacement

---

## AI Must Never

change completed business rules

rewrite Planning Engine

rewrite Optimizer without request

remove architecture

rename folders arbitrarily

duplicate modules

hardcode business logic inside Providers

skip validation

skip documentation

---

## Session Continuity

Every working session begins with

Project Completion Audit

Architecture verification

Roadmap verification

Repository verification

Every working session ends with

Lint PASS

Build PASS

Documentation synchronization

Commit

Tag

Push

Only after all steps are completed is the session considered finished.

---

# 15. VERSION GOVERNANCE

Architecture Version

Changes only when architecture changes.

Sprint Version

Changes after every completed Sprint.

Git Tag

Created after every completed Sprint.

Documentation Version

Always synchronized with Sprint Version.

Example

Architecture

v4.0

Sprint

v4.8

Documentation

v4.8

Git Tag

v4.8-self-healing

These versions should never diverge.

---
---

# 16. PRODUCTION READINESS CHECKLIST

The project is considered production-ready only when **all** items below are complete.

## Backend

- Complete Planning Engine
- Complete AI Core
- Complete Knowledge Layer
- Complete Scheduler
- Complete Optimizer
- Complete Retry Engine
- Complete Self-Healing
- Complete Weather Engine
- Complete Pricing Engine
- Complete Memory Engine

Status

☐ Pending

---

## Frontend

- Planner UI
- Chat UI
- Trip Management
- Profile
- Authentication
- Offline Mode
- PWA
- Accessibility
- Responsive Design

Status

☐ Pending

---

## Security

- JWT Authentication
- Refresh Token
- Rate Limiting
- Prompt Injection Protection
- API Validation
- Input Sanitization
- Secrets Management
- Audit Logging

Status

☐ Pending

---

## Database

- Firestore Production
- Index Optimization
- Backup
- Restore
- Migration Strategy

Status

☐ Pending

---

## DevOps

- CI/CD
- Docker
- Monitoring
- Error Tracking
- Health Check
- Auto Deployment
- Rollback

Status

☐ Pending

---

## Quality

- Unit Test ≥ 90%
- Integration Test
- E2E Test
- Performance Benchmark
- Security Audit
- Documentation Audit

Status

☐ Pending

---

## Commercial

- Affiliate Tracking
- Revenue Dashboard
- Admin Portal
- Analytics
- User Feedback
- Customer Support

Status

☐ Pending

---

# 17. LONG-TERM MAINTENANCE STRATEGY

The project is intended to operate for many years.

Every new feature must satisfy:

Backward compatibility

↓

Architecture consistency

↓

Business rule consistency

↓

Documentation synchronization

↓

Testing

↓

Release

No shortcut is permitted.

---

## Annual Maintenance

Every year

Review roadmap

Review architecture

Review dependencies

Review documentation

Archive completed releases

Remove deprecated modules

Upgrade framework versions

Security review

Performance review

---

## Dependency Policy

Dependencies must be

Well maintained

Widely adopted

Production proven

Regularly updated

Deprecated libraries should be replaced only after architectural review.

---

# 18. PROJECT COMPLETION DEFINITION

The project is considered complete when:

✔ AI Planner generates production-quality travel plans

✔ Railway knowledge is comprehensive

✔ Weather and pricing are integrated

✔ Affiliate ecosystem is operational

✔ Frontend and backend are fully integrated

✔ Mobile/PWA experience is complete

✔ Monitoring and DevOps are production-ready

✔ Documentation is fully synchronized

✔ Commercial deployment is successful

Only then may the project status become:

PRODUCTION

---

# 19. PROJECT PRINCIPLES

The following principles are permanent.

1.

Architecture before implementation.

2.

Business logic before AI.

3.

Deterministic planning before natural language.

4.

Documentation is part of the codebase.

5.

Every Sprint ends with validation.

6.

Never sacrifice maintainability for speed.

7.

Commercial readiness is mandatory.

8.

One architecture.

One roadmap.

One source of truth.

---

# 20. CONTINUATION GUIDE FOR ANY AI OR DEVELOPER

If a new AI assistant or developer joins the project:

Step 1

Read MASTER_ROADMAP.md completely.

↓

Step 2

Read PROJECT_MANIFEST.md.

↓

Step 3

Read ARCHITECTURE.md.

↓

Step 4

Read PROJECT_STATE.md.

↓

Step 5

Read ROADMAP_2026.md.

↓

Step 6

Read CHANGELOG.md.

↓

Step 7

Run

npm run lint

npm run build

↓

Step 8

Verify Git working tree is clean.

↓

Step 9

Determine the current Sprint.

↓

Step 10

Continue implementation **only from the next unfinished roadmap item**.

No completed Sprint may be reimplemented unless explicitly requested.

---

# 21. SINGLE SOURCE OF TRUTH

The following documents together define the project:

MASTER_ROADMAP.md

Overall project strategy and lifecycle.

PROJECT_MANIFEST.md

Development governance and engineering rules.

ARCHITECTURE.md

System architecture and technical design.

PROJECT_STATE.md

Current implementation status.

ROADMAP_2026.md

Sprint-by-sprint execution plan.

CHANGELOG.md

Historical record of all completed work.

If conflicts occur:

MASTER_ROADMAP.md has the highest priority.

---

# 22. FINAL DECLARATION

VNR Travel AI is an enterprise-grade software project designed to become the leading AI-powered railway travel planning platform in Vietnam.

The project emphasizes:

- Deterministic planning
- Railway-first business logic
- AI-assisted natural language generation
- Commercial sustainability
- Maintainable architecture
- Long-term evolution
- Complete documentation
- Safe collaboration between humans and AI

Every contribution to this repository must preserve these principles.

This document is the permanent master reference for the project lifecycle.

End of Document.
