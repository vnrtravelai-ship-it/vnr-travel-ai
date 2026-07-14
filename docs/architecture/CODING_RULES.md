# CODING_RULES.md

# VNR Travel AI

## Coding Rules

Version: 1.0

Status: Mandatory

---

# Purpose

This document defines the coding standards for VNR Travel AI.

Every contributor must follow these rules.

---

# General Principles

The project follows these principles:

- Clean Architecture
- SOLID Principles
- Single Responsibility Principle
- Separation of Concerns
- API First
- Business Logic Isolation

---

# One File = One Responsibility

Each file should have only one responsibility.

Good examples:

```
chat.controller.ts

chat.service.ts

chat.routes.ts

chat.provider.ts
```

Bad example:

```
chat.ts
```

that contains:

- Route
- Controller
- Service
- Provider

inside one file.

---

# Controller Rules

Controllers are responsible only for:

- Reading Request
- Input Validation
- Calling Service
- Returning Response

Controllers must never:

- Query Firebase
- Call Gemini directly
- Implement business logic
- Build prompts
- Process data

---

# Service Rules

Services coordinate application flow.

Services may:

- Call Planning Engine
- Call Providers
- Combine results

Services should avoid implementing business rules.

---

# Planning Rules

Planning is the business core.

Planning decides:

- What to do
- Which provider to use
- Which hotel to recommend
- Which route is optimal
- Which affiliate platform to use

Planning never depends directly on HTTP or Express.

---

# Provider Rules

Providers communicate with external systems.

Providers may:

- Send requests
- Receive responses
- Handle API errors

Providers never:

- Make business decisions
- Recommend hotels
- Recommend tours
- Decide train routes

---

# Firebase Rules

Firebase layer is responsible only for data access.

No business logic.

No AI logic.

---

# Route Rules

Routes only register endpoints.

Example:

```
router.post("/", createChat);
```

Nothing else.

---

# Import Rules

Allowed

```
Controller

↓

Service

↓

Planning

↓

Provider
```

Forbidden

```
Planning

↓

Controller
```

```
Provider

↓

Planning
```

```
Firebase

↓

Controller
```

---

# Naming Convention

Routes

```
xxx.routes.ts
```

Controllers

```
xxx.controller.ts
```

Services

```
xxx.service.ts
```

Planning

```
xxx.planner.ts
```

Providers

```
xxx.provider.ts
```

Firebase

```
xxx.repository.ts
```

---

# Comments

Only comment when necessary.

Avoid obvious comments.

Prefer self-explanatory code.

---

# Functions

Functions should:

- Have one responsibility
- Be short
- Be reusable

Avoid giant functions.

---

# Git Rules

One Commit = One Logical Change.

Every commit should:

- Compile
- Pass lint
- Preserve behavior

---

# Refactoring Rules

Never refactor multiple modules in one commit.

Always verify:

```
npm run lint

npm run build

npm run dev
```

before committing.

---

# Documentation

Every architectural change must update:

- PROJECT_STATE.md
- ARCHITECTURE.md
- BACKEND_STRUCTURE.md
- TECHNICAL_ROADMAP.md (when applicable)

---

# Philosophy

Code should be:

- Simple
- Readable
- Testable
- Replaceable
- Extensible

Architecture should remain stable while business capabilities continue to evolve.