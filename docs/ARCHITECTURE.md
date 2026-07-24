# ==========================================================
# ARCHITECTURE
# VNR TRAVEL AI
# Enterprise System Architecture
# ==========================================================

Version: 4.8
Status: ACTIVE DEVELOPMENT
Architecture Status: STABLE
Current Sprint: Sprint 4.8

Last Updated: 2026-07

---

# 1. PURPOSE

This document defines the complete software architecture of
VNR Travel AI.

It is the authoritative reference describing:

• overall system architecture
• backend architecture
• frontend responsibilities
• AI architecture
• planning pipeline
• optimizer pipeline
• dependency rules
• scalability strategy
• commercial architecture

Every implementation must comply with this document.

If this document conflicts with implementation,
the implementation must be corrected.

---

# 2. SYSTEM OVERVIEW

VNR Travel AI is an enterprise-grade AI-assisted railway travel
planning platform.

The platform is designed around one central principle:

Business Logic is deterministic.

Artificial Intelligence is non-deterministic.

Therefore,

Business Logic must never depend on AI.

Instead,

Business Logic produces a complete PlanningContext.

Artificial Intelligence receives that PlanningContext
and transforms it into user-friendly output.

---

# 3. HIGH LEVEL ARCHITECTURE

                    User

                      │

                      ▼

          React + TypeScript + Vite

                      │

                REST API (Express)

                      │

         -----------------------------

                      │

                Backend Services

                      │

         -----------------------------

                      │

              Planning Engine

                      │

         -----------------------------

                      │

             Knowledge Layer

                      │

         -----------------------------

                      │

             Scheduler Engine

                      │

         -----------------------------

                      │

              Optimizer Layer

                      │

         -----------------------------

                      │

                 AI Core

                      │

         -----------------------------

                      │

           Output Validation

                      │

         -----------------------------

                      │

              Self-Healing

                      │

         -----------------------------

                      │

          JSON Serialization

                      │

                      ▼

                Frontend Response

---

# 4. CORE DESIGN PHILOSOPHY

The architecture follows the principles below.

Business Logic First

AI Second

Deterministic Planning

Layer Isolation

Repository Pattern

Dependency Injection

Single Source of Truth

Commercial Scalability

Documentation Driven Development

Long-term Maintainability

Every future feature must preserve these principles.

---

# 5. ARCHITECTURAL OBJECTIVES

The architecture has six primary objectives.

Objective 1

Produce deterministic travel planning.

Objective 2

Allow AI providers to be replaced without affecting business logic.

Objective 3

Support commercial deployment.

Objective 4

Remain maintainable for many years.

Objective 5

Support multiple tourism domains.

Objective 6

Scale toward enterprise workloads.

---

# 6. PRIMARY ARCHITECTURE LAYERS

The system is divided into independent layers.

Presentation Layer

↓

API Layer

↓

Application Layer

↓

Planning Layer

↓

Knowledge Layer

↓

Scheduling Layer

↓

Optimization Layer

↓

Artificial Intelligence Layer

↓

Validation Layer

↓

Persistence Layer

↓

Infrastructure Layer

Every layer owns exactly one responsibility.

No layer may absorb responsibilities from another.

---

# 7. SYSTEM OF RECORD

The following objects are considered authoritative.

PlanningRequest

The original user intent.

PlanningContext

The complete business planning result.

ConstraintResult

Planning validation outcome.

ReflectionSuggestion

Optimization recommendations.

RepairInstruction

Formatting repair instructions.

AIResponse

AI provider response.

PlanningContext is the primary business object.

Everything else is derived from it.

---

# 8. TECHNOLOGY STACK

Frontend

React

TypeScript

Vite

Backend

Node.js

Express

TypeScript

Database

Firebase Firestore

Authentication

Firebase Authentication

Storage

Firebase Storage

AI Providers

Gemini

OpenAI

Future Supported Providers

Claude

DeepSeek

Local LLM

Infrastructure

GitHub

Railway

Cloudflare (future)

---

# 9. PROJECT MODULES

Current backend modules include:

planning

knowledge

scheduler

optimizer

ai

repositories

providers

services

controllers

routes

cache

itinerary

Future modules include:

weather

pricing

events

notifications

analytics

monitoring

payments

Each module is independently evolvable.

---

# 10. ARCHITECTURE STATUS

Architecture Phase

Stable

Business Architecture

Stable

