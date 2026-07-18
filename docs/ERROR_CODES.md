# ERROR_CODES.md

# ==========================================================

# VNR Travel AI

# Standard Error Codes

# ==========================================================

Version

1.0

Status

ACTIVE

Last Updated

2026-07-18

---

# Purpose

This document defines the standard error code system used throughout VNR Travel AI.

Objectives

* Standardize backend exceptions
* Simplify debugging
* Improve logging
* Improve monitoring
* Ensure consistent API responses

---

# Error Format

Every error follows:

```text
MODULE-CODE
```

Example

```text
PLN-001

SCH-003

HOTEL-002
```

---

# Planning Engine (PLN)

| Code    | Description                     |
| ------- | ------------------------------- |
| PLN-001 | Invalid PlanningRequest         |
| PLN-002 | Missing destination             |
| PLN-003 | Invalid travel date             |
| PLN-004 | Invalid duration                |
| PLN-005 | Budget validation failed        |
| PLN-006 | PlanningContext creation failed |
| PLN-007 | Planning template not found     |

---

# Scheduler (SCH)

| Code    | Description                |
| ------- | -------------------------- |
| SCH-001 | Schedule conflict          |
| SCH-002 | Invalid activity order     |
| SCH-003 | Hotel check-in conflict    |
| SCH-004 | Train arrival conflict     |
| SCH-005 | Tour outside opening hours |
| SCH-006 | Route optimization failed  |
| SCH-007 | Timeline generation failed |

---

# Railway (TRAIN)

| Code      | Description                    |
| --------- | ------------------------------ |
| TRAIN-001 | Train not found                |
| TRAIN-002 | Station not found              |
| TRAIN-003 | Invalid timetable              |
| TRAIN-004 | Seat unavailable               |
| TRAIN-005 | Railway repository unavailable |

---

# Hotel

| Code      | Description                  |
| --------- | ---------------------------- |
| HOTEL-001 | Hotel not found              |
| HOTEL-002 | Hotel unavailable            |
| HOTEL-003 | Invalid check-in time        |
| HOTEL-004 | Invalid check-out time       |
| HOTEL-005 | Hotel repository unavailable |

---

# Food

| Code     | Description          |
| -------- | -------------------- |
| FOOD-001 | Restaurant not found |
| FOOD-002 | Meal unavailable     |
| FOOD-003 | Invalid meal time    |
| FOOD-004 | Restaurant closed    |

---

# Tour

| Code     | Description          |
| -------- | -------------------- |
| TOUR-001 | Tour not found       |
| TOUR-002 | Tour unavailable     |
| TOUR-003 | Attraction closed    |
| TOUR-004 | Invalid booking time |

---

# Budget

| Code    | Description               |
| ------- | ------------------------- |
| BUD-001 | Budget calculation failed |
| BUD-002 | Budget exceeded           |
| BUD-003 | Currency unsupported      |
| BUD-004 | Cost estimation failed    |

---

# Affiliate

| Code    | Description                      |
| ------- | -------------------------------- |
| AFF-001 | Affiliate provider unavailable   |
| AFF-002 | Affiliate link generation failed |
| AFF-003 | Invalid affiliate product        |
| AFF-004 | Commission calculation failed    |

---

# AI

| Code   | Description              |
| ------ | ------------------------ |
| AI-001 | AI provider unavailable  |
| AI-002 | Prompt generation failed |
| AI-003 | Invalid AI response      |
| AI-004 | JSON parsing failed      |
| AI-005 | AI timeout               |
| AI-006 | Unsupported model        |

---

# Repository

| Code    | Description                      |
| ------- | -------------------------------- |
| REP-001 | Repository unavailable           |
| REP-002 | Data not found                   |
| REP-003 | Invalid repository configuration |

---

# Cache

| Code      | Description                |
| --------- | -------------------------- |
| CACHE-001 | Cache miss                 |
| CACHE-002 | Cache corrupted            |
| CACHE-003 | Cache serialization failed |

---

# System

| Code    | Description                 |
| ------- | --------------------------- |
| SYS-001 | Internal server error       |
| SYS-002 | Configuration missing       |
| SYS-003 | Unknown exception           |
| SYS-004 | Validation failed           |
| SYS-005 | Dependency injection failed |

---

# Logging Standard

Every error should log:

* Timestamp
* Error Code
* Module
* Message
* Stack Trace
* Request ID (if available)

Example

```text
2026-07-18T09:35:12Z

SCH-003

Hotel Check-in Conflict

Train arrives after hotel check-in closes.

Request ID: 4c8e12a9
```

---

# API Response Format

```json
{
  "success": false,
  "error": {
    "code": "SCH-003",
    "message": "Hotel check-in conflict"
  }
}
```

---

# Rules

1. Every new module must define its own error codes.
2. Error codes are immutable once released.
3. Never reuse an existing code for another meaning.
4. All backend exceptions must map to a documented error code.
5. Update this document whenever new codes are introduced.

---

# Status

Current modules covered

* Planning
* Scheduler
* Railway
* Hotel
* Food
* Tour
* Budget
* Affiliate
* AI
* Repository
* Cache
* System

This document is the official error code registry for VNR Travel AI.
