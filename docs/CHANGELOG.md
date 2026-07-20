# CHANGELOG.md

# ============================================
# VNR Travel AI
# Changelog
# ============================================

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog.

Versioning follows the internal VNR Travel AI roadmap.

---

# v3.8
Released

2026-07-17

Tag

v3.8-scheduler-rules

Status

Stable

---

## Added

### Scheduler Layer

- Added SchedulerEngine
- Added SchedulerService
- Added ScheduleSlot model
- Added ScheduleType model

### Scheduler Rules

- TrainArrivalRule
- HotelCheckinRule
- MealRule
- OpenHourRule
- DistanceRule

### Knowledge Repository

KnowledgeRepository now exposes

- schedulerService

### Planning Engine

PlanningEngine pipeline upgraded

PlanningContext(base)

↓

SchedulerService

↓

ItineraryService

↓

BudgetService

↓

AffiliateService

↓

PlanningContext(final)

### Application Container

Registered

SchedulerService

SchedulerEngine

Scheduler Rules

### Documentation

Updated

- PROJECT_STATE
- Planning Pipeline
- Architecture

---

## Changed

PlanningContext now contains

- itinerary

PlanningEngine now produces

complete itinerary before budget calculation.

SchedulerEngine is now responsible for

- ordering

- timing

- meal placement

- arrival

- hotel check-in

Budget calculation now uses itinerary information.

Affiliate planning now runs after itinerary generation.

---

## Fixed

PlanningContext synchronization

ApplicationContainer registration

KnowledgeRepository dependencies

Scheduler integration

TypeScript compatibility

Planning pipeline consistency

---

## Internal Refactor

Separated

Business Rules

from

Planning Engine.

Scheduler logic moved into

SchedulerEngine.

Rule-based planning is now deterministic.

---

# v3.7

Released

2026-07-16

Tag

v3.7-itinerary-engine

Status

Stable

---

## Added

ItineraryBuilder

Activity model

DayPlan model

ItineraryService

PlanningContext.itinerary

KnowledgeRepository.itineraryService

---

## Changed

PlanningContext extended

Planning Engine now supports itinerary generation.

---

## Fixed

PlanningContext typing

Builder integration

Knowledge service registration

---

# v3.6

Released

2026-07-15

Tag

v3.6-affiliate-engine

Status

Stable

---

## Added

AffiliateRepository

AffiliateProvider

AffiliateService

AffiliatePlan

Affiliate planning stage

---

## Changed

Planning Engine supports affiliate recommendation.

Affiliate planning moved into backend pipeline.

---

## Fixed

Repository injection

ApplicationContainer wiring

---

# v3.5

Released

2026-07

Status

Stable

---

## Added

BudgetRepository

BudgetProvider

BudgetService

BudgetPlan

---

# v3.4

Released

2026-07

Status

Stable

---

## Added

TourRepository

TourProvider

TourService

TourPlanner

---

# v3.3

Released

2026-07

Status

Stable

---

## Added

FoodRepository

FoodProvider

FoodService

FoodPlanner

---

# v3.2

Released

2026-07

Status

Stable

---

## Added

HotelRepository

HotelProvider

HotelService

HotelPlanner

---

# v3.1

Released

2026-07

Status

Stable

---

## Added

RailwayRepository

RailwayProvider

RailwayService

RailwayPlanner

---

# v3.0

Released

2026-07

Status

Stable

---

## Initial Release

Planning Engine

PlanningContext

PlanningRequest

TravelIntent

Template Repository

Cache Manager

Knowledge Layer

Gemini Provider

REST API

---

# Upcoming

## v3.9

Planned

AI Optimizer

Adaptive itinerary optimization

Conflict detection

Rule scoring

Travel quality evaluation

Planning refinement

---

## v4.0

Planned

Multi-city planner

Cross-province routing

AI travel assistant

Recommendation ranking

Dynamic replanning

Real-time railway integration

---

# Documentation

Current Documentation Version

v3.8

Current Stable Tag

v3.8-scheduler-rules

Current Sprint

Sprint 3.8

Current Architecture

Scheduler Engine

Status

Documentation synchronized.
# CHANGELOG

All notable changes to **VNR Travel AI** are documented in this file.

The project follows Semantic Versioning.

---

# [3.8.6] - 2026-07-18

## Architecture Governance

### Added

* Architecture Decision Records (ADR)

  * ADR-001 Planning Engine Architecture
  * ADR-002 Knowledge Repository Architecture
  * ADR-003 Scheduler Engine Architecture
  * ADR-004 AI Provider Architecture
  * ADR-005 Dependency Injection

### Added

Project governance documents

