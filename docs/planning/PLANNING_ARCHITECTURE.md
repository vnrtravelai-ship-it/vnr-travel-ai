# PLANNING_ARCHITECTURE.md

# VNR Travel AI

## Planning Engine Architecture

Version: 1.0

Status: Planning

---

# Purpose

This document defines the architecture of the Planning Engine.

The Planning Engine is the permanent business brain of VNR Travel AI.

Its responsibility is to transform user requirements into an optimized travel plan before any AI provider generates natural language.

---

# Design Philosophy

AI should generate content.

Planning Engine should make decisions.

Business intelligence must never depend on a Large Language Model.

---

# High-Level Flow

```
User Request

        │

        ▼

Planning Engine

        │

        ├──────── Railway Planner

        ├──────── Hotel Planner

        ├──────── Food Planner

        ├──────── Tour Planner

        ├──────── Affiliate Planner

        ├──────── Rule Engine

        └──────── Knowledge Base

        │

        ▼

AI Provider

        │

        ▼

Structured JSON

        │

        ▼

Frontend
```

---

# Core Responsibilities

The Planning Engine is responsible for:

- Understanding travel intent
- Selecting railway routes
- Planning transport
- Estimating budget
- Selecting hotels
- Selecting tours
- Selecting restaurants
- Selecting local specialties
- Choosing affiliate partners
- Applying business rules
- Preparing structured context for AI

The Planning Engine does not generate natural language.

---

# AI Responsibility

AI Providers only perform:

- Description generation
- Travel storytelling
- Recommendation wording
- Conversational responses

AI Providers never decide:

- Which train
- Which hotel
- Which partner
- Which itinerary
- Which business rule

---

# Knowledge Sources

Planning Engine consumes structured knowledge:

- Railway Database
- Station Database
- Hotel Database
- Tour Database
- Restaurant Database
- Local Specialty Database
- Affiliate Database
- Business Rules

These sources become the foundation for every recommendation.

---

# Long-Term Goal

The Planning Engine should eventually be capable of producing a complete itinerary without requiring AI.

AI becomes an enhancement layer rather than the decision layer.

---

# Principles

Planning must be:

- Deterministic
- Explainable
- Replaceable
- Testable
- Independent of any AI provider

Business rules always take precedence over AI-generated suggestions.