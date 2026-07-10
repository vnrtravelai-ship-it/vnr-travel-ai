# PHASE2_BACKEND_REFACTOR.md

# VNR Travel AI

## Phase 2 – Backend Refactoring

**Status:** Planning

**Version:** 1.0

**Created:** 2026-07-10

---

# Purpose

This document defines the execution plan for Phase 2 Backend Refactoring.

The objective is to improve backend maintainability and architecture without changing any existing application behavior.

This document serves as the authoritative execution plan for the entire Phase 2.

---

# Goal

Refactor backend architecture while preserving:

- Existing application behavior
- Existing APIs
- Existing database
- Existing UI
- Existing user experience

No functional changes are allowed during this phase.

---

# Scope

## Included

The following components are included in this refactoring:

- server.ts
- Express routing
- API routing structure
- Controllers
- Business services
- AI provider layer
- Firebase service layer
- Backend folder organization

---

## Excluded

The following items are NOT part of this phase:

- React UI
- Frontend components
- Firestore schema
- Firebase Authentication
- Community module
- Planner algorithm
- Railway recommendation engine
- Affiliate logic redesign
- Multi-language support
- Multi-country support
- Rule Engine
- Multi-AI orchestration
- Performance optimization
- Security hardening

These items belong to later project phases.

---

# Current Situation

Current backend consists primarily of:

server.ts

Current responsibilities include:

- Express startup
- API routing
- Gemini AI
- Lead APIs
- Click APIs
- Itinerary APIs
- Chat APIs
- Vite middleware
- Static hosting

Current issues:

- Too many responsibilities
- Difficult to maintain
- Difficult to scale
- Difficult to test
- Difficult to replace AI providers
- Difficult to extend internationally

---

# Target Architecture

Current

server.ts

↓

Everything

---

Target

server.ts

↓

Routes

↓

Controllers

↓

Services

↓

Providers

↓

External Services

- Firebase
- Gemini
- Future AI Providers

---

# Architecture Principles

The following principles are mandatory.

## Separation of Concerns

Each layer has one responsibility.

---

## Single Responsibility

Each file should have one primary responsibility.

---

## API First

Frontend communicates only through backend APIs.

---

## Provider Isolation

External providers must remain isolated.

Examples:

- Firebase
- Gemini
- OpenAI
- Claude

Future providers must be replaceable with minimal impact.

---

## Backward Compatibility

All current APIs must continue to function.

No breaking changes are permitted.

---

# Migration Rules

The following rules are mandatory.

- No behavior changes
- No API changes
- No UI changes
- No database changes
- No Firestore schema changes
- No authentication changes

Only move and reorganize code.

No new features.

No optimization.

No redesign.

---

# Development Rules

One Commit = One Logical Change.

Every step must:

- Compile successfully
- Pass TypeScript validation
- Preserve application behavior

No partial migrations are allowed.

Do not begin the next step until the previous step is verified.

---

# Refactor Order

Step 1

Create backend folder structure.

---

Step 2

Move API routes.

---

Step 3

Move Controllers.

---

Step 4

Move Business Services.

---

Step 5

Move AI Provider.

---

Step 6

Move Firebase Service.

---

Step 7

Simplify server.ts.

---

Step 8

Cleanup.

---

# Risks

Potential risks include:

- Route registration order
- Middleware execution order
- Environment variable loading
- Firebase initialization
- Gemini initialization
- Static file serving
- Vite middleware
- Build configuration

Every completed step must be verified before continuing.

---

# Rollback Strategy

If any step fails:

- Stop immediately.
- Restore the previous Git commit.
- Do not continue with partial refactoring.

Git history must remain clean and recoverable.

---

# Deliverables

At the completion of Phase 2:

- server.ts becomes lightweight.
- Routes are separated.
- Controllers are separated.
- Services are separated.
- Provider layer exists.
- Firebase is isolated.
- Gemini is isolated.
- Backend architecture is modular.

Application behavior remains unchanged.

---

# Success Criteria

Phase 2 is considered complete only when:

- TypeScript passes.
- Build succeeds.
- Application behavior is unchanged.
- Existing APIs remain compatible.
- No production functionality is lost.
- Documentation is updated.
- Git history remains clean.

---

# Completion Criteria

Phase 2 finishes only after:

- Documentation review
- Code review
- Architecture review
- Successful build
- Successful runtime verification

---

# Next Phase

Phase 3

Security Hardening

---

# Notes

This document defines the execution rules for Phase 2 only.

Future architectural improvements such as:

- Multi AI Provider
- Rule Engine
- International Railway Platform
- Knowledge Graph
- AI Orchestration Layer

will be implemented in future phases according to the Product Vision and Technical Roadmap.