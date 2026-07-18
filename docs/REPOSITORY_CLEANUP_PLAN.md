# REPOSITORY CLEANUP PLAN

# VNR Travel AI

---

Version

1.0

Status

Planning

Last Updated

2026-07-18

---

# Purpose

This document defines the repository cleanup strategy before entering Sprint 3.9.

The objective is to reduce technical debt, eliminate duplicated documentation, improve maintainability, and keep the repository clean without risking data loss.

No file shall be permanently removed before being reviewed.

---

# Cleanup Principles

1. Never delete source code without verification.
2. Never delete architecture documents.
3. Never delete ADR.
4. Never delete Sprint reports.
5. Generated files may be regenerated and therefore do not require version history.
6. Obsolete documents should be archived before deletion.

---

# Repository Classification

## A. Core Documents (KEEP)

These documents define the project.

Examples

* PROJECT_MANIFEST.md
* PROJECT_STATE.md
* CHANGELOG.md
* ROADMAP_2026.md
* ARCHITECTURE.md
* PLANNER_PIPELINE.md

Status

Protected

---

## B. Architecture Documents (KEEP)

Folder

```text
docs/architecture/
```

Status

Protected

---

## C. Planning Documents (KEEP)

Folder

```text
docs/planning/
```

Status

Protected

---

## D. ADR (KEEP)

Folder

```text
docs/adr/
```

Status

Protected

---

## E. Sprint Reports (KEEP)

Folder

```text
docs/sprints/
```

Status

Protected

---

## F. Governance Documents (KEEP)

Examples

* BACKUP_STRATEGY.md
* ERROR_CODES.md
* DOCUMENT_INDEX.md
* DOCUMENT_CLASSIFICATION.md
* DOCS_STRUCTURE.md

Status

Protected

---

## G. Audit Documents (REVIEW)

Folder

```text
docs/audit/
```

Review Required

* MASTER_AUDIT.md
* ARCHITECTURE_AUDIT.md
* SECURITY_AUDIT.md
* project_tree.txt

Possible action

Archive after major releases.

---

## H. Refactor Documents (REVIEW)

Folder

```text
docs/refactor/
```

Possible action

Archive after Phase 2 is complete.

---

## I. Templates (KEEP)

Folder

```text
docs/templates/
```

Status

Keep

---

## J. API Documentation (GENERATED)

Folder

```text
docs/api/
```

Status

Generated

Can be regenerated.

Should not be manually edited.

May be excluded from release packages.

---

# Source Code Cleanup

Review

* unused classes
* dead interfaces
* duplicated models
* duplicated DTOs
* commented code
* obsolete TODOs

No deletion without dependency verification.

---

# Documentation Cleanup

Review

* duplicated explanations
* duplicated diagrams
* inconsistent terminology
* outdated screenshots
* obsolete examples

---

# Git Cleanup

Review

* obsolete tags
* stale branches
* merged feature branches

Do not delete release tags.

---

# Release Package Exclusions

The following should NOT be included in production deployment packages:

```text
docs/

.github/

templates/

audit/

refactor/

ADR/

Sprint Reports
```

Only runtime code should be deployed.

---

# Expected Benefits

* Smaller repository
* Easier navigation
* Reduced maintenance
* Lower documentation duplication
* Cleaner production package
* Better onboarding experience

---

# Exit Criteria

Repository Cleanup is complete when:

* No duplicated documentation
* No obsolete architecture files
* No unused source modules
* Generated files clearly identified
* Archive strategy defined

---

# Next Phase

Sprint 3.9

AI Optimizer
