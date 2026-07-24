# ==========================================================
# PROJECT MANIFEST
# VNR TRAVEL AI
# Enterprise Development Constitution
# ==========================================================

Version: 4.8
Status: ACTIVE DEVELOPMENT
Architecture Status: STABLE
Current Sprint: Sprint 4.8
Repository Branch: develop

Last Updated: 2026-07

---

# 1. PROJECT IDENTITY

Project Name

VNR Travel AI

Official Name

Vietnam Railway Travel AI Platform

Short Name

VNR AI

Project Type

Enterprise AI Travel Planning Platform

Primary Domain

Railway Tourism

Primary Market

Vietnam

Primary Language

Vietnamese

International Support

English (planned)

---

# 2. PROJECT VISION

Build the most intelligent Railway Travel Planning Platform in Vietnam.

The platform must be capable of producing complete travel plans centered around Vietnam Railway services while integrating hotels, restaurants, attractions, local specialties, affiliate services, budgeting, scheduling, and AI-assisted optimization.

The Planning Engine—not the AI model—is the authoritative source of business decisions.

AI is responsible only for transforming validated planning results into natural language and structured itinerary output.

---

# 3. COMMERCIAL OBJECTIVES

The project is designed as a commercial SaaS platform.

Primary revenue sources include:

• Railway ticket affiliate
• Hotel affiliate
• Tour affiliate
• Travel insurance affiliate
• Local transportation affiliate
• Premium AI itinerary subscription
• Tourism partner advertising
• Enterprise licensing
• Tourism analytics
• Railway ecosystem integration

The architecture must always prioritize long-term commercial scalability over short-term implementation convenience.

---

# 4. CORE PRINCIPLES

Every future modification must comply with these principles.

Principle 1

Business Logic First

Business rules shall never be delegated to AI.

Principle 2

Deterministic Planning

The Planning Engine always produces deterministic outputs.

Identical input must produce identical PlanningContext.

Principle 3

AI is Presentation Layer

AI never decides:

- train
- hotel
- schedule
- pricing
- budget
- business policy

AI only generates the final itinerary.

Principle 4

Single Source of Truth

PlanningContext is the only authoritative planning object.

No duplicate planning logic is allowed.

Principle 5

Layer Isolation

Each layer owns exactly one responsibility.

No cross-layer business logic.

Principle 6

Commercial Readiness

Every module must be designed for production deployment.

No prototype architecture is permitted.

---

# 5. PROJECT GOALS

Functional Goals

✓ Intelligent railway itinerary planning

✓ Automatic scheduling

✓ Budget optimization

✓ Hotel recommendation

✓ Food recommendation

✓ Tour recommendation

✓ Affiliate integration

✓ AI itinerary generation

✓ JSON validation

✓ Self-healing AI pipeline

Future Goals

✓ Weather integration

✓ Dynamic pricing

✓ Multi-city planning

✓ Voice assistant

✓ Mobile application

✓ Enterprise dashboard

---

# 6. TARGET USERS

Primary Users

- Railway passengers
- Domestic tourists
- International tourists
- Family travelers
- Solo travelers

Secondary Users

- Railway operators
- Tourism agencies
- Hotel partners
- Tour operators
- Enterprise customers

---

# 7. TECHNOLOGY STACK

Frontend

- React
- TypeScript
- Vite

Backend

- Node.js
- Express
- TypeScript

Database

- Firebase Firestore

Authentication

- Firebase Authentication

Storage

- Firebase Storage

AI Providers

- Gemini
- OpenAI

Architecture already prepared for:

- Claude
- DeepSeek
- Local LLM

Infrastructure

- Railway
- GitHub

Documentation

Markdown

Architecture Decision Records (ADR)

---

# 8. PROJECT ARCHITECTURE LEVELS

Level 1

Presentation

Frontend

↓

Level 2

REST API

↓

Level 3

Planning Engine

↓

Level 4

Knowledge Layer

↓

Level 5

Optimizer

↓

Level 6

AI Core

↓

Level 7

Output Validation

↓

Level 8

Self-Healing

↓

Level 9

Response Serialization

No future implementation may violate this execution order.

---
# ==========================================================
# 9. DEVELOPMENT PRINCIPLES
# ==========================================================

The project is developed according to Enterprise Software Engineering principles.

Every change must satisfy:

- Maintainability
- Scalability
- Readability
- Testability
- Extensibility
- Deterministic Business Logic
- Documentation Synchronization

No shortcut implementation is permitted.

---

# 10. DEVELOPMENT WORKFLOW

Every feature must follow the same lifecycle.

Business Requirement

↓

Architecture Design

↓

