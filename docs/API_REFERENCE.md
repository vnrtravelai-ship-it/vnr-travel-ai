# API_REFERENCE.md

# VNR Travel AI

API Reference

Last Updated: 2026-07-04

---

# Backend

Hosting

Railway

Base URL

https://vnr-travel-ai-production.up.railway.app

---

# Frontend

Hosting

Firebase Hosting

All frontend API calls must use

VITE_API_URL

Never hardcode Railway URL.

---

# Main Endpoint

POST

/api/itinerary

Purpose

Generate AI travel itinerary.

Backend

Gemini

Status

ACTIVE

---

# Request

Content-Type

application/json

Example

{
  "departure": "Đà Nẵng",
  "arrival": "Huế",
  "daysCount": 2,
  "budgetLevel": "Tiêu chuẩn",
  "travelStyle": "Khám phá di sản"
}

---

# Response

Content-Type

application/json

Response contains

- title
- summary
- itinerary
- hotels
- restaurants
- attractions
- estimatedCost

Never change response structure.

---

# AI

Provider

Google Gemini

Current Model

gemini-2.5-flash

Backend only.

Frontend must never call Gemini directly.

---

# Timeout

Current target

30 seconds

Maximum acceptable

60 seconds

If timeout occurs

Retry using existing retry logic.

---

# Authentication

Firebase Authentication

Guest Mode

Supported

Logged-in Mode

Supported

---

# Firestore

Database

Firebase Firestore

Collections

users

itineraries

affiliateClicks

posts

comments

likes

adminLogs

auditLogs

crashes

observability_logs

Never rename collections.

---

# Affiliate Tracking

Function

trackAffiliateClick()

Parameters

Platform

Destination URL

Source

Status

ACTIVE

---

# Analytics

Google Analytics

Current Events

page_view

generate_itinerary

affiliate_click

login

logout

Never rename event names.

---

# Environment Variables

Frontend

VITE_API_URL

Backend

GEMINI_API_KEY

Never rename environment variables.

Never expose API keys to frontend.

---

# Error Handling

API should return

200

400

401

403

404

429

500

503

Never return raw stack traces.

---

# Development Rules

Do not create duplicate endpoints.

Do not rename endpoints.

Do not change JSON format.

Maintain backward compatibility.

---

End of File