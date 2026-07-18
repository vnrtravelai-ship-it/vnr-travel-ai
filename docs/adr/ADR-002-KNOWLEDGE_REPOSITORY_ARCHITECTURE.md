# ADR-002

# Knowledge Repository Architecture

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

The Planning Engine requires access to multiple independent business domains:

* Railway
* Hotel
* Food
* Tour
* Budget
* Affiliate
* Scheduler
* Itinerary

Initially, planners instantiated services directly.

Example

Planning Engine

↓

new RailwayService()

↓

new HotelService()

↓

new TourService()

This created:

* tight coupling
* duplicated initialization
* poor scalability
* difficult testing
* dependency management problems

---

# Decision

Introduce a single **KnowledgeRepository**.

KnowledgeRepository becomes the only gateway to business knowledge.

PlanningEngine never creates services directly.

Every planner accesses services through the repository.

---

# Architecture

```text
ApplicationContainer

↓

KnowledgeRepository

├── RailwayService

├── HotelService

├── FoodService

├── TourService

├── BudgetService

├── AffiliateService

├── SchedulerService

└── ItineraryService
```

PlanningEngine

↓

KnowledgeRepository

↓

Business Services

---

# Responsibilities

KnowledgeRepository

Responsible for

* service creation
* dependency wiring
* repository injection
* exposing business services

Not responsible for

* itinerary generation
* business rules
* scheduling
* AI prompting

---

# Benefits

Single source of business knowledge.

Dependency Injection friendly.

Simplified PlanningEngine.

Better unit testing.

Centralized service lifecycle.

Future modules can be added without modifying PlanningEngine.

---

# Service Responsibilities

## RailwayService

Railway itinerary knowledge.

Train search.

Seat recommendation.

Timetable.

---

## HotelService

Accommodation planning.

Hotel recommendation.

Location selection.

---

## FoodService

Meal recommendation.

Restaurant planning.

Coffee stops.

---

## TourService

Tour recommendation.

Opening hours.

Destination knowledge.

---

## SchedulerService

Generate ScheduleSlot timeline.

No itinerary formatting.

---

## ItineraryService

Convert ScheduleSlot into DayPlan.

No scheduling logic.

---

## BudgetService

Estimate costs.

Budget validation.

Budget breakdown.

---

## AffiliateService

Generate affiliate links.

Business partner selection.

Commission rules.

---

# Design Rules

PlanningEngine

↓

KnowledgeRepository

↓

Services

↓

Repositories

PlanningEngine must never access repositories directly.

Services must never call each other directly unless explicitly documented.

---

# Alternatives Considered

## Option 1

PlanningEngine creates every service.

Rejected.

Reason

Too much coupling.

---

## Option 2

Each planner owns its own services.

Rejected.

Reason

Duplicated dependencies.

---

## Option 3

Central KnowledgeRepository.

Accepted.

Reason

Cleaner architecture.

---

# Future Evolution

KnowledgeRepository will later expose

* AIOptimizerService
* RecommendationRankingService
* ConflictDetectionService
* ReflectionService
* PricingService
* WeatherService
* EventService

PlanningEngine remains unchanged.

---

# Impact

Affected modules

* ApplicationContainer
* PlanningEngine
* SchedulerEngine
* KnowledgeRepository
* All Planner Services

---

# Related Documents

* ARCHITECTURE.md
* PLANNER_PIPELINE.md
* PROJECT_MANIFEST.md
* ADR-001

---

# Decision

KnowledgeRepository is the only business knowledge gateway.

No module may bypass it to access business repositories directly.
