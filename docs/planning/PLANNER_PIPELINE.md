# PLANNER_PIPELINE.md

# VNR Travel AI

## Planner Pipeline

Version: 1.0

Status: Planning

---

# Purpose

This document defines the execution pipeline of the Planning Engine.

Every itinerary request follows this pipeline.

The execution order is fixed.

---

# Pipeline

```
User Request

↓

Request Parser

↓

Intent Analyzer

↓

Constraint Builder

↓

Railway Planner

↓

Schedule Planner

↓

Hotel Planner

↓

Food Planner

↓

Tour Planner

↓

Specialty Planner

↓

Budget Planner

↓

Affiliate Planner

↓

Rule Engine

↓

Planning Context

↓

AI Provider

↓

JSON Response
```

---

# Step 1 — Request Parser

Input

Natural language request

Example

```
Đà Nẵng → Huế

3 ngày

2 người

10 triệu

Thích văn hóa
```

Output

```
PlanningRequest
```

---

# Step 2 — Intent Analyzer

Determine:

- destination
- travel style
- companion
- duration
- budget
- preferences

Output

```
TravelIntent
```

---

# Step 3 — Constraint Builder

Build constraints

Examples

- Maximum budget

- Travel days

- Must use railway

- Overnight train preferred

Output

```
PlanningConstraints
```

---

# Step 4 — Railway Planner

Select

- train

- station

- seat

- timetable

Output

```
RailwayPlan
```

---

# Step 5 — Schedule Planner

Create timeline

Morning

Afternoon

Evening

Night

Output

```
SchedulePlan
```

---

# Step 6 — Hotel Planner

Select

- hotel

- location

- budget

Output

```
HotelPlan
```

---

# Step 7 — Food Planner

Select

- breakfast

- lunch

- dinner

- coffee

Output

```
FoodPlan
```

---

# Step 8 — Tour Planner

Select

- attractions

- experiences

- museums

- heritage

Output

```
TourPlan
```

---

# Step 9 — Specialty Planner

Recommend

- specialties

- souvenirs

- shopping

Output

```
SpecialtyPlan
```

---

# Step 10 — Budget Planner

Calculate

- railway

- hotel

- food

- tours

- transport

Output

```
BudgetPlan
```

---

# Step 11 — Affiliate Planner

Choose

- Baolau

- Agoda

- Klook

- Traveloka

according to business rules.

Output

```
AffiliatePlan
```

---

# Step 12 — Rule Engine

Validate

- budget

- impossible schedules

- duplicated activities

- transfer conflicts

Output

```
ValidatedPlan
```

---

# Step 13 — Planning Context

Merge all planner outputs into one object.

```
PlanningContext
```

This object becomes the only input for the AI Provider.

---

# AI Provider

AI receives only:

PlanningContext

AI never makes business decisions.

Its only responsibility is to convert structured planning into natural language and valid JSON.

---

# Goal

Eventually every planner should become independently testable.

The complete itinerary should be reproducible without AI.