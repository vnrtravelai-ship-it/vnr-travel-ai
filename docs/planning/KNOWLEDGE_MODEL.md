# KNOWLEDGE_MODEL.md

# VNR Travel AI

## Knowledge Model

Version: 1.0

Status: Planning

---

# Purpose

This document defines the business knowledge consumed by the Planning Engine.

The Knowledge Model separates structured travel knowledge from AI-generated content.

Business knowledge must be maintained independently from any AI provider.

---

# Knowledge Domains

The Planning Engine consumes the following knowledge domains:

```
Railway

Stations

Trains

Hotels

Tours

Restaurants

Local Specialties

Affiliate Partners

Business Rules

Geography

Weather (future)

Events (future)
```

---

# Railway Knowledge

Contains:

- Railway lines
- Stations
- Train numbers
- Seat types
- Timetables
- Travel duration
- Estimated fares

Example

```
Station

Name

Province

Latitude

Longitude

Railway Line
```

---

# Train Knowledge

Contains

- Train code
- Route
- Departure station
- Arrival station
- Schedule
- Seat classes
- Typical travel duration

Example

```
SE1

SE2

SE3

SE4

HD1

HD2
```

---

# Station Knowledge

Contains

- Station code
- Name
- Province
- Nearby attractions
- Nearby hotels
- Nearby restaurants
- Transportation options

---

# Hotel Knowledge

Contains

- Name
- Address
- Coordinates
- Price range
- Star rating
- Railway distance
- Affiliate platform

---

# Tour Knowledge

Contains

- Tour name
- Duration
- Price
- Destination
- Category
- Booking partner

---

# Restaurant Knowledge

Contains

- Restaurant name
- Cuisine
- Average price
- Coordinates
- Railway accessibility

---

# Local Specialty Knowledge

Contains

- Province
- Specialty
- Description
- Recommended shops

---

# Affiliate Knowledge

Contains

For each service

- Provider
- Priority
- Commission
- Availability

Example

Rail

```
Baolau

12Go
```

Hotel

```
Agoda

Booking

Traveloka
```

Tours

```
Klook

Local Partner
```

---

# Business Rules

Contains

Examples

- Prefer railway

- Prefer overnight train

- Prefer affiliate partner

- Avoid impossible schedules

- Budget limits

- Travel time limits

These rules are deterministic.

---

# Geography Knowledge

Contains

- Province
- District
- Coordinates
- Distance matrix
- Railway region

---

# Future Knowledge

Future datasets may include

- Weather

- Festivals

- Holidays

- Railway disruptions

- Visa requirements

- International railways

without changing the Planning Engine.

---

# Data Ownership

Knowledge belongs to the application.

AI never owns knowledge.

Knowledge must remain editable without changing prompts.

---

# Long-term Goal

The Knowledge Model becomes the permanent knowledge base of VNR Travel AI.

AI only transforms knowledge into natural language.

Business knowledge must remain structured, versioned, searchable, and reusable.