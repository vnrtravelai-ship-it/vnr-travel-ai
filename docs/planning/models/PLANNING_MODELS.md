# PLANNING_MODELS.md

# VNR Travel AI

## Planning Models

Version: 1.0

Status: Planning

---

# Purpose

This document defines the core data models used by the Planning Engine.

All planners communicate using these models.

No planner communicates directly with another planner.

Planning Engine coordinates everything.

---

# Core Models

The Planning Engine uses the following models.

```
PlanningRequest

TravelIntent

PlanningConstraints

RailwayPlan

SchedulePlan

HotelPlan

FoodPlan

TourPlan

SpecialtyPlan

BudgetPlan

AffiliatePlan

PlanningContext

PlanningResult
```

---

# PlanningRequest

Raw request from frontend.

Contains:

- departure
- destination
- departureDate
- returnDate
- numberOfDays
- adults
- children
- budget
- travelStyle
- interests
- language

No business logic.

---

# TravelIntent

Represents what the traveler actually wants.

Examples

- Heritage

- Food

- Luxury

- Family

- Photography

- Backpacking

- Railway Experience

---

# PlanningConstraints

Contains all planning rules.

Examples

- Maximum Budget

- Minimum Budget

- Railway Required

- Overnight Preferred

- Hotel Required

- Maximum Transfers

- Walking Distance

---

# RailwayPlan

Contains

- selected trains

- selected stations

- seat type

- railway duration

- estimated railway cost

---

# SchedulePlan

Contains

Day 1

Morning

Afternoon

Evening

Night

Every activity has a time.

---

# HotelPlan

Contains

Hotels

Location

Check-in

Check-out

Budget

Affiliate

---

# FoodPlan

Contains

Breakfast

Lunch

Dinner

Coffee

Specialties

---

# TourPlan

Contains

Tour

Museum

Temple

Beach

Experience

Duration

Price

---

# SpecialtyPlan

Contains

Souvenirs

Specialties

Local Markets

Shopping

---

# BudgetPlan

Contains

Railway Cost

Hotel Cost

Food Cost

Tour Cost

Transport Cost

Miscellaneous

Total Budget

---

# AffiliatePlan

Contains

Rail

Hotel

Tour

Insurance

Payment

Each recommendation includes:

Provider

Affiliate ID

Priority

---

# PlanningContext

The PlanningContext merges every planner output.

It becomes the only input sent to AI.

PlanningContext contains

- TravelIntent

- RailwayPlan

- SchedulePlan

- HotelPlan

- FoodPlan

- TourPlan

- SpecialtyPlan

- BudgetPlan

- AffiliatePlan

No raw frontend data should reach AI.

---

# PlanningResult

Final structured planning output.

PlanningResult is converted into:

- JSON

- Markdown

- Chat

- Mobile UI

- Web UI

without changing planner logic.

---

# Design Principles

Every model must be:

- Immutable after creation whenever possible
- Serializable
- Testable
- Independent of AI
- Independent of Express
- Independent of Firebase

---

# Future Compatibility

These models are designed to support:

- Vietnam Railway

- International Railway

- Flights

- Bus

- Ferry

- Cruise

- Visa

- Insurance

without changing the Planning Engine architecture.