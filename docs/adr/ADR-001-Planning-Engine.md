# ADR-001

# Planning Engine Architecture

---

Status

Accepted

---

Date

2026-07-18

---

Version

1.0

---

# Context

VNR Travel AI is designed around a deterministic planning pipeline.

The project must:

* generate identical results for identical inputs
* separate business logic from AI
* allow every planner to be tested independently
* prevent AI hallucination from affecting business rules

Early versions considered allowing the LLM to generate the entire itinerary directly.

This approach was rejected because it produced:

* inconsistent itineraries
* duplicated activities
* budget violations
* scheduling conflicts
* unpredictable outputs

---

# Decision

The Planning Engine becomes the central orchestrator of the entire backend.

The engine owns:

* request parsing
* planner execution order
* context construction
* scheduler invocation
* itinerary generation
* budget calculation
* affiliate generation

The engine does **not** generate natural language.

---

# Architecture

```text id="kylm4v"
Planning Request

↓

Planning Engine

↓

Knowledge Services

↓

Scheduler

↓

Itinerary Builder

↓

Budget

↓

Affiliate

↓

Planning Context

↓

AI Provider

↓

JSON Response
```

---

# Responsibilities

Planning Engine is responsible for:

* orchestration
* dependency ordering
* cache lookup
* cache save
* metadata generation
* error propagation

Planning Engine is **not** responsible for:

* hotel recommendation logic
* railway logic
* AI prompt generation
* natural language generation
* route optimization algorithms

Those belong to dedicated modules.

---

# Benefits

Deterministic execution.

Predictable output.

Independent testing.

Simpler maintenance.

Business rules remain outside AI.

---

# Consequences

Advantages

* reproducible itinerary
* modular planners
* easier debugging
* enterprise architecture
* future scalability

Trade-offs

* slightly more code
* additional orchestration layer

These trade-offs are accepted.

---

# Alternatives Considered

## Option 1

LLM generates the complete itinerary.

Rejected.

Reason

Unstable output.

---

## Option 2

Planning Engine orchestrates specialized planners.

Accepted.

Reason

Deterministic architecture.

---

# Impact

Affected modules

* PlanningEngine
* KnowledgeRepository
* SchedulerEngine
* ItineraryBuilder
* BudgetService
* AffiliateService

---

# Future Evolution

Planning Engine will later orchestrate:

* AI Optimizer
* Conflict Detection
* Recommendation Ranking
* Reflection Engine
* Multi-city Planner

without changing its orchestration responsibility.

---

# Related Documents

* ARCHITECTURE.md
* PLANNER_PIPELINE.md
* PROJECT_MANIFEST.md
* PROJECT_STATE.md

---

# Decision

This architecture is mandatory for all future development.

Business decisions shall never bypass the Planning Engine.
