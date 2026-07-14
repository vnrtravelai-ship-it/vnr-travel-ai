# BACKEND_STRUCTURE.md

# VNR Travel AI

## Backend Folder Structure

Version: 1.0

Status: Stable

---

# Purpose

This document defines the standard backend folder structure.

All future backend modules must follow this structure.

---

# Directory Tree

```text
src/server/

├── controllers/
├── routes/
├── services/
├── planning/
│   ├── railway/
│   ├── hotels/
│   ├── tours/
│   ├── food/
│   ├── specialties/
│   ├── affiliates/
│   ├── rules/
│   ├── models/
│   └── utils/
├── providers/
├── firebase/
└── middleware/
```

---

# Folder Responsibilities

## controllers/

Receive HTTP requests.

Responsibilities:

- Read request
- Validate input
- Call Service
- Return response

Never contains business logic.

---

## routes/

Responsible for API registration.

Examples:

```
chat.routes.ts
itinerary.routes.ts
lead.routes.ts
click.routes.ts
```

Never contains business logic.

---

## services/

Coordinate application flow.

Responsibilities:

- Call Planning Engine
- Call Providers
- Assemble results
- Handle application workflow

Should remain lightweight.

---

## planning/

Business core of the application.

Responsible for:

- Railway planning
- Hotel planning
- Tour planning
- Food recommendation
- Affiliate decision
- Business rules
- Future AI orchestration

No HTTP code.

No Firebase code.

No Express code.

---

## providers/

External integrations.

Examples:

- Gemini
- OpenAI
- Claude
- Baolau
- Agoda
- Traveloka
- Klook

Only communicate with external systems.

---

## firebase/

Firebase access layer.

Responsibilities:

- Firestore
- Authentication
- Storage
- Future Cloud Functions

No business logic.

---

## middleware/

Express middleware.

Examples:

- Authentication
- Logging
- Error Handler
- Validation

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

Providers

```
xxx.provider.ts
```

Planning

```
planner.ts
railwayPlanner.ts
hotelPlanner.ts
```

---

# Module Rule

Every feature should follow:

```text
Feature

↓

Route

↓

Controller

↓

Service

↓

Planning

↓

Provider
```

---

# Future Expansion

New features should never introduce new architecture layers.

Instead, extend the existing folders.

Example:

```
planning/

railway/

hotel/

food/

specialties/

affiliate/

rules/
```

---

# Stability

This folder structure is considered stable beginning with:

```
v2.0-phase2-complete
```

Future development should extend this structure instead of restructuring it.