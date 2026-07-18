# ADR-003

# Scheduler Engine Architecture

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

The Scheduler Engine is responsible for transforming business knowledge into a deterministic timeline.

Before introducing the Scheduler Engine, planners generated activities independently.

Example

Railway Planner

↓

Hotel Planner

↓

Tour Planner

↓

Food Planner

Each planner determined its own time.

This resulted in:

* duplicated time slots
* overlapping activities
* impossible hotel check-in
* restaurants before train arrival
* tours after closing time
* inconsistent itineraries

A dedicated scheduling layer became necessary.

---

# Decision

A dedicated **Scheduler Engine** shall be introduced.

The Scheduler Engine is the only component allowed to create the travel timeline.

Every planner provides business information only.

The Scheduler Engine decides:

* ordering
* time slots
* activity sequence
* conflict resolution

---

# Architecture

```text
Planning Context

↓

Scheduler Engine

↓

Scheduler Rules

├── TrainArrivalRule

├── HotelCheckinRule

├── MealRule

├── OpenHourRule

└── DistanceRule

↓

ScheduleSlot[]

↓

SchedulerService

↓

DayPlan[]

↓

Itinerary Builder
```

---

# Responsibilities

Scheduler Engine is responsible for

* generating ScheduleSlot
* sorting activities
* validating chronological order
* resolving conflicts
* optimizing sequence
* preserving locked activities

Scheduler Engine is NOT responsible for

* selecting hotels
* selecting restaurants
* selecting tours
* calculating budget
* generating natural language

---

# Scheduler Rules

## TrainArrivalRule

Creates the first immutable activity.

Purpose

Guarantee itinerary starts from actual train arrival.

---

## HotelCheckinRule

Ensures

* valid check-in
* valid check-out
* no impossible hotel schedule

---

## MealRule

Automatically inserts

* breakfast
* lunch
* dinner
* coffee

according to itinerary timeline.

---

## OpenHourRule

Ensures attractions are visited only during opening hours.

---

## DistanceRule

Optimizes route order.

Minimizes unnecessary travel.

---

# ScheduleSlot

Scheduler output is always

```text
ScheduleSlot[]
```

Scheduler never creates DayPlan.

Scheduler never generates JSON.

Scheduler never formats output.

---

# Locked Activities

Certain activities cannot be moved.

Examples

* Train arrival
* Train departure
* Flight
* Hotel reservation

Property

```typescript
locked: true
```

Distance optimization must never move locked activities.

---

# Conflict Resolution

Scheduler resolves

* overlapping activities
* invalid check-in
* closed attractions
* duplicated meals
* impossible transport

Future versions will support

* automatic rescheduling
* alternative recommendations
* dynamic timeline adjustment

---

# Design Principles

Business Knowledge

↓

Scheduler

↓

Timeline

↓

Formatter

Never

Business Knowledge

↓

Formatter

↓

Scheduler

---

# Alternatives Considered

## Option 1

Each planner determines its own time.

Rejected.

Reason

Creates duplicated scheduling logic.

---

## Option 2

LLM creates timeline.

Rejected.

Reason

Non-deterministic.

Cannot guarantee chronological correctness.

---

## Option 3

Dedicated Scheduler Engine.

Accepted.

Reason

Deterministic.

Testable.

Reusable.

---

# Future Evolution

Scheduler Engine will later support

* multi-day scheduling
* multi-city planning
* weather-aware scheduling
* crowd prediction
* opening-hour optimization
* transportation optimization
* user preference scoring

without changing the overall architecture.

---

# Impact

Affected modules

* SchedulerEngine
* SchedulerService
* ScheduleSlot
* ItineraryBuilder
* PlanningEngine

---

# Related Documents

* ADR-001-PLANNING_ENGINE_ARCHITECTURE.md
* ADR-002-KNOWLEDGE_REPOSITORY_ARCHITECTURE.md
* ARCHITECTURE.md
* PLANNER_PIPELINE.md

---

# Decision

The Scheduler Engine is the only component authorized to generate and optimize itinerary timelines.

All future scheduling features must be implemented through Scheduler Rules rather than directly inside planners or services.