Folder Structure

↓

Data Models

↓

Business Logic

↓

Integration

↓

Lint

↓

Build

↓

Documentation Update

↓

Git Commit

↓

Git Tag

↓

Git Push

↓

Sprint Closed

A Sprint is NOT considered completed until every step above has finished successfully.

---

# 11. MANDATORY BUILD POLICY

Every coding session must end with:

npm run lint

Result

PASS

Then

npm run build

Result

PASS

If either command fails:

The Sprint must NOT be closed.

Git commit is forbidden until Build PASS.

---

# 12. GIT WORKFLOW

Official Branch

develop

Every completed Sprint must execute:

git add .

↓

git commit

↓

git tag

↓

git push origin develop --tags

Working Tree must always return to:

nothing to commit

working tree clean

---

# 13. DOCUMENT SYNCHRONIZATION POLICY

The following documents are mandatory project documents.

PROJECT_MANIFEST.md

Defines permanent project rules.

ARCHITECTURE.md

Defines architecture.

ROADMAP_2026.md

Defines development roadmap.

PROJECT_STATE.md

Defines current project status.

CHANGELOG.md

Defines project history.

MASTER_ROADMAP.md

Defines the complete lifecycle of the project.

These documents must always remain synchronized.

---

# 14. WHEN DOCUMENTS MUST BE UPDATED

PROJECT_MANIFEST

Update when:

- project principles change
- coding rules change
- governance changes

ARCHITECTURE

Update when:

- architecture changes
- dependency changes
- execution pipeline changes

ROADMAP

Update when:

- Sprint completed
- Sprint reordered
- roadmap expanded

PROJECT_STATE

Update after every Sprint.

CHANGELOG

Update after every Sprint.

MASTER_ROADMAP

Update whenever the long-term execution plan changes.

---

# 15. SPRINT CLOSING CHECKLIST

A Sprint cannot be closed unless all items below are completed.

✓ Feature completed

✓ Code reviewed

✓ npm run lint PASS

✓ npm run build PASS

✓ Documentation synchronized

✓ Git commit

✓ Git tag

✓ Git push

✓ Working Tree clean

Only then may the Sprint status become:

COMPLETED

---

# 16. CODING STANDARDS

Language

TypeScript

Strict Mode

Enabled

Any

Forbidden

Implicit Any

Forbidden

Type Assertions

Use only when unavoidable.

Interfaces

Preferred over type aliases for domain models.

Enums

Avoid unless semantically necessary.

Export Style

Named exports.

Default export should be avoided unless required by framework conventions.

---

# 17. FILE ORGANIZATION

One responsibility per file.

One domain per folder.

Maximum cohesion.

Minimum coupling.

Examples

Planning

planning/

Knowledge

knowledge/

Scheduler

scheduler/

Optimizer

optimizer/

AI

ai/

Repositories

repositories/

Providers

providers/

Services

services/

Controllers

controllers/

Models

models/

Rules

rules/

Templates

templates/

Utilities

utils/

Cross-domain business logic is prohibited.

---

# 18. IMPORT RULES

Allowed direction

Controllers

↓

Services

↓

Planning Engine

↓

Knowledge

↓

Repositories

Forbidden examples

Repository importing Controller

Knowledge importing Frontend

AI Provider importing Business Rules

Business Rules importing AI Provider

No circular dependencies are allowed.

---

# 19. DEPENDENCY INJECTION POLICY

All shared services must be registered inside:

ApplicationContainer

No class should manually instantiate long-lived services.

Singleton services must be resolved through the container.

---

# 20. ERROR HANDLING

Business errors

Return structured objects.

Unexpected errors

Throw exceptions.

AI errors

Must never crash the Planning Engine.

AI failures are handled through:

Retry Engine

↓

Validator

↓

Self-Healing

↓

Fallback Response

Planning Engine must always remain operational.

---
# ==========================================================
# 21. BUSINESS LOGIC GOVERNANCE
# ==========================================================

Business Logic is the heart of VNR Travel AI.

Business Logic shall NEVER exist inside:

- AI Providers
- Prompt Builders
- Frontend
- Controllers
- JSON Validators

Business Logic belongs only to:

Planning Engine

Knowledge Layer

Scheduler

Optimizer

Business Rules

Repositories

Every future feature must respect this separation.

---

# 22. PLANNING ENGINE AUTHORITY

PlanningEngine is the only component allowed to create
PlanningContext.

PlanningContext is considered immutable after PlanningEngine
has completed its execution.

No downstream component may change business decisions.

Allowed operations after PlanningEngine:

✓ formatting

✓ validation

✓ scoring

✓ repairing output formatting

