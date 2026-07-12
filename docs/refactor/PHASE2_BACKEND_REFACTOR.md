# Phase 2 Backend Refactoring

# VNR Travel AI

## Phase 2 – Backend Refactoring

**Status:** Planning

**Version:** 2.0

**Created:** 2026-07-10

---

# Purpose

This document defines the execution plan for Phase 2 Backend Refactoring.

The objective is to establish a scalable backend architecture that supports the long-term vision of VNR Travel AI while preserving all existing application behavior.

This document serves as the authoritative execution plan for Phase 2.

---

# Goal

Refactor the backend architecture while preserving:

* Existing application behavior
* Existing APIs
* Existing database
* Existing UI
* Existing user experience

No functional changes are allowed during this phase.

---

# Scope

## Included

The following components are included in this refactoring:

* server.ts
* Express routing
* API routing structure
* Controllers
* Business services
* Planning Engine foundation
* AI provider layer
* Firebase service layer
* Backend folder organization

---

## Excluded

The following items are NOT part of this phase:

* React UI
* Frontend components
* Firestore schema redesign
* Firebase Authentication redesign
* Community feature redesign
* Planning Engine implementation
* Railway recommendation optimization
* Affiliate business redesign
* Multi-language support
* Multi-country support
* Rule Engine implementation
* Multi-AI orchestration
* Performance optimization
* Security hardening

These items belong to future phases.

---

# Current Situation

Current backend consists primarily of:

server.ts

Current responsibilities include:

* Express startup
* API routing
* AI Provider (Gemini)
* Lead APIs
* Affiliate click APIs
* Itinerary APIs
* Chat APIs
* Vite middleware
* Static hosting

Current issues:

* Too many responsibilities
* Difficult to maintain
* Difficult to scale
* Difficult to test
* Difficult to replace AI providers
* Difficult to support international expansion
* Business logic tightly coupled with infrastructure

---

# Target Architecture

server.ts

↓

routes

↓

controllers

↓

services

↓

Planning Engine

↓

providers

↓

firebase

---

# Planning Layer

The Planning Layer is the business core of VNR Travel AI.

Its responsibility is to make travel decisions independently from any AI provider.

Responsibilities include:

• Railway itinerary planning
• Multi-modal transport optimization
• International railway network support
• Accommodation planning
• Experience planning
• Local food recommendation
• Regional specialty recommendation
• Affiliate service orchestration
• Knowledge-based travel planning
• Travel rule management
• AI task orchestration

The Planning Layer must remain completely independent from Gemini, OpenAI, Claude, or any future AI provider.

---

# Architecture Principles

The following principles are mandatory.

## AI Independence

Business logic must remain independent from any AI provider.

AI providers can be replaced without changing business logic.

## Separation of Concerns

Each layer has exactly one responsibility.

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

* Firebase
* Gemini
* OpenAI
* Claude
* Future AI Providers

Business logic must never directly depend on a provider implementation.

---

## Planning First

Business decisions must be handled inside the Planning Layer.

AI providers generate content only.

They do not determine business rules.

---

## Backward Compatibility

All current APIs must continue to function.

No breaking changes are permitted.

---

# Migration Rules

The following rules are mandatory.

* No behavior changes
* No API changes
* No UI changes
* No database changes
* No Firestore schema changes
* No authentication changes

Only move and reorganize code.

No new features.

No optimization.

No redesign.

---

# Development Rules

One Commit = One Logical Change.

Every step must:

* Compile successfully
* Pass TypeScript validation
* Preserve application behavior
* Keep Git history clean

No partial migrations are allowed.

Do not begin the next step until the previous step has been verified.

---

# Refactor Order

Step 1

Create backend folder structure.

---

Step 2

Move API Routes.

---

Step 3

Move Controllers.

---

Step 4

Move Business Services.

---

Step 5

Move AI Providers.

---

Step 6

Introduce Planning Layer.

---

Step 7

Move Firebase Services.

---

Step 8

Simplify server.ts.

---

Step 9

Cleanup.

---

# Risks

Potential risks include:

* Route registration order
* Middleware execution order
* Environment variable loading
* Firebase initialization
* AI provider initialization
* Static file serving
* Vite middleware
* Build configuration

Every completed step must be verified before continuing.

---

# Rollback Strategy

If any step fails:

* Stop immediately.
* Restore the previous Git commit.
* Do not continue with partial refactoring.

Git history must remain clean and recoverable.

---

# Deliverables

At the completion of Phase 2:

* server.ts becomes lightweight.
* Routes are separated.
* Controllers are separated.
* Services are separated.
* Planning Layer exists.
* Provider layer exists.
* Firebase is isolated.
* Gemini is isolated.
* Backend architecture becomes modular and scalable.

Application behavior remains unchanged.

---

# Success Criteria

Phase 2 is considered complete only when:

* TypeScript passes.
* Build succeeds.
* Runtime verification succeeds.
* Application behavior is unchanged.
* Existing APIs remain compatible.
* No production functionality is lost.
* Documentation is updated.
* Git history remains clean.

---

# Completion Criteria

Phase 2 finishes only after:

* Documentation review
* Code review
* Architecture review
* Successful build
* Successful runtime verification

---

# Next Phases

Phase 3 – Planning Engine Foundation

Phase 4 – Security Hardening

---

# Notes

This document defines the execution rules for Phase 2 only.

The objective of Phase 2 is to establish a clean, modular, scalable, and maintainable backend architecture without changing any existing application behavior.

No new business features are introduced during this phase.

---

## Future Architecture

The following capabilities will be implemented in future phases:

- Multi AI Provider Architecture
- AI Routing Layer
- Planning Engine Expansion
- Railway Knowledge Graph
- Rule Engine
- International Railway Platform
- Multi-modal Transportation Engine
- Affiliate Service Platform
- Travel Service Marketplace
- Local Food & Regional Specialty Platform
- Multi-language Platform
- International Payment Integration

These capabilities will be implemented according to:

- PRODUCT_VISION.md
- TECHNICAL_ROADMAP.md
- PROJECT_STATE.md
- SYSTEM_ARCHITECTURE.md

---

## Architecture Stability

The backend architecture established during Phase 2 is intended to remain stable throughout the lifetime of the project.

Future features must extend the existing architecture rather than restructure it.

The following layers are considered permanent:

```
server.ts
    ↓
routes
    ↓
controllers
    ↓
services
    ↓
planning
    ↓
providers
    ↓
firebase
```

Major architectural changes are only permitted when they are reflected in:

- PRODUCT_VISION.md
- TECHNICAL_ROADMAP.md
- PROJECT_STATE.md
- SYSTEM_ARCHITECTURE.md

---

## Planning Engine Vision

The Planning Layer is the permanent business core of VNR Travel AI.

Its responsibilities include:

- Railway itinerary planning
- Multi-modal transportation planning
- International railway planning
- Accommodation planning
- Experience planning
- Local food recommendation
- Regional specialty recommendation
- Affiliate service orchestration
- Business rule execution
- AI task orchestration

The Planning Layer must never depend directly on any specific AI provider.

AI providers generate content.

Business decisions belong exclusively to the Planning Layer.

---

## Long-term Vision

This architecture is designed to support:

- Vietnam Railway
- International Railway Networks
- Multi-modal Transportation
- AI-independent business logic
- Long-term scalability
- Enterprise-grade maintainability

The long-term vision of VNR Travel AI is:

**"An international AI railway travel platform centered on rail transport, integrating multi-modal transportation and a complete travel service ecosystem into one unified journey."**

Every future development phase must align with this vision.