Planning Architecture

Stable

Knowledge Architecture

Stable

Scheduler Architecture

Stable

Optimizer Architecture

Stable

AI Core

Stable

Commercial Readiness

In Progress

Production Readiness

In Progress

This architecture is considered frozen for the current generation
of the platform.

Future improvements must extend the architecture without
breaking existing responsibilities.

---
# ==========================================================
# 11. LAYERED ARCHITECTURE
# ==========================================================

The entire platform follows a strict layered architecture.

Each layer owns exactly one responsibility.

A layer may only communicate with the layer immediately below it.

Cross-layer business logic is prohibited.

The architecture intentionally separates deterministic business
logic from non-deterministic AI behavior.

---

# Layer Overview

Presentation Layer

↓

REST API Layer

↓

Application Layer

↓

Planning Layer

↓

Knowledge Layer

↓

Scheduler Layer

↓

Optimizer Layer

↓

AI Layer

↓

Validation Layer

↓

Persistence Layer

↓

Infrastructure Layer

---

# 12. PRESENTATION LAYER

Directory

src/

Purpose

User interaction.

Responsibilities

Render UI

Collect user input

Display itineraries

Call REST APIs

Manage client-side state

Never

Contain business rules

Calculate itineraries

Call AI providers directly

Access Firestore directly

The frontend is a presentation layer only.

---

# 13. REST API LAYER

Directories

controllers/

routes/

Purpose

Expose backend capabilities.

Responsibilities

Receive HTTP requests

Validate request format

Call Services

Return HTTP responses

Never

Contain business rules

Contain Planning logic

Contain AI logic

Contain Scheduler logic

Every Controller must remain thin.

---

# 14. APPLICATION LAYER

Directories

services/

Purpose

Coordinate backend modules.

Responsibilities

Orchestrate requests

Select workflows

Call PlanningEngine

Call AI Orchestrator

Coordinate repositories

Never

Implement Planning algorithms

Implement Scheduler algorithms

Implement Recommendation algorithms

Application Services coordinate.

They do not decide.

---

# 15. PLANNING LAYER

Directory

planning/

Purpose

Generate the complete PlanningContext.

Planning Engine owns:

PlanningRequest

PlanningContext

Business Decisions

Travel Intent

Budget Planning

Hotel Planning

Railway Planning

Food Planning

Tour Planning

Affiliate Planning

Planning Engine is the heart of the platform.

Only PlanningEngine may create PlanningContext.

No downstream module may regenerate PlanningContext.

---

# 16. KNOWLEDGE LAYER

Directories

knowledge/

repositories/

Purpose

Provide deterministic travel knowledge.

Knowledge modules include:

Railway

Hotel

Food

Tour

Budget

Affiliate

Future

Weather

Events

Pricing

Traffic

Knowledge Services expose data.

They never orchestrate workflows.

---

# 17. SCHEDULER LAYER

Directory

scheduler/

Purpose

Convert planning decisions into a timeline.

Scheduler responsibilities

Train arrival

Departure

Transfer time

Meal timing

Hotel check-in

Activity ordering

Open hours

Distance optimization

Scheduler never changes recommendations.

Scheduler only changes timing.

---

# 18. OPTIMIZER LAYER

Directory

optimizer/

Purpose

Improve Planning quality.

Current modules

Constraint Solver

Conflict Detector

Recommendation Ranker

Reflection Engine

Prompt Builder

Repair Builder

Prompt Optimizer

Optimizer responsibilities

Detect conflicts

Recommend improvements

Generate AI prompts

Prepare repair instructions

Optimizer never replaces Planning Engine.

Planning decisions remain authoritative.

---

# 19. AI LAYER

Directory

ai/

Purpose

Communicate with external AI providers.

Responsibilities

Prompt execution

Provider abstraction

Retry

Output generation

Provider selection

Self-healing

Never

Implement business rules

Select itinerary

Select train

Calculate schedules

Business Logic is forbidden inside AI.

---

# 20. VALIDATION LAYER

Directories

ai/validator/

Purpose

Guarantee output integrity.

Pipeline

JSON Validator

↓

Schema Validator

↓

Output Validator

↓

Self-Healing

↓

Response Parser

Only validated output may reach frontend.

Malformed responses are automatically repaired or rejected.

---

# 21. PERSISTENCE LAYER

Directories

repositories/

cache/

Purpose

Store and retrieve data.

