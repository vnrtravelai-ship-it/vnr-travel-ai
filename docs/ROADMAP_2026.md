# ==========================================================
# VNR Travel AI
# DEVELOPMENT ROADMAP
# ==========================================================

Document Version

4.8

Document Type

Master Development Roadmap

Status

ACTIVE

Last Updated

2026-07-24

Master Reference

MASTER_ROADMAP.md

Architecture

ARCHITECTURE.md

Project Governance

PROJECT_MANIFEST.md

Current State

PROJECT_STATE.md

---

# 1. PURPOSE

This document defines the execution roadmap for VNR Travel AI.

It specifies:

• every development Sprint

• implementation order

• dependencies

• completion criteria

• commercial milestones

• production readiness

This roadmap is mandatory.

Development must follow the roadmap sequentially.

Completed Sprints are never reimplemented unless explicitly approved.

---

# 2. PROJECT OBJECTIVES

Primary Objective

Build the most intelligent AI-powered railway travel planning platform in Vietnam.

Business Objectives

• Railway-first travel planning

• Deterministic planning

• Enterprise-grade architecture

• Commercial affiliate platform

• AI-assisted itinerary generation

• Long-term maintainability

Technical Objectives

• Clean Architecture

• Dependency Injection

• Repository Pattern

• Modular AI Core

• Multi-provider support

• Production-ready backend

---

# 3. DEVELOPMENT PHILOSOPHY

The project is developed incrementally.

Each Sprint must:

Design

↓

Implement

↓

Validate

↓

Document

↓

Release

↓

Tag

↓

Continue

No Sprint may be skipped.

No Sprint may overlap another.

Architecture evolves only through completed roadmap milestones.

---

# 4. ROADMAP STATUS

Current Sprint

Sprint 4.8

Status

Completed

Next Sprint

Sprint 4.9

Current Overall Completion

Approximately 60%

Current Project Phase

AI Core Completion

Next Phase

Project Completion Audit

Future Phase

Planner Intelligence

Commercial Phase

Enterprise Deployment

---

# 5. COMPLETED PHASES

Phase A

Architecture Foundation

Status

Completed

Deliverables

• Repository Pattern

• Dependency Injection

• Layered Architecture

• Application Container

• Planning Models

• Knowledge Models

• Scheduler Models

---

Phase B

Business Planning Layer

Status

Completed

Deliverables

• Planning Engine

• Scheduler Engine

• Itinerary Engine

• Budget Engine

• Affiliate Engine

• Knowledge Repository

• Knowledge Services

---

Phase C

AI Core

Status

Completed

Deliverables

• AI Provider Layer

• AI Orchestrator

• Prompt Builder

• Prompt Optimizer

• Output Validator

• Self-Healing

• Reflection

• Repair

• Retry Foundation

---

The architecture foundation is now considered complete.

Future work focuses on intelligence rather than architecture.
# ==========================================================
# 6. EXECUTION ROADMAP
# ==========================================================

The project is implemented through sequential development sprints.

Each Sprint has a fixed objective.

No Sprint may start before the previous Sprint has been completed and documented.

---

# Sprint 4.1

Status

Completed

Objective

AI Provider Abstraction

Completed Deliverables

• AI Provider Interface

• Gemini Provider

• OpenAI Provider

• Provider Factory

Completion Criteria

✓ Build PASS

✓ Lint PASS

✓ Multi-provider architecture established

---

# Sprint 4.2

Status

Completed

Objective

Retry Layer

Completed Deliverables

• Retry Engine

• Retry Policy

• Retry Types

Capabilities

• Exponential Backoff

• Maximum Retry Control

• Retry Classification

Completion Criteria

✓ Retry layer isolated

✓ No business logic inside retry

---

# Sprint 4.3

Status

Completed

Objective

AI Orchestrator

Completed Deliverables

• AI Orchestrator

Responsibilities

• Provider selection

• Retry integration

• AI request execution

• Response collection

Completion Criteria

✓ Provider-independent execution

✓ Central orchestration established

---

# Sprint 4.4

Status

Completed

Objective

Response Parsing

Completed Deliverables

• Response Parser

Responsibilities

• JSON extraction

• Markdown cleanup

• AI response normalization

Completion Criteria

✓ Parser independent from providers

---

# Sprint 4.5

Status

Completed

Objective

Reflection & Repair

Completed Deliverables

Reflection

• reflection.builder

• reflection.engine

• reflection.types

Repair

• repair.builder

• repair.engine

• repair.prompt

• repair.types

Responsibilities

• Detect AI output weaknesses

• Produce repair instructions

Completion Criteria

✓ Reflection separated from Repair

✓ AI feedback loop established

---

# Sprint 4.6

Status

Completed

Objective

Prompt Optimizer

Completed Deliverables

