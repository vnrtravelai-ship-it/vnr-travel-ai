# PLANNING_CONTEXT.md

# VNR Travel AI

## Planning Context

Version: 1.0

Status: Planning

---

# Purpose

PlanningContext is the central object of the Planning Engine.

It contains every business decision produced by all planners.

It is the only object sent to the AI Provider.

---

# Pipeline

```
User Request

↓

Planning Engine

↓

PlanningContext

↓

AI Provider

↓

JSON

↓

Frontend
```

---

# PlanningContext Structure

PlanningContext contains:

```
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

Metadata
```

---

# Metadata

Metadata contains

- Generated Time

- Planner Version

- Knowledge Version

- Rule Version

- Locale

- Currency

- Language

---

# RailwayPlan

Contains

- Selected Trains

- Seat Types

- Railway Duration

- Stations

- Railway Cost

- Scenic Segments

---

# SchedulePlan

Contains

Complete itinerary timeline

Every activity includes

- Start Time

- End Time

- Location

- Duration

- Planner Source

---

# HotelPlan

Contains

- Recommended Hotels

- Price

- Check-in

- Check-out

- Walking Distance

- Affiliate Provider

---

# FoodPlan

Contains

- Breakfast

- Lunch

- Dinner

- Coffee

- Local Specialty

- Estimated Cost

---

# TourPlan

Contains

- Attractions

- Experiences

- Museums

- Nature

- Heritage

---

# SpecialtyPlan

Contains

- Souvenirs

- Regional Products

- Shopping Suggestions

---

# BudgetPlan

Contains

- Railway

- Hotel

- Food

- Tours

- Transport

- Miscellaneous

- Total

---

# AffiliatePlan

Contains

Every recommended booking platform.

Examples

Rail

- Baolau

- 12Go

Hotel

- Agoda

- Booking

- Traveloka

Tours

- Klook

Future

- Insurance

- SIM Card

- eVisa

---

# AI Provider

The AI Provider receives only:

```
PlanningContext
```

It never receives:

- Express Request

- Firebase

- Raw User Input

- Business Rules

---

# Benefits

PlanningContext provides

- Deterministic planning

- Testability

- AI independence

- Easier debugging

- Multiple AI provider support

- Consistent itinerary generation

---

# Long-term Vision

PlanningContext becomes the canonical representation of a travel plan.

Every output format originates from this object.

Examples

- Mobile App

- Web App

- Chatbot

- Voice Assistant

- PDF Itinerary

- Offline Guide

All use the same PlanningContext.