Responsibilities

Firestore access

Caching

Data retrieval

Persistence abstraction

Repositories never contain business decisions.

Repositories expose data only.

---

# 22. INFRASTRUCTURE LAYER

External systems

Firebase

Railway

GitHub

Cloud

AI Providers

Future

Payment

Weather APIs

Maps

Analytics

Infrastructure is replaceable.

Business Logic must remain infrastructure-independent.

---

# 23. LAYER COMMUNICATION RULES

Allowed

Presentation

↓

API

↓

Application

↓

Planning

↓

Knowledge

↓

Repositories

Forbidden

Presentation → Repository

Presentation → AI

Repository → Planning

Repository → Scheduler

AI → Repository

AI → Planning

Controllers → Repository

Circular dependencies

Every dependency must point downward.

---

# 24. SINGLE SOURCE OF TRUTH

PlanningContext is the central business object.

Every downstream component consumes it.

No downstream component recreates it.

ConstraintResult

ReflectionSuggestion

RepairInstruction

AIResponse

All depend on PlanningContext.

PlanningContext never depends on them.

---

# 25. LAYER STABILITY

Stable Layers

Planning

Knowledge

Scheduler

Repositories

Dependency Injection

ApplicationContainer

Business Rules

Flexible Layers

AI Providers

Prompt Templates

Prompt Optimizer

Self-Healing

Future Providers

This separation minimizes architectural risk.

---
# ==========================================================
# 26. BACKEND ARCHITECTURE
# ==========================================================

The backend follows a Domain-Oriented Architecture.

Business capabilities are grouped by domain rather than by
technical implementation.

All backend source code resides under:

src/server/

Every directory has a clearly defined responsibility.

No directory may assume another directory's responsibility.

---

# 27. BACKEND DIRECTORY STRUCTURE

src/server/

├── ai/

├── cache/

├── controllers/

├── core/

├── itinerary/

├── knowledge/

├── optimizer/

├── planning/

├── providers/

├── repositories/

├── routes/

├── scheduler/

├── services/

Each directory is described below.

---

# 28. AI DIRECTORY

Directory

src/server/ai/

Purpose

Communicate with external AI providers.

Submodules

providers/

validator/

retry/

self-healing/

orchestrator/

parser/

Responsibilities

Prompt execution

Retry logic

Output validation

Self-healing

Provider abstraction

Response parsing

Never

Contain business rules

Calculate itineraries

Modify PlanningContext

---

# 29. CACHE DIRECTORY

Directory

src/server/cache/

Purpose

Cache deterministic planning results.

Responsibilities

Planning cache

Cache managers

Future

Redis adapter

Distributed cache

Cache invalidation

The cache layer must remain transparent to business logic.

---

# 30. CONTROLLERS DIRECTORY

Directory

src/server/controllers/

Purpose

HTTP entry points.

Responsibilities

Receive request

Validate request format

Call services

Return HTTP response

Controllers should remain thin.

Business logic is forbidden.

---

# 31. CORE DIRECTORY

Directory

src/server/core/

Purpose

Application infrastructure.

Current

ApplicationContainer

Future

Configuration

Dependency graph

Bootstrap

Application lifecycle

This directory owns application startup.

---

# 32. ITINERARY DIRECTORY

Directory

src/server/itinerary/

Purpose

Transform PlanningContext into user itinerary.

Responsibilities

Activity model

DayPlan

Itinerary Builder

Formatting

Grouping

Never

Choose hotels

Choose trains

Choose restaurants

Itinerary Builder formats.

Planning Engine decides.

---

# 33. KNOWLEDGE DIRECTORY

Directory

src/server/knowledge/

Purpose

Travel knowledge abstraction.

Current Services

Railway

Hotel

Food

Tour

Budget

Affiliate

Scheduler

Future

Weather

Events

Traffic

Pricing

Knowledge is deterministic.

Knowledge never orchestrates.

---

# 34. OPTIMIZER DIRECTORY

Directory

src/server/optimizer/

Purpose

Improve planning quality.

Current modules

Constraint Solver

Conflict Detector

Recommendation Ranker

Reflection

Repair

Prompt Builder

Prompt Optimizer

Rules

Models

Future

Weather scoring

Traffic scoring

Pricing optimization

Optimizer produces recommendations only.

---

# 35. PLANNING DIRECTORY

Directory

src/server/planning/

Purpose

Generate PlanningContext.