Prompt Engine

Prompt Templates

Prompt Variables

Prompt Optimizer

Capabilities

• Dynamic prompt generation

• Prompt optimization

• Business rule injection

Completion Criteria

✓ Prompt Builder becomes deterministic

✓ Prompt Engine centralized

---

# Sprint 4.7

Status

Completed

Objective

Output Validation

Completed Deliverables

• JSON Validator

• Schema Validator

• Output Validator

• Validator Engine

Capabilities

• JSON validation

• Schema validation

• Structural verification

Completion Criteria

✓ Invalid AI output detected automatically

✓ Validation independent from AI providers

---

# Sprint 4.8

Status

Completed

Objective

AI Self-Healing

Completed Deliverables

• Healing Builder

• Healing Engine

• Healing Prompt

• Healing Types

Capabilities

• Automatic repair request generation

• AI retry after validation failure

• Recovery pipeline

Completion Criteria

✓ Self-healing pipeline operational

✓ AI Core architecture completed
# ==========================================================
# 7. FUTURE DEVELOPMENT ROADMAP
# ==========================================================

After Sprint 4.8, the architecture is considered complete.

Future development focuses on:

• completing unfinished modules

• increasing planner intelligence

• expanding business capabilities

• production hardening

The implementation order below is mandatory.

---

# Sprint 4.9

Status

Planned

Priority

Critical

Title

Project Completion Audit

Objective

Complete every unfinished module before introducing new features.

Tasks

Architecture Audit

Repository Audit

Dependency Audit

Project Tree Audit

Documentation Audit

Empty File Audit

Legacy Code Audit

Duplicate Code Audit

Dead Code Audit

Naming Convention Audit

Import Audit

Folder Structure Audit

Module Integration Audit

Required Outputs

• Every placeholder file completed

• Every module integrated

• Legacy code removed

• Duplicate implementations eliminated

• Documentation synchronized

Completion Criteria

✓ Build PASS

✓ Lint PASS

✓ Zero placeholder files

✓ Zero duplicated architecture

✓ Repository considered architecture complete

---

# Sprint 5.0

Status

Planned

Priority

High

Title

Planner Intelligence

Objective

Increase itinerary quality before AI generation.

Modules

Hotel Scorer

Restaurant Scorer

Railway Scorer

Tour Scorer

Specialty Scorer

Recommendation Fusion

Priority Ranking

Quality Scoring

Expected Result

Planning Engine produces optimized recommendations before Prompt Builder executes.

---

# Sprint 5.1

Status

Planned

Title

Constraint Intelligence

Modules

Advanced Constraint Solver

Transfer Optimization

Walking Optimization

Train Connection Optimization

Schedule Conflict Resolution

Expected Result

Planner automatically resolves most itinerary conflicts without AI intervention.

---

# Sprint 5.2

Status

Planned

Title

Knowledge Expansion

Modules

Railway Knowledge Expansion

Hotel Knowledge Expansion

Restaurant Knowledge Expansion

Tour Knowledge Expansion

Weather Knowledge

Festival Knowledge

Expected Result

Knowledge Repository becomes the primary deterministic data source.

---

# Sprint 5.3

Status

Planned

Title

Context Intelligence

Modules

Traveler Profile

Travel Style

Budget Preference

Companion Type

Accessibility

Family Travel

Senior Travel

Expected Result

Planning becomes personalized before AI execution.

---

# Sprint 5.4

Status

Planned

Title

Memory Engine

Modules

Conversation Memory

Trip History

Preference Memory

Recommendation Feedback

Expected Result

Planner learns from previous interactions while preserving deterministic business rules.

---

# Sprint 5.5

Status

Planned

Title

Planning Optimization

Modules

Performance Optimization

Caching Strategy

Planning Benchmark

Parallel Knowledge Retrieval

Prompt Compression

Expected Result

Reduced latency with identical planning quality.
# ==========================================================
# 8. COMMERCIALIZATION ROADMAP
# ==========================================================

After the Planning Engine reaches production quality, development shifts to
commercial features and user-facing capabilities.

These sprints transform VNR Travel AI from an AI engine into a complete
commercial travel platform.

---

# Sprint 6.0

Status

Planned

Priority

High

Title

Frontend Integration

Objective

Connect the complete AI Planning Engine to the production frontend.

Modules

Planner UI

Planning Wizard

Travel Preference Form

Progress Indicator

Streaming Response UI

Interactive Itinerary Viewer

Error Recovery UI

Expected Result

Users can generate complete travel plans directly from the web application.

Completion Criteria

✓ End-to-end planning flow operational

✓ Planner UI connected to backend APIs

✓ Streaming response supported

---

# Sprint 6.1

Status

Planned

Title

Account System

Modules

Authentication

User Profile

Saved Trips

