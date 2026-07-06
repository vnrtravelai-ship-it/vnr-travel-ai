# ARCHITECTURE.md

# VNR Travel AI

## System Architecture

Version: Foundation v1.0

Last Updated: 2026-07-06

---

# Architecture Goal

The architecture is designed to achieve:

- High maintainability
- High scalability
- Commercial deployment readiness
- Security
- Clear separation of responsibilities

---

# High Level Architecture

```
                User
                  │
                  ▼
        React + Vite Frontend
                  │
                  ▼
          Express API Server
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 Firebase Services      Gemini API
        │
        ▼
 Firestore Database
```

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite

Responsibilities

- User Interface
- User Interaction
- API Requests
- State Management

---

## Backend

- Express
- Node.js

Responsibilities

- Business Logic
- Authentication
- Affiliate APIs
- AI Orchestration
- Security Validation

---

## Database

Firebase Firestore

Responsibilities

- User Data
- Trips
- Affiliate Data
- Cached Results

---

## Authentication

Firebase Authentication

Responsibilities

- User Login
- Session Validation
- Identity Management

---

## AI Layer

Gemini API

Responsibilities

- Trip Planning
- Recommendation
- AI Assistant
- Travel Knowledge

Rule

Frontend must never call Gemini directly.

All AI requests pass through Backend.

---

## Hosting

Railway

Responsibilities

- Backend Deployment
- Environment Variables
- Production Runtime

---

# Folder Responsibilities

src/

Frontend Application

components/

Reusable UI Components

app/

Application Shell

internal/

Internal Tools

lib/

Core Services

data/

Static Project Data

docs/

Project Documentation

scripts/

Developer Utilities

---

# Architecture Principles

1. Separation of Concerns

Each layer has a single responsibility.

---

2. API First

Frontend communicates only through Backend APIs.

---

3. Stateless Backend

Business state is stored in Firestore.

---

4. Modular Components

UI components should remain independent.

---

5. Documentation Driven

Every architectural change must update this document.

---

# Current Architecture Status

Foundation Established

Documentation Phase

No Architecture Refactoring Approved

---

# Future Expansion

Planned support for:

- Multi-language
- Payment Gateway
- Hotel Affiliate Expansion
- Flight Affiliate Expansion
- AI Memory
- Analytics Dashboard

---

# Change Policy

Architecture changes require:

1. Architecture Review

2. Impact Analysis

3. Approval

4. Documentation Update

5. Implementation

No architectural change is allowed without updating this document.