Contains

Planning Engine

Planning models

Planning templates

Planning rules

Planning utilities

Planning knowledge

Planning owns all business decisions.

No other directory may generate PlanningContext.

---

# 36. PROVIDERS DIRECTORY

Directory

src/server/providers/

Purpose

Business data providers.

Current

Railway Provider

Hotel Provider

Food Provider

Budget Provider

Affiliate Provider

Tour Provider

Future

Weather Provider

Event Provider

Map Provider

Payment Provider

Providers retrieve information.

They do not decide business rules.

---

# 37. REPOSITORIES DIRECTORY

Directory

src/server/repositories/

Purpose

Persistence abstraction.

Responsibilities

Firestore

Database access

Template loading

Knowledge loading

Repositories expose data only.

Repositories never contain business logic.

---

# 38. ROUTES DIRECTORY

Directory

src/server/routes/

Purpose

HTTP routing.

Responsibilities

Endpoint registration

Controller mapping

Middleware registration

Routes must never call repositories directly.

---

# 39. SCHEDULER DIRECTORY

Directory

src/server/scheduler/

Purpose

Timeline generation.

Contains

Scheduler Engine

Rules

Models

Future

Optimization algorithms

Scheduling heuristics

Scheduler owns only chronology.

---

# 40. SERVICES DIRECTORY

Directory

src/server/services/

Purpose

Application orchestration.

Responsibilities

Coordinate modules

Expose backend capabilities

Bridge REST and Planning Engine

Services never replace Planning Engine.

---

# 41. DEPENDENCY INJECTION

ApplicationContainer is the only service registry.

Responsibilities

Register singleton services

Resolve dependencies

Centralize lifecycle

Benefits

Loose coupling

Testability

Replaceable implementations

Future extensions

No service should manually instantiate another long-lived service.

---

# 42. PACKAGE DEPENDENCIES

Allowed

controllers

↓

services

↓

planning

↓

knowledge

↓

repositories

↓

providers

Forbidden

repositories

↓

services

planning

↓

controllers

providers

↓

planning

AI

↓

planning

scheduler

↓

repositories

Circular dependencies are prohibited.

---

# 43. MODULE ISOLATION

Every backend module is independently replaceable.

Example

Replace Gemini

↓

Planning Engine unchanged

Replace Firestore

↓

Repositories updated

↓

Planning unchanged

Replace Hotel Provider

↓

Planning unchanged

Replace Scheduler

↓

AI unchanged

Isolation is mandatory for long-term maintenance.

---

# 44. CURRENT BACKEND STATUS

Planning Engine

Stable

Knowledge Layer

Stable

Scheduler

Stable

Optimizer

Stable

AI Core

Stable

Repositories

Stable

Dependency Injection

Stable

ApplicationContainer

Stable

Backend Architecture

Frozen

Future development must extend the architecture instead of replacing it.

---
# ==========================================================
# 45. PLANNING ENGINE ARCHITECTURE
# ==========================================================

Planning Engine is the core business component of VNR Travel AI.

Everything begins here.

Every itinerary.

Every recommendation.

Every budget.

Every hotel.

Every railway decision.

Planning Engine owns all business decisions.

Artificial Intelligence never replaces Planning Engine.

---

# 46. PLANNING ENGINE MISSION

Planning Engine transforms

PlanningRequest

into

PlanningContext.

PlanningRequest represents user intent.

PlanningContext represents deterministic travel planning.

PlanningContext becomes the foundation of the entire platform.

---

# 47. PLANNING PIPELINE

PlanningRequest

↓

Travel Intent Analysis

↓

Railway Planning

↓

Hotel Planning

↓

Food Planning

↓

Tour Planning

↓

Scheduler

↓

Itinerary Builder

↓

Budget Planning

↓

Affiliate Planning

↓

Planning Metadata

↓

PlanningContext

This pipeline is deterministic.

Each stage executes exactly once.

---

# 48. PLANNING REQUEST

PlanningRequest contains user intent.

Typical information includes

departure city

destination

travel dates

number of travelers

budget

preferences

hotel requirements

food preferences

transport preferences

language

currency

PlanningRequest never contains business decisions.

It describes only what the user wants.

---

# 49. TRAVEL INTENT

Planning Engine converts PlanningRequest into TravelIntent.

TravelIntent normalizes user wishes.

Examples

Family vacation

Luxury travel

Budget backpacking