Favorite Locations

Travel Preferences

Trip History

Expected Result

Planning becomes persistent for each registered user.

---

# Sprint 6.2

Status

Planned

Title

Affiliate Commercial Engine

Modules

Hotel Affiliate

Tour Affiliate

Rail Ticket Affiliate

Restaurant Affiliate

Specialty Products

Affiliate Click Tracking

Affiliate Revenue Analytics

Expected Result

Every generated itinerary can generate commercial revenue through integrated affiliate services.

---

# Sprint 6.3

Status

Planned

Title

Real-time Data Integration

Modules

Weather API

Railway Schedule API

Hotel Availability

Dynamic Pricing

Traffic Information

Local Events

Expected Result

Generated plans use live operational data whenever available.

---

# Sprint 6.4

Status

Planned

Title

Notification Engine

Modules

Trip Reminder

Train Departure Reminder

Hotel Check-in Reminder

Weather Alert

Delay Notification

Expected Result

Users receive proactive travel assistance before and during trips.

---

# Sprint 7.0

Status

Planned

Priority

High

Title

Mobile Platform

Objective

Deliver VNR Travel AI on mobile devices.

Platforms

Android

iOS

Progressive Web App

Offline Mode

Expected Result

The platform becomes accessible anywhere during travel.

---

# Sprint 7.1

Status

Planned

Title

Offline Planning

Modules

Offline Knowledge Cache

Offline Railway Information

Offline Maps

Offline Itinerary

Synchronization Engine

Expected Result

Core planning functions remain available without internet connectivity.

---

# Sprint 7.2

Status

Planned

Title

Multilingual Platform

Languages

Vietnamese

English

Japanese

Korean

Chinese

Expected Result

International travelers can use the platform natively.

---

# Sprint 7.3

Status

Planned

Title

Accessibility

Modules

Screen Reader Support

Large Text

Color Accessibility

Voice Interaction

Accessible Navigation

Expected Result

The platform complies with modern accessibility standards.
# ==========================================================
# 9. ENTERPRISE ROADMAP
# ==========================================================

After the commercial platform is completed, the project enters the
Enterprise phase.

This phase focuses on scalability, operational excellence and business
management.

---

# Sprint 8.0

Status

Planned

Priority

High

Title

Enterprise Dashboard

Objective

Provide operational tools for administrators.

Modules

Administration Dashboard

Operational Statistics

Revenue Dashboard

Affiliate Dashboard

Knowledge Management

User Management

System Configuration

Expected Result

Business operators can manage the entire platform without developer
intervention.

---

# Sprint 8.1

Status

Planned

Title

Business Analytics

Modules

Planning Analytics

Search Analytics

Affiliate Analytics

Revenue Reports

Conversion Reports

Popular Destinations

Popular Hotels

Popular Routes

Expected Result

Business decisions become data-driven.

---

# Sprint 8.2

Status

Planned

Title

Monitoring Platform

Modules

Application Monitoring

Error Monitoring

Performance Monitoring

Request Metrics

AI Usage Metrics

System Health Dashboard

Expected Result

Every production component is continuously monitored.

---

# Sprint 8.3

Status

Planned

Title

Security Hardening

Modules

Rate Limiting

Request Validation

Input Sanitization

Secret Management

Audit Logging

Permission Management

Expected Result

Enterprise-grade security.

---

# Sprint 8.4

Status

Planned

Title

Performance Optimization

Modules

Database Optimization

Planning Cache Optimization

Knowledge Cache

Parallel Execution

Prompt Compression

Lazy Loading

Expected Result

Production performance suitable for large-scale traffic.

---

# Sprint 9.0

Status

Planned

Priority

High

Title

AI Travel Agent

Objective

Transform VNR Travel AI into an intelligent travel assistant.

Modules

Conversation Planning

Travel Suggestions

Interactive Itinerary Editing

Trip Replanning

Preference Learning

Expected Result

The platform evolves from itinerary generation into an interactive AI
assistant.

---

# Sprint 9.1

Status

Planned

Title

Voice Assistant

Modules

Speech Recognition

Speech Synthesis

Voice Commands

Hands-free Navigation

Expected Result

Travel planning becomes voice-driven.

---

# Sprint 9.2

Status

Planned

Title

Intelligent Recommendation

Modules

Personal Recommendation

Context Recommendation

Location Recommendation

Season Recommendation

Expected Result

Recommendations continuously improve using deterministic planning and
historical feedback.

---

# Sprint 10.0

Status

Planned

Priority

Critical

Title

Production Release

Objective

Release VNR Travel AI as a commercial platform.

Deliverables

Production Infrastructure

Production Database

CI/CD

Backup

Monitoring

Documentation

Operational Manual

Commercial Deployment

Success Criteria

Stable Production

Scalable Infrastructure

