# DEPLOYMENT.md

# VNR Travel AI

Deployment Guide

Last Updated: 2026-07-04

---

# PROJECT REPOSITORY

GitHub

https://github.com/vnrtravelai-ship-it/vnr-travel-ai

---

# Branch Strategy

baseline-v1.0

Golden Backup

Never modify.

---

main

Production Stable

Only merge tested code.

---

develop

Development Branch

All new features are developed here.

---

Feature Branch

Example

feature-affiliate

feature-admin

feature-ai

feature-booking

Every feature starts from develop.

---

# Production

Frontend

Firebase Hosting

Status

ACTIVE

---

Backend

Railway

Status

ACTIVE

---

Database

Firebase Firestore

Status

ACTIVE

---

Authentication

Firebase Authentication

Status

ACTIVE

---

Analytics

Google Analytics

Status

ACTIVE

---

AI

Google Gemini

Current Model

gemini-2.5-flash

Status

ACTIVE

---

# Build

Command

```

npm run build

```

Current Status

PASS

---

# Local Development

Install

```

npm install

```

Run

```

npm run dev

```

Build

```

npm run build

```

---

# Git Workflow

Daily Development

```

git checkout develop

git pull

git checkout -b feature-name

```

After finishing

```

git add .

git commit -m "Feature"

git push

```

After testing

Merge into

develop

After regression testing

Merge into

main

Never commit directly to main.

Never modify baseline-v1.0.

---

# Railway Deployment

Deploy Source

GitHub

Branch

main

Backend Port

3000

Environment Variables

GEMINI_API_KEY

NODE_ENV

PORT

Never expose API Keys.

---

# Firebase Deployment

Hosting

ACTIVE

Firestore

ACTIVE

Authentication

ACTIVE

Analytics

ACTIVE

---

# Production Checklist

Before every deployment

✓ npm install

✓ npm run build

✓ No TypeScript Errors

✓ No ESLint Errors

✓ Planner Works

✓ AI Works

✓ Booking Works

✓ Affiliate Works

✓ Admin Works

✓ Railway Healthy

✓ Firebase Healthy

---

# Rollback

If Production fails

1.

Rollback to previous Railway Deployment.

2.

Rollback Git to main.

3.

If necessary

Restore baseline-v1.0.

---

# Golden Backup

baseline-v1.0

Never modify.

Never delete.

Always available for emergency recovery.

---

# Development Policy

Every new feature must:

Start from develop.

Be tested locally.

Be tested on Railway.

Only then merge into main.

---

# AI Development Rule

Before modifying code, AI must read:

PROJECT_STATE.md

ARCHITECTURE.md

CHANGELOG.md

AI_RULES.md

AFFILIATE.md

API_REFERENCE.md

DEPLOYMENT.md

Only then generate code.

---

End of File