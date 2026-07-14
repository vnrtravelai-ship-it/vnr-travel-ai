# PLANNING_ENGINE.md

# VNR Travel AI

## Planning Engine

Version: 1.0

Status: Planning

---

# Purpose

This document defines the internal structure of the Planning Engine.

The Planning Engine coordinates multiple planners to produce a complete travel plan.

It is the permanent business core of VNR Travel AI.

---

# Planning Hierarchy

```
Planning Engine

│

├── Railway Planner

├── Hotel Planner

├── Tour Planner

├── Food Planner

├── Specialty Planner

├── Affiliate Planner

├── Budget Planner

├── Schedule Planner

└── Rule Engine
```

---

# Railway Planner

Responsibilities:

- Railway route selection
- Train selection
- Seat recommendation
- Overnight train optimization
- Transfer planning
- Station matching
- Railway timing

Input

```
Departure

Destination

Travel Date

Days

Budget
```

Output

```
Selected Trains

Stations

Travel Time

Estimated Fare
```

---

# Hotel Planner

Responsibilities

- Hotel recommendation

- Hotel budget matching

- Hotel location optimization

- Station proximity

- Partner priority

Output

```
Hotels

Price

Distance

Affiliate
```

---

# Tour Planner

Responsibilities

- Attraction recommendation

- Local experience

- Time optimization

- Route optimization

Output

```
Tours

Duration

Price

Partner
```

---

# Food Planner

Responsibilities

- Local cuisine

- Restaurant recommendation

- Meal schedule

- Regional specialties

Output

```
Breakfast

Lunch

Dinner

Coffee

Snack
```

---

# Specialty Planner

Responsibilities

- Local gifts

- Regional specialties

- Shopping recommendation

Output

```
Souvenirs

Specialties

Shopping Areas
```

---

# Budget Planner

Responsibilities

Calculate:

- Railway

- Hotel

- Food

- Tours

- Local transport

- Miscellaneous

Output

```
Budget Summary
```

---

# Schedule Planner

Responsibilities

Build chronological timeline.

Output

```
Day 1

Day 2

Day 3
```

---

# Affiliate Planner

Responsibilities

Choose partner.

Priority examples

```
Rail

↓

Baolau

↓

12Go
```

```
Hotel

↓

Agoda

↓

Booking

↓

Traveloka
```

```
Tour

↓

Klook

↓

Local Partner
```

Planning Engine decides.

AI never decides.

---

# Rule Engine

Responsibilities

Business Rules

Examples

- Prefer railway

- Prefer overnight train

- Reduce hotel cost

- Minimize transfers

- Prefer affiliate partner

- Avoid impossible schedule

---

# Planning Workflow

```
User Request

↓

Planning Engine

↓

Railway Planner

↓

Hotel Planner

↓

Tour Planner

↓

Food Planner

↓

Budget Planner

↓

Rule Engine

↓

Affiliate Planner

↓

Final Planning Context

↓

AI Provider

↓

Natural Language

↓

JSON
```

---

# Independence

Every Planner must be independent.

Example

Railway Planner never imports

Hotel Planner

Food Planner

Tour Planner

Each planner communicates only through Planning Engine.

---

# Future Expansion

Future planners may include

- Flight Planner

- Bus Planner

- Ferry Planner

- Cruise Planner

- Visa Planner

- Insurance Planner

- Weather Planner

without changing the Planning Engine architecture.

---

# Goal

The Planning Engine should eventually become capable of producing an entire itinerary without AI.

AI only converts structured planning into human-friendly language.