Business trip

Railway enthusiast

Photography

Food exploration

TravelIntent guides planners.

TravelIntent never contains itinerary decisions.

---

# 50. PLANNING CONTEXT

PlanningContext is the central business object.

PlanningContext contains

request

railway

hotel

food

tours

itinerary

budget

affiliate

metadata

PlanningContext is immutable after Planning Engine finishes.

Downstream components consume it.

They never regenerate it.

---

# 51. PLANNER MODULES

Planning Engine delegates work to specialized planners.

Current planners

RailwayPlanner

HotelPlanner

FoodPlanner

TourPlanner

SchedulePlanner

BudgetPlanner

AffiliatePlanner

SpecialtyPlanner

Each planner owns exactly one domain.

No planner may assume another planner's responsibility.

---

# 52. RAILWAY PLANNER

Responsibilities

Select train

Determine departure

Determine arrival

Estimate duration

Determine seat class

Estimate railway budget

Never

Choose hotel

Choose restaurants

Choose attractions

---

# 53. HOTEL PLANNER

Responsibilities

Recommend hotels

Estimate hotel price

Evaluate hotel quality

Support affiliate selection

Never

Choose train

Modify railway schedule

Generate itinerary timing

---

# 54. FOOD PLANNER

Responsibilities

Recommend meals

Recommend specialties

Recommend cafés

Support local cuisine

Never

Change itinerary timing

Change budget allocation

---

# 55. TOUR PLANNER

Responsibilities

Recommend attractions

Estimate visit duration

Estimate ticket prices

Determine categories

Never

Optimize chronology

Calculate transfers

---

# 56. SCHEDULE PLANNER

SchedulePlanner prepares Scheduler input.

Scheduler then generates

arrival sequence

departure sequence

meal timing

hotel check-in

activity ordering

SchedulePlanner prepares.

Scheduler executes.

---

# 57. BUDGET PLANNER

Responsibilities

Estimate

railway

hotel

food

tours

transport

miscellaneous

total

Budget Planner never invents prices.

All calculations originate from Knowledge Layer.

---

# 58. AFFILIATE PLANNER

Responsibilities

Generate affiliate links.

Select provider.

Associate products.

Never

Recommend products based on commission.

Business quality always comes first.

Affiliate revenue is secondary.

---

# 59. SPECIALTY PLANNER

Responsibilities

Recommend regional specialties.

Recommend gifts.

Recommend local experiences.

Future

shopping planner

souvenir planner

festival planner

---

# 60. PLANNING METADATA

PlanningMetadata records planning information.

Contains

plannerVersion

generatedAt

locale

currency

provider

model

Metadata improves observability.

Metadata never influences planning decisions.

---

# 61. PLANNING PRINCIPLES

Planning Engine follows strict principles.

Deterministic

Repeatable

Predictable

Independent

Observable

Auditable

Commercial

Every identical PlanningRequest should generate an equivalent
PlanningContext.

---

# 62. PLANNING RULES

Planning Engine always executes

Knowledge First

Planning Second

Scheduling Third

Budget Fourth

Affiliate Fifth

AI Last

Changing this order is prohibited.

---

# 63. PLANNING ENGINE AUTHORITY

Planning Engine is the only component allowed to

create PlanningContext

update PlanningContext

approve business decisions

Every downstream component is read-only.

Planning authority belongs exclusively to Planning Engine.

---

# 64. FAILURE POLICY

If any planner fails

Planning Engine should

detect failure

report failure

stop safely

avoid partial planning

PlanningContext should never contain inconsistent business data.

Validation happens before AI execution.

---

# 65. CURRENT STATUS

Planning Engine

Enterprise Ready

Pipeline

Stable

Planner Separation

Complete

Business Logic

Isolated

Deterministic Planning

Guaranteed

Architecture Status

Frozen

Future enhancements must extend planners without violating
existing responsibilities.

---
# ==========================================================
# 66. KNOWLEDGE LAYER ARCHITECTURE
# ==========================================================

The Knowledge Layer is the deterministic information provider
of VNR Travel AI.

Its responsibility is simple:

Provide trusted travel knowledge.

It never creates business decisions.

It never generates itineraries.

It never communicates with AI.

---

# 67. KNOWLEDGE LAYER PURPOSE

The Knowledge Layer exists to isolate data from business logic.

Planning Engine should never know

where

the information comes from.

Instead,