✓ natural language generation

Forbidden:

changing train

changing hotel

changing schedule

changing budget

changing business rules

changing destinations

changing itinerary decisions

---

# 23. PLANNING CONTEXT

PlanningContext is the Single Source of Truth.

Everything produced later must originate from PlanningContext.

PlanningContext owns:

request

railway

hotel

food

tours

itinerary

budget

affiliate

metadata

No duplicated planning object is allowed.

No AI-generated planning object is accepted as authoritative.

---

# 24. KNOWLEDGE LAYER

Knowledge Layer provides deterministic data.

Knowledge modules include:

Railway

Hotel

Food

Tour

Budget

Affiliate

Scheduler

Future modules:

Weather

Events

Dynamic Pricing

Traffic

Each knowledge module must remain independent.

Knowledge modules must never communicate directly.

All orchestration belongs to PlanningEngine.

---

# 25. SCHEDULER GOVERNANCE

Scheduler Engine is responsible only for timing.

Scheduler decides:

arrival

departure

meal timing

hotel check-in

activity ordering

travel intervals

Scheduler never decides:

hotel selection

tour recommendation

budget

railway recommendation

---

# 26. OPTIMIZER GOVERNANCE

Optimizer improves planning quality.

Optimizer never creates planning.

Optimizer contains:

Constraint Solver

Conflict Detector

Recommendation Ranker

Reflection Engine

Prompt Builder

Repair Builder

Prompt Optimizer

Output Validator

Self-Healing

AI Quality Scorer

Optimizer may recommend improvements.

PlanningEngine decides whether those improvements are accepted.

---

# 27. AI CORE GOVERNANCE

AI is NOT the planner.

AI is the presenter.

AI responsibilities:

generate itinerary text

rewrite explanations

produce JSON

repair formatting

follow prompt

AI must never:

select train

select hotel

calculate budget

change schedule

invent destinations

invent prices

invent railway data

invent affiliate links

Business decisions remain inside backend.

---

# 28. AI PROVIDER POLICY

Supported providers:

Gemini

OpenAI

Future:

Claude

DeepSeek

Local LLM

Every provider must implement:

AIProvider

Provider implementations must remain stateless.

Provider code must never contain business logic.

---

# 29. PROMPT POLICY

Prompt Builder receives:

PlanningContext

ConstraintResult

Reflection Suggestions

Prompt Builder generates prompts.

Prompt Builder never generates business rules.

Prompt Builder never calculates itinerary.

Prompt Builder never validates business logic.

---

# 30. OUTPUT VALIDATION

Every AI response must pass:

JSON Validator

↓

Schema Validator

↓

Output Validator

↓

Self-Healing

↓

Response Parser

Invalid output must never reach frontend.

---

# 31. SELF-HEALING

Self-Healing exists only to repair AI output.

It must never modify PlanningContext.

Allowed:

repair malformed JSON

repair missing fields

repair formatting

repair schema

Forbidden:

change itinerary

change destinations

change budget

change business decisions

---

# 32. IMMUTABLE COMPONENTS

The following components are considered immutable architecture.

PlanningEngine

PlanningContext

Knowledge Layer

Scheduler

Repositories

Dependency Injection

ApplicationContainer

Business Rules

These components may evolve internally.

Their responsibilities must never change.

---

# 33. FORBIDDEN CHANGES

The following changes are permanently prohibited.

Moving business logic into AI.

Moving business logic into frontend.

Allowing AI to decide itinerary.

Duplicating PlanningContext.

Bypassing validation pipeline.

Direct controller-to-repository communication.

Circular dependencies.

Mixing business logic into providers.

Removing documentation synchronization.

Skipping Build PASS before commit.

Skipping documentation update after Sprint completion.

---

# 34. ARCHITECTURE DECISION RECORDS

All major architectural decisions must be documented.

ADR documents are mandatory.

Current ADRs:

ADR-001

Planning Engine

ADR-002

Knowledge Repository

ADR-003

Scheduler Engine

ADR-004

AI Provider

ADR-005

Dependency Injection

Future architectural changes require a new ADR.

---

# 35. BACKWARD COMPATIBILITY

New features must not break existing modules.

Breaking changes require:

Architecture review

ADR update

Documentation update

Migration strategy

Backward compatibility should be preserved whenever possible.

---
# ==========================================================
# 36. CODING CONVENTIONS
# ==========================================================

All source code must follow the same coding conventions.

Language

TypeScript

Strict Mode

Enabled

Formatting

Prettier compatible

Lint

TypeScript lint must always PASS.

Maximum Responsibility

One responsibility per class.

One responsibility per file.

Maximum Function Length

