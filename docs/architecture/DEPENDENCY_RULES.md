# DEPENDENCY_RULES.md

# VNR Travel AI

## Dependency Rules

Version: 1.0

Status: Mandatory

---

# Purpose

This document defines the dependency rules of the VNR Travel AI backend.

These rules are mandatory and preserve the stability of the architecture.

No module may violate these dependency rules.

---

# Permanent Architecture

```
server.ts
    │
    ▼
routes
    │
    ▼
controllers
    │
    ▼
services
    │
    ▼
planning
    │
    ▼
providers
    │
    ▼
firebase / external systems
```

Dependencies always flow downward.

Never upward.

---

# Allowed Dependencies

## server.ts

May import:

- routes

Must NOT import:

- services
- planning
- providers
- firebase

---

## routes

May import:

- controllers

Must NOT import:

- services
- planning
- providers
- firebase

---

## controllers

May import:

- services

Must NOT import:

- planning
- providers
- firebase

---

## services

May import:

- planning
- providers

Should coordinate application flow only.

---

## planning

May import:

- providers

Planning is the business brain.

Planning must never know:

- Express
- Request
- Response
- Routes
- Controllers

---

## providers

May import:

- SDKs
- External APIs
- Firebase

Providers must never import:

- planning
- services
- controllers

---

## firebase

Lowest layer.

Responsible only for:

- Firestore
- Storage
- Authentication
- Database operations

Must never import any upper layer.

---

# Forbidden Dependencies

The following are strictly prohibited.

❌ planning → controllers

❌ planning → routes

❌ planning → server.ts

❌ providers → planning

❌ providers → services

❌ firebase → planning

❌ firebase → services

❌ firebase → controllers

❌ firebase → routes

---

# Business Logic Ownership

Business decisions belong only to:

```
planning/
```

Examples:

- Train recommendation
- Hotel recommendation
- Tour recommendation
- Food recommendation
- Affiliate decision
- Travel optimization
- Rule execution

These decisions must never be placed inside:

- controllers
- services
- providers

---

# AI Responsibility

AI Providers are generators.

They do NOT decide business logic.

AI may:

- Generate text
- Generate itinerary descriptions
- Answer questions

Planning decides:

- Which itinerary
- Which train
- Which hotel
- Which affiliate
- Which rule applies

---

# Future Expansion

Future providers may include:

- OpenAI
- Claude
- Gemini
- DeepSeek
- Local LLM

No Planning code should change when replacing an AI provider.

---

# Architecture Stability

Beginning with:

```
v2.0-phase2-complete
```

the dependency direction becomes permanent.

Future features must extend the architecture.

They must never reverse dependency direction.

---

# Verification Checklist

Before every Pull Request or Release:

- Architecture unchanged
- Dependency direction unchanged
- No forbidden imports
- TypeScript passes
- Build passes
- Runtime passes

---

# Philosophy

Stable architecture enables continuous evolution.

Business grows.

AI evolves.

Providers change.

The architecture remains stable.