Commercial Availability

Enterprise Documentation

Operational Readiness

Project Status

Production Complete

------------------------------------------------------------

# Long-term Vision

VNR Travel AI will become:

• Vietnam's leading railway travel planning platform.

• A deterministic AI planning engine.

• A commercial affiliate ecosystem.

• A scalable enterprise software platform.

• A long-term maintainable software product.
# ==========================================================
# 10. DEVELOPMENT GOVERNANCE
# ==========================================================

The roadmap is mandatory.

Every implementation must follow the sprint sequence defined in this
document.

No sprint may be skipped.

No future sprint may begin until the current sprint satisfies all
completion criteria.

Architecture evolves only through the roadmap.

Ad-hoc development is prohibited.

---

# ==========================================================
# 11. SPRINT COMPLETION CRITERIA
# ==========================================================

A Sprint is considered complete only when ALL of the following conditions
are satisfied.

Source Code

✓ Feature implemented

✓ Architecture respected

✓ Dependency direction respected

✓ No duplicated responsibility

✓ No placeholder implementation

Quality

✓ npm run lint PASS

✓ npm run build PASS

✓ No TypeScript errors

✓ No architecture violations

Documentation

The following documents MUST be synchronized.

MASTER_ROADMAP.md

PROJECT_MANIFEST.md

PROJECT_STATE.md

ROADMAP_2026.md

CHANGELOG.md

ARCHITECTURE.md

Relevant ADR documents

Relevant Sprint documents

Repository

✓ git add

✓ git commit

✓ git tag

✓ git push origin develop --tags

Only after all conditions are satisfied may the sprint be marked as
Completed.

---

# ==========================================================
# 12. SESSION COMPLETION WORKFLOW
# ==========================================================

Every development session follows the exact workflow below.

1.

Implement feature

↓

2.

Run

npm run lint

↓

3.

Run

npm run build

↓

4.

Fix every error

↓

5.

Review architecture consistency

↓

6.

Update documentation

↓

7.

git add .

↓

8.

git commit

↓

9.

git tag

↓

10.

git push origin develop --tags

↓

11.

Verify working tree is clean

This workflow is mandatory.

---

# ==========================================================
# 13. AI / DEVELOPER HANDOVER PROTOCOL
# ==========================================================

Any AI assistant or developer continuing this project MUST first read the
following documents in order.

1.

MASTER_ROADMAP.md

↓

2.

PROJECT_MANIFEST.md

↓

3.

PROJECT_STATE.md

↓

4.

ARCHITECTURE.md

↓

5.

ROADMAP_2026.md

↓

6.

CHANGELOG.md

Only after understanding these documents may implementation continue.

The current sprint must be identified before any code is modified.

---

# ==========================================================
# 14. IMMUTABLE ARCHITECTURE RULES
# ==========================================================

The following principles must never change without an Architecture Decision
Record (ADR).

Planning Engine is the single source of truth.

Business rules are deterministic.

AI Providers never contain business logic.

Knowledge Repository owns business knowledge.

Repositories never call AI.

Frontend never communicates directly with AI providers.

Dependency Injection is mandatory.

Repository Pattern is mandatory.

Layer boundaries must remain independent.

Documentation is part of the product.

---

# ==========================================================
# 15. PROJECT COMPLETION DEFINITION
# ==========================================================

The project is considered complete only when the following objectives are
fulfilled.

Architecture

100%

Backend

100%

Planner Intelligence

100%

Knowledge Base

100%

Commercial Features

100%

Frontend

100%

Mobile Platform

100%

Production Infrastructure

100%

Monitoring

100%

Security

100%

Documentation

100%

Operational Readiness

100%

Commercial Launch

100%

---

# ==========================================================
# 16. CURRENT PROJECT POSITION
# ==========================================================

Current Sprint

Sprint 4.8

Status

Completed

Immediate Next Sprint

Sprint 4.9

Objective

Project Completion Audit

Current Phase

AI Core Completed

Upcoming Phase

Planner Intelligence

Long-term Target

Commercial Railway Travel AI Platform

Overall Development Direction

Foundation

↓

Architecture

↓

Business Logic

↓

AI Core

↓

Project Completion Audit

↓

Planner Intelligence

↓

Commercial Platform

↓

Enterprise Platform

↓

Production Release

The project must always progress forward along this roadmap.

End of Document.

Sprint 5.5A
- Thiết kế DayPlan
- Hoàn thiện Itinerary Layer
- Chuẩn hóa ItineraryBuilder

Sprint 5.5B
- Rich Planning Template
- Mở rộng PlanningTemplate từ metadata thành template đầy đủ

Sprint 5.6
- HybridPlanningService
- Hybrid Planning Engine

Sprint 5.7
- AI Enhancement
- Recommendation Layer
