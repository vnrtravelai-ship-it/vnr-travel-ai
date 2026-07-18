# BACKUP_STRATEGY.md

# ==========================================================

# VNR Travel AI

# Backup & Recovery Strategy

# ==========================================================

Version

1.0

Status

ACTIVE

Last Updated

2026-07-18

---

# Purpose

This document defines the official backup and recovery strategy for the VNR Travel AI project.

Objectives:

* Prevent data loss
* Ensure fast recovery
* Protect source code
* Protect project documentation
* Protect AI prompts
* Protect planning knowledge

---

# Backup Scope

The following assets are considered critical.

## Source Code

Location

```
src/
```

Priority

★★★★★

---

## Documentation

Location

```
docs/
```

Priority

★★★★★

---

## Git Repository

Location

```
.git/
```

Priority

★★★★★

---

## Configuration

Examples

```
package.json

tsconfig.json

vite.config.ts

eslint.config.js

.env.example
```

Priority

★★★★★

---

## Prompt Library

Includes

* Gemini Prompt
* AI Rules
* Planning Rules

Priority

★★★★★

---

## Knowledge Data

Includes

Railway

Hotel

Food

Tour

Budget

Affiliate

Priority

★★★★★

---

# Backup Levels

## Level 1

Git Commit

Frequency

Every completed feature.

Example

```
git add .

git commit -m "feat: xxx"
```

---

## Level 2

GitHub Push

Frequency

Every completed Sprint.

Example

```
git push origin develop
```

---

## Level 3

Version Tag

Frequency

Every Sprint Release.

Example

```
git tag v3.9

git push origin --tags
```

---

## Level 4

ZIP Snapshot

Frequency

Weekly

Contents

Entire project except:

```
node_modules/

dist/

coverage/
```

Destination

```
backup/

YYYY-MM-DD/
```

---

## Level 5

External Backup

Frequency

Monthly

Destination

Google Drive

or

OneDrive

or

External SSD

---

# Recovery Procedure

## Source Code

Recover using Git.

```
git checkout

git reset

git revert
```

---

## Entire Project

Clone repository.

```
git clone
```

Restore

```
backup.zip
```

if required.

---

## Documentation

Recover from Git history.

```
git log

git checkout
```

---

# Branch Strategy

Main

Production Ready

Develop

Active Development

Feature Branch

Optional

```
feature/ai-optimizer

feature/openapi

feature/multicity
```

---

# Files Never Backed Up

```
node_modules/

dist/

coverage/

docs/api/

*.log
```

These files are generated automatically.

---

# Backup Checklist

Before every Sprint Release

* Git Status Clean
* Lint Pass
* Documentation Updated
* Commit Created
* GitHub Push Completed
* Tag Created

---

# Disaster Recovery

If repository is corrupted

1. Clone latest GitHub repository.
2. Restore latest ZIP snapshot.
3. Restore external backup if necessary.
4. Verify with:

```
npm install

npm run lint
```

---

# Responsibility

Project Owner

Tien Cuong Nguyen

Architecture

ChatGPT

---

# Goal

No critical project asset should ever exist in only one location.

Every important component must always be recoverable.