Planning Engine requests knowledge.

Knowledge Layer returns deterministic results.

---

# 68. KNOWLEDGE ARCHITECTURE

Planning Engine

↓

Knowledge Repository

↓

Knowledge Services

↓

Repositories

↓

Providers

↓

External Data Sources

Each level has exactly one responsibility.

---

# 69. KNOWLEDGE REPOSITORY

Current Component

KnowledgeRepository

Purpose

Expose every business knowledge service through a unified entry
point.

Current services include

RailwayService

HotelService

FoodService

TourService

BudgetService

AffiliateService

SchedulerService

Future services

WeatherService

PricingService

EventService

TrafficService

MapService

The repository coordinates access.

It does not perform business calculations.

---

# 70. KNOWLEDGE SERVICES

Knowledge Services transform raw repository data into
business-ready knowledge.

Current services

Railway

Hotel

Food

Tour

Budget

Affiliate

Scheduler

Responsibilities

Normalize data

Filter invalid records

Apply deterministic rules

Return business objects

Never

Plan itineraries

Rank hotels

Optimize schedules

Call AI

---

# 71. REPOSITORIES

Repositories own persistence.

Responsibilities

Firestore

Static JSON

CSV

Future SQL

Future APIs

Repositories expose

read operations

query operations

lookup operations

Repositories never expose business rules.

---

# 72. PROVIDERS

Providers retrieve information from external systems.

Current providers

Railway Provider

Hotel Provider

Food Provider

Tour Provider

Budget Provider

Affiliate Provider

Future providers

Weather

Maps

Events

Pricing

Traffic

Providers are replaceable.

Planning Engine must remain unchanged when a provider changes.

---

# 73. KNOWLEDGE DOMAINS

Current domains

Railway

Hotel

Food

Tour

Budget

Affiliate

Scheduler

Future domains

Weather

Events

Local Transportation

Museums

Parks

Nightlife

Medical

Emergency

Shopping

Visa

Insurance

The architecture allows unlimited domain expansion.

---

# 74. RAILWAY KNOWLEDGE

Railway knowledge contains

stations

routes

train codes

departure times

arrival times

seat types

estimated prices

distance

travel duration

Railway knowledge is deterministic.

It must originate from trusted railway data.

---

# 75. HOTEL KNOWLEDGE

Hotel knowledge contains

hotel metadata

address

coordinates

price

rating

star level

affiliate links

Hotel knowledge never selects hotels.

It only provides candidates.

---

# 76. FOOD KNOWLEDGE

Food knowledge contains

restaurants

regional specialties

cafés

opening hours

categories

Food knowledge never schedules meals.

Scheduler decides timing.

---

# 77. TOUR KNOWLEDGE

Tour knowledge contains

points of interest

opening hours

ticket prices

categories

estimated visit duration

coordinates

Tour knowledge never builds itineraries.

---

# 78. BUDGET KNOWLEDGE

Budget knowledge contains

estimated transportation costs

hotel pricing

meal estimates

tour estimates

miscellaneous expenses

Budget calculations remain deterministic.

---

# 79. AFFILIATE KNOWLEDGE

Affiliate knowledge contains

booking URLs

provider metadata

campaign identifiers

commission metadata

Business quality always has priority over affiliate revenue.

Affiliate knowledge never changes recommendations.

---

# 80. KNOWLEDGE EXPANSION STRATEGY

New domains should follow the same pattern.

Repository

↓

Provider

↓

Service

↓

KnowledgeRepository

↓

Planning Engine

No shortcuts are allowed.

---

# 81. DATA OWNERSHIP

Each domain owns its own data.

Railway owns railway data.

Hotel owns hotel data.

Food owns food data.

Tour owns attraction data.

Cross-domain ownership is prohibited.

---

# 82. DATA NORMALIZATION

Every Knowledge Service must normalize external information before
returning it.

Normalization includes

field names

currencies

coordinates

time zones

units

language

Planning Engine must always receive normalized data.

---

# 83. DATA VALIDATION

Knowledge Layer validates

required fields

coordinates

prices

dates

opening hours

invalid records

Invalid records should never reach Planning Engine.

---

# 84. CACHING STRATEGY

Knowledge responses should support caching.

Current

Planning Cache

Future

Redis

Distributed Cache

Regional Cache

Caching must remain transparent to Planning Engine.

---

# 85. KNOWLEDGE LAYER RULES

