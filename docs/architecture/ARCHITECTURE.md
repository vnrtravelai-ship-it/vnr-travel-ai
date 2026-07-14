# ARCHITECTURE.md

# VNR Travel AI

## Backend Architecture

Version: 1.0

Status: Stable

---

# Purpose

This document defines the permanent backend architecture of VNR Travel AI.

All future development must follow this architecture.

---

# High-Level Architecture

```
React Frontend
        │
        ▼
REST API
        │
        ▼
Express Server
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Planning Engine
        │
        ▼
Providers
        │
        ▼
External Systems
```

---

# Layer Responsibilities

## Frontend

Responsible for:

- User Interface
- User Interaction
- API Calls

Never contains business logic.

---

## Express Server

Responsible for:

- Application startup
- Middleware
- Route registration
- Static hosting
- Vite integration

Never contains business logic.

---

## Routes

Responsible for:

- API endpoint registration
- Route grouping
- Middleware binding

Routes never contain business logic.

---

## Controllers

Responsible for:

- Receive HTTP Request
- Validate request
- Call services
- Return HTTP Response

Controllers never implement business rules.

---

## Services

Responsible for:

- Coordinate application flow
- Call Planning Engine
- Call Providers
- Combine results

Services should remain lightweight.

---

## Planning Engine

The Planning Engine is the business core of VNR Travel AI.

Responsibilities include:

- Railway itinerary planning
- Travel decision making
- Multi-modal transportation
- Hotel planning
- Tour planning
- Food recommendation
- Regional specialties
- Affiliate orchestration
- Rule execution

Business rules belong exclusively to this layer.

---

## Providers

Responsible for integrating external services.

Examples:

- Gemini
- OpenAI
- Claude
- Firebase
- Baolau
- Agoda
- Traveloka
- Klook

Providers never contain business logic.

---

## External Systems

Examples:

- Firebase
- Gemini API
- Payment Gateway
- Affiliate Platforms

---

# Dependency Direction

Dependencies always flow downward.

```
server
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
external systems
```

Reverse dependencies are prohibited.

---

# Architecture Goals

This architecture supports:

- Scalability
- Maintainability
- AI independence
- International expansion
- Long-term evolution

---

# Long-term Vision

The architecture is designed to support the Product Vision:

> "An international AI railway travel platform centered on rail transport, integrating multi-modal transportation and a complete travel service ecosystem into one unified journey."