# ADR-004

# AI Provider Architecture

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

VNR Travel AI integrates Large Language Models (LLMs) to generate natural language responses and structured travel plans.

Early prototypes allowed the AI model to make business decisions such as:

* selecting trains
* selecting hotels
* calculating budgets
* scheduling activities

This approach produced inconsistent results:

* different outputs for identical requests
* budget violations
* invalid schedules
* fabricated recommendations
* business rule violations

The architecture required a clear separation between deterministic business logic and probabilistic AI generation.

---

# Decision

The AI Provider shall **never make business decisions**.

Business decisions are completed before AI execution.

The AI Provider only receives a fully validated `PlanningContext`.

Its responsibilities are limited to:

* natural language generation
* JSON serialization
* explanation generation
* itinerary narration
* multilingual translation

---

# Architecture

```text
PlanningRequest

↓

Planning Engine

↓

Knowledge Services

↓

Scheduler

↓

Budget

↓

Affiliate

↓

PlanningContext

↓

AI Provider

↓

JSON Response

↓

Frontend
```

---

# AI Provider Responsibilities

The AI Provider is responsible for:

* generating human-readable itineraries
* generating valid JSON output
* explaining recommendations
* formatting Markdown
* multilingual support
* conversational responses

The AI Provider is NOT responsible for:

* train selection
* hotel recommendation logic
* activity scheduling
* budget calculation
* affiliate selection
* route optimization
* validation
* business rules

---

# AI Input

The only supported input is:

```typescript
PlanningContext
```

The AI Provider must never receive:

* repositories
* database objects
* planner services
* scheduler services

---

# AI Output

The AI Provider returns:

* JSON
* Markdown
* Natural Language

The AI Provider must never modify:

* PlanningContext
* ScheduleSlot
* DayPlan
* Budget
* AffiliatePlan

---

# Prompt Architecture

The system prompt is divided into three layers:

Layer 1

System Rules

↓

Layer 2

Business Constraints

↓

Layer 3

PlanningContext

No business logic may exist inside prompts.

---

# Supported Providers

Current

* Google Gemini

Future

* OpenAI GPT
* Claude
* DeepSeek
* Local LLM

Provider switching must not affect business logic.

---

# Deterministic Principle

Given the same PlanningContext:

Business Output

must always be identical.

Only wording may differ between AI providers.

---

# Error Handling

If AI fails:

* retry
* fallback provider
* cached response (if available)
* return structured error

Business planning must never be recomputed solely because AI failed.

---

# Security

The AI Provider must never receive:

* API keys
* database credentials
* internal repositories
* dependency container
* user secrets

Only sanitized PlanningContext is transmitted.

---

# Alternatives Considered

## Option 1

AI generates the entire itinerary.

Rejected.

Reason:

Non-deterministic and difficult to validate.

---

## Option 2

AI formats deterministic planning output.

Accepted.

Reason:

Stable, testable and provider-independent.

---

# Future Evolution

Future capabilities include:

* Reflection Engine
* Quality Scoring
* Response Ranking
* Prompt Optimization
* Multi-model voting

These enhancements will operate after PlanningContext creation.

---

# Impact

Affected modules:

* AI Provider
* Prompt Builder
* JSON Serializer
* Planning Engine

No impact on business services.

---

# Related Documents

* ADR-001-PLANNING_ENGINE_ARCHITECTURE.md
* ADR-002-KNOWLEDGE_REPOSITORY_ARCHITECTURE.md
* ADR-003-SCHEDULER_ENGINE_ARCHITECTURE.md
* ARCHITECTURE.md
* PLANNER_PIPELINE.md

---

# Decision

The AI Provider is a presentation layer.

All business logic must be completed before AI execution.

This decision is mandatory for every future AI integration.
