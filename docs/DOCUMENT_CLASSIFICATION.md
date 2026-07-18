# DOCUMENT_CLASSIFICATION.md

# ==========================================================

# VNR Travel AI

# Documentation Classification

# ==========================================================

Version

1.0

Status

ACTIVE

Last Updated

2026-07-18

---

# Purpose

This document classifies every project document according to its lifecycle and maintenance policy.

Its objectives are:

* Prevent duplicate documentation
* Prevent accidental deletion
* Separate permanent knowledge from historical records
* Keep the repository clean
* Reduce maintenance cost

This document is the authoritative source for documentation cleanup.

---

# Classification Categories

## KEEP

Documents that define the project.

These documents must always exist and be maintained.

Deletion is prohibited.

---

## ARCHIVE

Historical documents.

No longer maintained.

Kept only for reference.

Can be moved into:

docs/archive/

---

## AUTO GENERATED

Generated automatically by tools.

Never edited manually.

Can always be regenerated.

Should not normally be committed to Git.

---

## DELETE

Obsolete documents.

Duplicate documents.

Unused documents.

Can be permanently removed after verification.

---

# KEEP

## Core Project Documents

| Document            | Status |
| ------------------- | ------ |
| PROJECT_MANIFEST.md | KEEP   |
| PROJECT_STATE.md    | KEEP   |
| CHANGELOG.md        | KEEP   |
| ROADMAP_2026.md     | KEEP   |
| ARCHITECTURE.md     | KEEP   |

---

## Planning

| Document                            | Status |
| ----------------------------------- | ------ |
| planning/PLANNER_PIPELINE.md        | KEEP   |
| planning/PLANNING_ENGINE.md         | KEEP   |
| planning/PLANNING_ARCHITECTURE.md   | KEEP   |
| planning/KNOWLEDGE_MODEL.md         | KEEP   |
| planning/RAILWAY_KNOWLEDGE_MODEL.md | KEEP   |
| planning/models/PLANNING_MODELS.md  | KEEP   |
| planning/models/PLANNING_CONTEXT.md | KEEP   |

---

## Architecture

| Document                          | Status |
| --------------------------------- | ------ |
| architecture/BACKEND_STRUCTURE.md | KEEP   |
| architecture/CODING_RULES.md      | KEEP   |
| architecture/DEPENDENCY_RULES.md  | KEEP   |

---

## Development

| Document                | Status |
| ----------------------- | ------ |
| DEVELOPMENT_WORKFLOW.md | KEEP   |
| API_REFERENCE.md        | KEEP   |
| DEPLOYMENT.md           | KEEP   |
| GEMINI_SYSTEM_PROMPT.md | KEEP   |
| AI_RULES.md             | KEEP   |
| AFFILIATE.md            | KEEP   |
| CODE_MAP.md             | KEEP   |
| PROJECT_MANUAL.md       | KEEP   |

---

# ARCHIVE

The following folders contain historical information.

They should remain available but should not clutter the main documentation.

| Folder     | Status  |
| ---------- | ------- |
| audit/     | ARCHIVE |
| refactor/  | ARCHIVE |
| templates/ | ARCHIVE |

Future structure:

```text
docs/

archive/

audit/

refactor/

templates/

2026/
```

---

# AUTO GENERATED

The following documentation is generated automatically.

Manual edits are prohibited.

| Folder    | Tool    |
| --------- | ------- |
| docs/api/ | TypeDoc |

Policy

* regenerate when needed
* do not manually edit
* should normally be excluded from Git

Recommended

```text
.gitignore

docs/api/
```

---

# DELETE

Current status

No documents have been approved for deletion.

Every candidate must first satisfy:

* duplicated
* obsolete
* replaced
* archived

Deletion requires updating:

* DOCUMENT_INDEX.md
* PROJECT_STATE.md
* CHANGELOG.md

---

# Future Documents

The following documents will become permanent project documents.

## Governance

| Document           | Status  |
| ------------------ | ------- |
| BACKUP_STRATEGY.md | PLANNED |
| ERROR_CODES.md     | PLANNED |

---

## Architecture Decision Records

| Document   | Status  |
| ---------- | ------- |
| ADR-001.md | PLANNED |
| ADR-002.md | PLANNED |
| ADR-003.md | PLANNED |
| ADR-004.md | PLANNED |
| ADR-005.md | PLANNED |

---

## Sprint Documents

| Document        | Status  |
| --------------- | ------- |
| SPRINT-3.8.md   | PLANNED |
| SPRINT-3.8.5.md | PLANNED |
| SPRINT-3.8.6.md | PLANNED |

---

# Documentation Lifecycle

New Document

↓

Register in DOCUMENT_INDEX.md

↓

Assign Classification

↓

Use

↓

Update

↓

Archive

↓

Delete (if approved)

---

# Rules

## Rule 1

Every new document must appear in DOCUMENT_INDEX.md.

---

## Rule 2

Every document must have exactly one classification.

KEEP

ARCHIVE

AUTO GENERATED

DELETE

---

## Rule 3

Only KEEP documents require continuous maintenance.

---

## Rule 4

AUTO GENERATED documents are never edited manually.

---

## Rule 5

Historical information must be archived instead of deleted whenever possible.

---

## Rule 6

Every documentation cleanup sprint must update:

* DOCUMENT_INDEX.md
* DOCUMENT_CLASSIFICATION.md
* PROJECT_STATE.md
* CHANGELOG.md

---

# Current Summary

KEEP

23 documents

ARCHIVE

3 folders

AUTO GENERATED

docs/api/

DELETE

None

Project documentation status

Stable

Ready for Repository Cleanup Sprint.