Knowledge Layer

may

retrieve

normalize

cache

validate

Knowledge Layer

must never

plan

optimize

rank

schedule

generate prompts

call AI

Business intelligence belongs elsewhere.

---

# 86. CURRENT STATUS

Knowledge Repository

Stable

Repositories

Stable

Providers

Stable

Business Separation

Complete

Future Expansion

Supported

Architecture Status

Frozen

Future development should add new knowledge domains without
modifying Planning Engine.

---
# ==========================================================
# 87. SCHEDULER ARCHITECTURE
# ==========================================================

Scheduler is responsible for transforming planning decisions
into a feasible chronological itinerary.

Planning Engine answers

"What should the traveler do?"

Scheduler answers

"When should each activity happen?"

Scheduler never changes business decisions.

Scheduler only determines execution order.

---

# 88. SCHEDULER PURPOSE

Scheduler guarantees that every generated itinerary is
chronologically valid.

Responsibilities

Activity ordering

Arrival handling

Departure handling

Transfer timing

Meal timing

Hotel check-in

Opening hour validation

Travel duration estimation

Scheduler is responsible for time.

Nothing else.

---

# 89. SCHEDULER POSITION

Planning Pipeline

Planning Engine

↓

PlanningContext

↓

Scheduler Engine

↓

Itinerary Builder

↓

Budget Planner

↓

Affiliate Planner

↓

Optimizer

↓

AI Core

Scheduler executes immediately after Planning Engine.

---

# 90. SCHEDULER INPUT

Scheduler consumes

PlanningContext

Specifically

RailwayPlan

HotelPlan

TourPlan

FoodPlan

PlanningMetadata

Scheduler never consumes AI output.

Scheduler never modifies PlanningRequest.

---

# 91. SCHEDULER OUTPUT

Scheduler produces

DayPlan

Activity

ScheduleSlot

Estimated durations

Transfer windows

Meal windows

Hotel check-in time

Departure preparation

PlanningContext remains the owner.

Scheduler enriches it.

---

# 92. SCHEDULER ENGINE

Directory

scheduler/

Core component

SchedulerEngine

Responsibilities

Generate timeline

Validate chronology

Apply scheduling rules

Resolve timing conflicts

Never

Recommend attractions

Recommend hotels

Recommend trains

Business recommendations belong to Planning Engine.

---

# 93. SCHEDULER RULES

Current scheduling rules

TrainArrivalRule

HotelCheckinRule

MealRule

OpenHourRule

DistanceRule

Future rules

WeatherRule

TrafficRule

CrowdRule

FestivalRule

AccessibilityRule

Rules remain independent.

Each rule owns exactly one responsibility.

---

# 94. TRAIN ARRIVAL RULE

Purpose

Ensure activities begin only after train arrival.

Responsibilities

Arrival buffer

Station transfer

Platform exit

Hotel transfer

Violation example

Activity

08:30

Train arrival

09:10

This is invalid.

---

# 95. HOTEL CHECK-IN RULE

Purpose

Guarantee hotel availability.

Responsibilities

Minimum check-in time

Arrival delay handling

Luggage drop

Hotel transfer

Scheduler never assumes early check-in.

---

# 96. MEAL RULE

Purpose

Insert reasonable meal windows.

Breakfast

Morning

Lunch

Midday

Dinner

Evening

Coffee

Optional

Meal scheduling should never overlap activities.

---

# 97. OPEN HOUR RULE

Purpose

Respect operating hours.

Scheduler verifies

Opening

Closing

Special holidays

Temporary closure

Activities outside opening hours are rejected.

---

# 98. DISTANCE RULE

Purpose

Reduce unnecessary travel.

Scheduler minimizes

Walking

Taxi

Transfer

Backtracking

Distance optimization improves itinerary quality.

Distance optimization never changes attraction selection.

---

# 99. TRANSFER CALCULATION

Scheduler estimates

Walking

Taxi

Bus

Metro

Railway transfer

Future

Ride-hailing

Bicycle

Water transport

Transfer estimation remains deterministic.

---

# 100. SCHEDULE SLOT

Scheduler converts activities into ScheduleSlot objects.

Each slot includes

Start time

End time

Duration

Location

Category

Transfer information

Slots never overlap.

---

# 101. DAY PLAN

Scheduler groups ScheduleSlots into DayPlans.

Each DayPlan contains

Morning

Lunch

Afternoon

