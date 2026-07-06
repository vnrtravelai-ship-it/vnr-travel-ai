# AFFILIATE.md

# VNR Travel AI

Version: Foundation v1.0

Last Updated: 2026-07-06

---

# Purpose

This document defines the affiliate integration strategy of VNR Travel AI.

It serves as the single reference for all current and future affiliate integrations.

---

# Objectives

Affiliate integrations must:

- Generate commercial revenue.
- Provide reliable booking services.
- Be easy to maintain.
- Support future expansion.

---

# Current Status

Affiliate module is under foundation development.

No production affiliate integration has been released yet.

---

# Planned Integration Order

Priority 1

- Traveloka

Priority 2

- Trip.com

Future integrations will be evaluated after production launch.

---

# Integration Principles

Each affiliate provider must:

- Have an independent adapter.
- Be isolated from business logic.
- Be replaceable without affecting other modules.

---

# Backend Responsibility

Affiliate communication must occur only through Backend APIs.

Frontend must never communicate directly with affiliate providers.

---

# Security Requirements

Affiliate credentials must:

- Never be stored in source code.
- Never be committed to Git.
- Be managed through environment variables.

---

# Error Handling

Affiliate failures must not interrupt the application.

The system should:

- Log the error.
- Return a safe response.
- Continue serving the user whenever possible.

---

# Future Expansion

Potential future categories include:

- Hotels
- Flights
- Tours
- Car Rental
- Insurance
- Attractions

These categories will be implemented only after architecture review and approval.

---

# Documentation Rules

Whenever an affiliate provider is added, removed or changed:

Update:

- AFFILIATE.md
- CHANGELOG.md
- PROJECT_STATE.md

---

# Revision History

| Version | Date | Description |
|---------|------|-------------|
| Foundation v1.0 | 2026-07-06 | Initial affiliate strategy |