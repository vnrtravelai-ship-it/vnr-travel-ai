# ARCHITECTURE.md

# ==========================================================
# VNR Travel AI
# System Architecture
# ==========================================================

Version

3.8

Status

Current Stable Architecture

Architecture Style

Clean Architecture

Domain Driven Design (DDD)

Rule Engine + AI Assisted Planning

Last Updated

2026-07-17

Git Tag

v3.8-scheduler-rules

---

# Vision

VNR Travel AI is an intelligent travel planning platform specialized for Vietnam Railway tourism.

The architecture separates:

- Business Rules
- Knowledge
- Planning
- AI
- API

Business logic MUST always remain deterministic.

AI MUST never replace business rules.

---

# Architecture Overview

                    Client
                       │
                REST Controllers
                       │
                  Service Layer
                       │
                Planning Engine
                       │
         ┌─────────────┴─────────────┐
         │                           │
 Knowledge Repository          Template Repository
         │
         ▼
 Railway / Hotel / Food / Tour
         │
         ▼
 PlanningContext (Base)
         │
         ▼
 Scheduler Engine
         │
         ▼
 Scheduler Rules
         │
         ▼
 Scheduler Service
         │
         ▼
 Itinerary Builder
         │
         ▼
 Budget Planner
         │
         ▼
 Affiliate Planner
         │
         ▼
 PlanningContext (Final)
         │
         ▼
 Gemini Provider
         │
         ▼
 JSON Response

---

# Layered Architecture

Presentation Layer

Responsibilities

REST API

Controllers

Validation

Response formatting

Current Modules

ChatController

ItineraryController

LeadsController

ClicksController

---

Application Layer

Responsibilities

Business orchestration

Planner execution

Dependency injection

Current Modules

PlanningEngine

ApplicationContainer

CacheManager

TemplateRepository

---

Knowledge Layer

Responsibilities

Retrieve domain knowledge

Normalize data

Provide planner input

Current Services

RailwayService

HotelService

FoodService

TourService

BudgetService

AffiliateService

SchedulerService

ItineraryService

---

Repository Layer

Responsibilities

Read structured knowledge

Current Repositories

RailwayRepository

HotelRepository

FoodRepository

TourRepository

BudgetRepository

AffiliateRepository

TemplateRepository

---

Planning Layer

Responsibilities

Generate deterministic travel plans

Main Components

PlanningRequest

PlanningContext

TravelIntent

PlanningMetadata

Planner Pipeline

Rule Engine

---

Scheduler Layer

Responsibilities

Convert planning information into executable timeline.

Main Components

SchedulerEngine

SchedulerService

ScheduleSlot

ScheduleType

---

Current Scheduler Rules

TrainArrivalRule

Purpose

Insert railway arrival event.

HotelCheckinRule

Purpose

Insert hotel check-in.

MealRule

Purpose

Insert

Breakfast

Lunch

Dinner

Coffee

OpenHourRule

Purpose

Ensure attractions are visited during opening hours.

DistanceRule

Purpose

Optimize activity order by travel distance.

---

Itinerary Layer

Responsibilities

Convert schedule slots into user itinerary.

Components

ItineraryBuilder

Activity

DayPlan

Output

PlanningContext.itinerary

---

Budget Layer

Responsibilities

Estimate total travel cost.

Includes

Railway

Hotel

Meals

Tours

Transport

Shopping

Output

BudgetPlan

---

Affiliate Layer

Responsibilities

Select booking providers.

Current Providers

Baolau

Traveloka

Agoda

Klook

Official Railway

Selection is rule-driven.

---

AI Layer

Responsibilities

Natural language generation only.

Input

PlanningContext (Final)

Output

Markdown

JSON

Conversation

AI MUST NOT

Choose train

Choose hotel

Calculate budget

Arrange schedule

Resolve business rules

---

Planning Flow

PlanningRequest

↓

Knowledge Services

↓

PlanningContext (Base)

↓

SchedulerEngine

↓

TrainArrivalRule

↓

HotelCheckinRule

↓

MealRule

↓

OpenHourRule

↓

DistanceRule

↓

SchedulerService

↓

ItineraryBuilder

↓

PlanningContext.itinerary

↓

BudgetService

↓

AffiliateService

↓

PlanningContext (Final)

↓

GeminiProvider

↓

REST API

↓

JSON

---

Dependency Graph

ApplicationContainer

│

├── CacheManager

├── TemplateRepository

├── KnowledgeRepository

│

├── RailwayService

├── HotelService

├── FoodService

├── TourService

├── SchedulerService

├── ItineraryService

├── BudgetService

└── AffiliateService

---

Knowledge Repository

KnowledgeRepository

│

├── RailwayService

├── HotelService

├── FoodService

├── TourService

├── SchedulerService

├── ItineraryService

├── BudgetService

└── AffiliateService

---

Planning Context Evolution

Phase 1

PlanningRequest

↓

Knowledge Plans

↓

PlanningContext(Base)

Contains

Request

Railway

Hotel

Food

Tours

Metadata

Phase 2

Scheduler

↓

DayPlan

↓

PlanningContext.itinerary

Phase 3

Budget

Affiliate

↓

PlanningContext(Final)

---

Project Structure

src/server

cache/

controllers/

core/

itinerary/

knowledge/

planning/

providers/

repositories/

routes/

scheduler/

services/

---

Current Status

Completed

ApplicationContainer

KnowledgeRepository

PlanningEngine

SchedulerEngine

SchedulerService

Scheduler Rules

ItineraryBuilder

Budget Planner

Affiliate Planner

PlanningContext

Gemini Provider

REST API

---

Technical Principles

Business Rules First

AI Second

Rule Driven

Deterministic Planning

Clean Architecture

Dependency Injection

DDD

Independent Modules

Testable Services

Reusable Components

---

Future Architecture (v3.9)

PlanningContext(Base)

↓

Scheduler

↓

AI Optimizer

↓

Conflict Resolver

↓

Recommendation Ranking

↓

Budget Refinement

↓

Affiliate Optimization

↓

PlanningContext(Final)

↓

Gemini

---

Roadmap

Completed

v3.0 Core Planning

v3.1 Railway

v3.2 Hotel

v3.3 Food

v3.4 Tour

v3.5 Budget

v3.6 Affiliate

v3.7 Itinerary

v3.8 Scheduler

Next

v3.9 AI Optimizer

Future

v4.0 Multi-city Planning

v4.1 Real-time Railway

v4.2 Adaptive Recommendation

v5.0 Autonomous Travel AI

---

Documentation Status

Architecture Version

3.8

Documentation Status

UP TO DATE

Synchronized With

Planning Engine

Scheduler Engine

Knowledge Repository

ApplicationContainer

PlanningContext

Git Tag

v3.8-scheduler-rules