Dinner

Evening

Future

Night

Overnight Train

Airport Transfer

---

# 102. CONFLICT DETECTION

Scheduler performs basic conflict detection.

Examples

Activity overlap

Negative transfer time

Hotel before arrival

Meal overlap

Attraction closed

Complex conflict analysis belongs to Optimizer.

---

# 103. FAILURE HANDLING

If scheduling fails

Scheduler returns failure.

Planning Engine should never receive invalid chronology.

No partial schedules.

No inconsistent timelines.

---

# 104. SCHEDULER EXTENSIBILITY

Future capabilities

Dynamic weather adjustment

Live traffic

Train delay adaptation

Peak-hour avoidance

Festival routing

Accessibility routing

Architecture already supports these additions.

---

# 105. CURRENT STATUS

Scheduler Engine

Stable

Scheduling Rules

Stable

Chronology Validation

Stable

Timeline Generation

Stable

Architecture Status

Frozen

Future improvements must extend rule sets rather than replacing
Scheduler Engine.

---
---

# 16. Development Roadmap inside Architecture

The architecture evolves in controlled phases.

## Phase 1

Foundation

Status

Completed

Includes

- Repository Layer
- Planning Engine
- Scheduler
- Knowledge Repository
- AI Core
- Prompt Optimizer
- Output Validator
- Self Healing

---

## Phase 2

Knowledge Completion

Status

Current

Includes

- Railway Knowledge Expansion
- Hotel Knowledge Expansion
- Tour Knowledge Expansion
- Food Knowledge Expansion
- Specialty Knowledge Expansion

Goal

Every planner must consume structured business knowledge instead of hardcoded values.

---

## Phase 3

Planner Intelligence

Status

Planned

Includes

- Weather Planner
- Pricing Planner
- Event Planner
- Transfer Planner
- Preference Planner

Goal

PlanningContext becomes increasingly complete before AI generation.

---

## Phase 4

Commercial Platform

Includes

- Affiliate Optimization
- Recommendation Learning
- User Profile
- Saved Trips
- Analytics
- Monitoring

---

## Phase 5

Production Platform

Includes

- High Availability
- Multi-region
- AI Routing
- Model Switching
- Cost Optimization

---

# 17. Performance Requirements

Planning Engine

Target

< 300 ms

Knowledge Repository

Target

< 100 ms

Prompt Builder

Target

< 30 ms

AI Provider

Depends on provider

Validator

< 30 ms

Self Healing

< 300 ms

Overall Planning

Target

< 2 s
(before AI generation)

---

# 18. Security Requirements

Business Rules

Never generated by AI.

Affiliate URLs

Must be validated.

Prompt

Must be deterministic.

PlanningContext

Must never be modified directly by AI.

Environment Variables

Never exposed to frontend.

Repositories

Read-only for AI.

---

# 19. Documentation Synchronization Policy

The following files are mandatory and must always remain synchronized.

PROJECT_MANIFEST.md

MASTER_ROADMAP.md

ROADMAP_2026.md

PROJECT_STATE.md

CHANGELOG.md

ARCHITECTURE.md

Whenever a Sprint finishes

the documentation must be updated before creating a Git tag.

---

# 20. Definition of Architecture Stability

Architecture is considered stable when

✓ Build passes

✓ Lint passes

✓ Dependency direction remains correct

✓ No business logic leaks into AI layer

✓ Documentation synchronized

✓ Repository clean

✓ Git tagged

✓ Sprint completed

Only then may development continue.

---

# 21. Absolute Rules

These rules must never be violated.

1.

AI never makes business decisions.

2.

Planning Engine is the only source of truth.

3.

Knowledge Repository owns all business knowledge.

4.

Scheduler owns time.

5.

Optimizer owns validation.

6.

Prompt Builder only serializes.

7.

Providers only communicate with AI.

8.

Validator validates.

9.

Self Healing repairs only AI output.

10.

Frontend never contains business logic.

11.

Business logic must remain deterministic.

12.

Architecture changes require ADR.

---

# 22. Architecture Status

Current Version

4.x AI Core

Architecture Health

★★★★★

Maintainability

★★★★★

Scalability

★★★★★

Commercial Readiness

★★★★★

AI Independence

★★★★★

Repository Health

★★★★★

Technical Debt

Low

Status

Architecture Frozen

Future development must follow this document.

This document is the official architecture specification of VNR Travel AI.