Approximately 100 lines.

Large functions should be decomposed.

Magic Numbers

Forbidden.

Use constants.

Comments

Explain WHY.

Do not explain WHAT unless necessary.

---

# 37. NAMING CONVENTIONS

Folders

lowercase

Examples

planning

knowledge

optimizer

scheduler

Files

kebab-case

Examples

planning.engine.ts

hotel.repository.ts

constraint.solver.ts

Classes

PascalCase

Interfaces

PascalCase

Functions

camelCase

Variables

camelCase

Constants

UPPER_SNAKE_CASE

Enums

PascalCase

---

# 38. FOLDER OWNERSHIP

planning/

Owns itinerary generation.

knowledge/

Owns deterministic travel knowledge.

repositories/

Owns data access.

providers/

Owns external systems.

scheduler/

Owns timeline generation.

optimizer/

Owns quality improvement.

ai/

Owns AI communication.

controllers/

Owns REST endpoints.

services/

Owns orchestration.

models/

Owns domain models.

rules/

Owns business rules.

templates/

Owns reusable prompt templates.

utils/

Owns generic helper utilities.

No folder may assume another folder's responsibility.

---

# 39. SECURITY POLICY

Security is mandatory.

The following rules are permanent.

Never expose API keys.

Never expose provider secrets.

Never trust frontend input.

Always validate external data.

Always sanitize AI output.

Never execute AI-generated code.

Never bypass authentication.

Never bypass validation.

---

# 40. PERFORMANCE POLICY

Performance must be considered during every Sprint.

Planning Engine

Must remain deterministic.

Knowledge Layer

Should support caching.

Repositories

Should support indexing.

AI Providers

Must be replaceable.

Large datasets

Must support pagination.

Future optimizations should preserve API compatibility.

---

# 41. TESTING POLICY

Every major module should eventually support:

Unit Tests

Integration Tests

Regression Tests

Performance Tests

Current testing status

Foundation established.

Comprehensive testing planned in future sprints.

---

# 42. DOCUMENTATION POLICY

Documentation is part of the product.

Code is never considered complete without documentation.

Every Sprint completion requires synchronized updates to:

PROJECT_MANIFEST

ARCHITECTURE

ROADMAP_2026

PROJECT_STATE

CHANGELOG

MASTER_ROADMAP

Documentation is treated as source code.

---

# 43. DEFINITION OF DONE

A feature is complete only when all conditions below are true.

✓ Implementation completed

✓ TypeScript passes

✓ Build passes

✓ Documentation updated

✓ Architecture unchanged or documented

✓ Git commit completed

✓ Git tag created

✓ Git pushed

✓ Working Tree clean

Only then is the Sprint considered finished.

---

# 44. AI ONBOARDING

Any AI assisting this project must follow this sequence.

Step 1

Read PROJECT_MANIFEST.md

Step 2

Read ARCHITECTURE.md

Step 3

Read MASTER_ROADMAP.md

Step 4

Read ROADMAP_2026.md

Step 5

Read PROJECT_STATE.md

Step 6

Read CHANGELOG.md

Only after reading these documents may implementation begin.

No assumptions are allowed.

---

# 45. PROJECT GOVERNANCE

This repository follows Documentation Driven Development.

Architecture Driven Development.

Business Rule Driven Development.

AI Assisted Development.

Every implementation must preserve:

Deterministic planning

Commercial readiness

Enterprise architecture

Long-term maintainability

Backward compatibility

---

# 46. PROJECT MISSION

VNR Travel AI is not merely an itinerary generator.

It is intended to become Vietnam's leading intelligent railway travel platform.

Every design decision must support that long-term vision.

Short-term convenience must never compromise long-term architecture.

---

# 47. IMMUTABLE PROJECT OBJECTIVES

These objectives shall not change.

Build the best Railway Travel AI platform.

Separate Business Logic from AI.

Maintain deterministic planning.

Support multiple AI providers.

Preserve enterprise architecture.

Ensure production readiness.

Guarantee long-term maintainability.

These objectives override implementation preferences.

---

# 48. MANIFEST AUTHORITY

PROJECT_MANIFEST.md is the highest-level governance document of this repository.

If any documentation conflicts with PROJECT_MANIFEST.md,

PROJECT_MANIFEST.md takes precedence.

All future documentation must remain consistent with this document.

All future implementations must comply with this document.

---

# END OF MANIFEST

Document Status

COMPLETE

Architecture Status

STABLE

Governance Status

ACTIVE

This document defines the permanent development constitution of VNR Travel AI.

Every contributor, AI assistant, reviewer, and maintainer is required to comply with this Manifest before modifying the project.