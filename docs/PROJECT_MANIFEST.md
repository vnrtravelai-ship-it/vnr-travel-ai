# PROJECT_MANIFEST.md

# ==========================================================

# VNR Travel AI

# Project Manifest

# ==========================================================

Version

1.0

Status

ACTIVE

Last Updated

2026-07-18

Architecture Version

3.8

Owner

Tien Cuong Nguyen

Project

VNR Travel AI

---

# 1. Vision

VNR Travel AI is an AI-powered Railway Travel Planning Platform specialized for Vietnam Railway tourism.

The system is not merely a chatbot.

It is an intelligent planning engine capable of producing deterministic travel itineraries through business rules while using AI only for reasoning and presentation.

---

# 2. Mission

Build the most intelligent railway travel platform in Vietnam.

Core capabilities:

* Railway itinerary planning
* Travel recommendation
* Budget estimation
* Affiliate booking
* AI travel assistant
* Tourism knowledge platform

---

# 3. Long-term Goal

Transform VNR Travel AI into

Railway Operating System

for

Travel Planning

Booking

Tourism

CRM

Analytics

Affiliate

Community

---

# 4. Core Principles

## Principle 1

Business Rules First

AI Second

Business logic must never depend on LLM decisions.

---

## Principle 2

Deterministic Planning

The same input must always produce the same planning result before AI formatting.

---

## Principle 3

Single Source of Truth

PlanningContext is the only object allowed to be sent to AI.

AI must never access repositories directly.

---

## Principle 4

Modular Architecture

Every planner must be independently replaceable.

Modules must not create circular dependencies.

---

## Principle 5

Documentation Driven Development

Documentation is part of the product.

Every architectural change must update documentation before implementation.

---

# 5. Architecture Principles

Current Architecture

Client

↓

REST API

↓

Planning Engine

↓

Knowledge

↓

Scheduler

↓

Itinerary

↓

Budget

↓

Affiliate

↓

PlanningContext

↓

AI Optimizer (v3.9)

↓

Gemini

↓

JSON

No layer may bypass PlanningContext.

---

# 6. AI Principles

AI responsibilities

✔ Explain

✔ Summarize

✔ Recommend

✔ Rewrite

✔ Generate natural language

✔ Produce JSON

AI must NEVER

Choose trains

Choose hotels

Calculate budget

Arrange schedule

Resolve business rules

Modify repository data

Business decisions belong to Rule Engine.

---

# 7. Clean Architecture Rules

Dependencies must always point inward.

Presentation

↓

Application

↓

Domain

↓

Infrastructure

Never the opposite.

---

# 8. Repository Rules

Repositories only retrieve data.

Repositories never contain business logic.

Business logic belongs to Services and Planning Engine.

---

# 9. Scheduler Rules

Scheduler converts knowledge into executable timeline.

Scheduler Rules

TrainArrivalRule

HotelCheckinRule

MealRule

OpenHourRule

DistanceRule

Future

ConflictResolver

RouteOptimizer

ConstraintSolver

QualityScorer

---

# 10. Planning Rules

Planning Pipeline

Request

↓

Knowledge

↓

PlanningContext(Base)

↓

Scheduler

↓

Itinerary

↓

Budget

↓

Affiliate

↓

PlanningContext(Final)

↓

AI Optimizer

↓

Gemini

↓

Response

Execution order must never change without updating documentation.

---

# 11. Definition of Done

A Sprint is complete only when ALL conditions are satisfied.

Code completed

Lint passed

Tests passed (when available)

Documentation updated

Roadmap updated

Architecture updated

Project State updated

Changelog updated

Manifest updated (if architecture/process changes)

Git Commit

Git Tag (for milestone)

Working Tree Clean

Only then may the next Sprint begin.

---

# 12. Documentation Policy

Every architectural change requires updating:

PROJECT_STATE.md

CHANGELOG.md

ARCHITECTURE.md

PLANNER_PIPELINE.md

ROADMAP_2026.md

PROJECT_MANIFEST.md

No implementation is considered complete until documentation is synchronized.

---

# 13. Git Workflow

Development

↓

npm run lint

↓

Tests

↓

Commit

↓

Tag

↓

Push

↓

Documentation Review

↓

Next Sprint

Never skip lint before commit.

Never tag unstable versions.

---

# 14. Sprint Workflow

Every Sprint follows:

Planning

↓

Architecture Review

↓

Documentation Update

↓

Implementation

↓

Testing

↓

Git Commit

↓

Git Tag

↓

Sprint Summary

↓

Next Sprint

---

# 15. Architecture Decision Records

Every significant architectural decision requires an ADR.

Examples

ADR-001 Clean Architecture

ADR-002 PlanningContext

ADR-003 Scheduler Engine

ADR-004 AI Optimizer

ADR-005 Knowledge Layer

---

# 16. Testing Strategy

Priority

Planning Engine

Scheduler Engine

Budget Engine

Affiliate Engine

Integration Tests

API Tests

Future

Performance Tests

Load Tests

AI Output Validation

---

# 17. Backup Policy

Every milestone must have:

Git Tag

Documentation Snapshot

Architecture Snapshot

Project Tree Snapshot

Database Backup (future)

Environment Backup

Prompt Backup

No milestone is considered safe without backup.

---

# 18. Release Policy

Stable Release

Architecture Complete

Documentation Complete

Lint Pass

Tests Pass

Tagged Version

Release Notes

Production Ready

---

# 19. Roadmap

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

v3.8.5 Foundation Hardening

ADR

Manifest

Sprint Logs

OpenAPI

Testing Foundation

Backup Strategy

CI/CD

v3.9 AI Optimizer

Conflict Detection

Recommendation Ranking

Constraint Solver

Quality Score

Reflection Engine

v4.0 Multi-city Planner

v4.1 Production Backend

v4.2 Planner Frontend

v5.0 Railway Travel AI Platform

---

# 20. Collaboration Rules

Before every development session

Review Project State

Review Roadmap

Review Current Sprint

Review Architecture

Confirm Definition of Done

Only then begin coding.

This rule applies to every future conversation and every contributor.

---

# 21. Project Philosophy

We are not building a chatbot.

We are building an intelligent travel planning platform.

Business rules provide correctness.

AI provides intelligence.

Documentation preserves knowledge.

Architecture enables long-term evolution.

Every change must make the project easier to maintain, easier to extend, and safer to evolve.