* PROJECT_MANIFEST.md
* BACKUP_STRATEGY.md
* ERROR_CODES.md
* DOCUMENT_INDEX.md
* DOCUMENT_CLASSIFICATION.md
* DOCS_STRUCTURE.md

### Updated

* PROJECT_STATE.md
* ROADMAP_2026.md
* ARCHITECTURE.md
* PLANNER_PIPELINE.md

### Repository

* Documentation structure standardized
* Enterprise documentation policy established
* Repository organization improved

---

# [3.8.5] - 2026-07-17

## Scheduler Integration

### Added

SchedulerService

SchedulerEngine integration

### Added Scheduler Rules

* TrainArrivalRule
* HotelCheckinRule
* MealRule
* OpenHourRule
* DistanceRule

### Refactored

PlanningEngine execution pipeline

Old

```text
Knowledge

↓

Itinerary

↓

Budget
```

New

```text
Knowledge

↓

Scheduler

↓

Itinerary

↓

Budget

↓

Affiliate
```

### Refactored

ItineraryBuilder

Responsibilities reduced to

* formatting
* grouping activities

Scheduling logic removed.

### Updated

KnowledgeRepository

Added

* SchedulerService
* ItineraryService

### Validation

* npm run lint PASS
* TypeScript PASS

---

# [3.8.0] - 2026-07-15

## Planning Engine Foundation

### Added

PlanningRequest

PlanningContext

PlanningMetadata

### Added

Knowledge services

* RailwayService
* HotelService
* FoodService
* TourService
* BudgetService
* AffiliateService

### Added

Planning cache

Planning templates

Metadata generation

### Architecture

Planning Engine established as central orchestrator.

---

# [3.7.x]

## Initial Backend Foundation

### Added

Backend folder structure

Repository pattern

Dependency Injection

Planning models

Knowledge models

Initial architecture

---

# Upcoming

## 3.9

Planned

* Constraint Solver
* Conflict Detection
* Recommendation Ranking
* Reflection Engine
* Prompt Builder
* Prompt Optimizer
* JSON Validator
* AI Quality Scoring
* Multi-AI Provider Support

---

# Release Summary

| Version | Status | Description             |
| ------- | ------ | ----------------------- |
| 3.7.x   | ✅      | Backend foundation      |
| 3.8.0   | ✅      | Planning Engine         |
| 3.8.5   | ✅      | Scheduler integration   |
| 3.8.6   | ✅      | Architecture governance |
| 3.9     | 🚧     | AI Optimizer            |

# Version 3.9.0

Date: 2026-07-20

Status: Completed

---

# Sprint

Sprint 3.9

AI Optimizer Core

---

# Added

## Optimizer

Added

src/server/optimizer/models/

- constraint-error.model.ts
- constraint-result.model.ts
- constraint-rule.model.ts

Added

src/server/optimizer/rules/

- budget.rule.ts
- railway.rule.ts
- hotel.rule.ts
- schedule.rule.ts
- transfer.rule.ts
- duplicate.rule.ts

Added

src/server/optimizer/

- constraint.solver.ts
- conflict.detector.ts
- recommendation.ranker.ts
- reflection.engine.ts
- prompt.builder.ts
- json.validator.ts
- ai-quality.scorer.ts

---

## AI Layer

Added

src/server/ai/providers/

- ai-provider.interface.ts
- openai.provider.ts
- gemini.provider.ts
- ai-provider.factory.ts

---

# Architecture

Established complete AI Optimizer Pipeline

PlanningContext

↓

Constraint Solver

↓

Conflict Detector

↓

Recommendation Ranker

↓

Reflection Engine

↓

Prompt Builder

↓

AI Provider

↓

JSON Validator

↓

AI Quality Scorer

↓

Frontend

---

# Improvements

- Business logic fully separated from AI.
- AI Provider abstraction completed.
- Prompt generation standardized.
- JSON validation introduced.
- AI quality scoring introduced.
- Multi-provider architecture completed.
- Optimizer is deterministic and independently testable.

---

# Technical Decisions

- Adopted AIProvider interface.
- Adopted Factory Pattern for AI providers.
- Optimizer no longer depends on OpenAI.
- Planner remains the only source of business decisions.
- AI is responsible only for natural language generation.

---

# Compatibility

Compatible with

- OpenAI GPT-5.5
- Gemini 2.5 Pro

Architecture prepared for

- Claude
- DeepSeek
- Local LLM

without changing Planning Engine.

---

# Documentation

Added

docs/sprints/SPRINT-3.9.md

Updated

- PROJECT_MANIFEST.md
- ROADMAP_2026.md
- DOCUMENT_INDEX.md

---

# Status

Sprint 3.9 completed successfully.

Repository architecture synchronized.

Ready for Sprint 4.