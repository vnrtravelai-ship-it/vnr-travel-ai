# AI_RULES.md

# VNR Travel AI

Version: Foundation v1.0

Last Updated: 2026-07-06

---

# Purpose

This document defines the mandatory rules for AI assistants and developers working on the VNR Travel AI project.

Its objective is to ensure:

- Stable development
- Predictable changes
- High maintainability
- Commercial deployment readiness

---

# Scope

These rules apply to:

- ChatGPT
- Gemini
- Human developers
- Any automated development tools

---

# Project Principles

The following principles are mandatory:

1. Production stability takes priority over new features.

2. Changes must be incremental.

3. Do not modify unrelated code.

4. Every change must be traceable.

5. Documentation is part of the source code.

---

# Development Workflow

Before modifying source code:

1. Review PROJECT_STATE.md
2. Review ARCHITECTURE.md
3. Review DEVELOPMENT_WORKFLOW.md
4. Understand the requested change.
5. Identify affected files.
6. Evaluate potential impact.
7. Implement the minimum required change.
8. Verify build and tests.
9. Update documentation if necessary.

---

# Architecture Constraints

The current architecture is defined in:

ARCHITECTURE.md

Development must follow that architecture.

Any architectural change requires:

- Impact analysis
- Documentation update
- Explicit approval

---

# Code Change Rules

When modifying code:

- Change only files directly related to the requested task.
- Preserve backward compatibility whenever possible.
- Avoid unnecessary refactoring.
- Do not introduce new dependencies unless justified.
- Keep functions and modules focused on a single responsibility.

---

# Build Requirements

Before a change is considered complete:

- TypeScript must pass.
- Build must succeed.
- No new errors.
- No new critical warnings.
- Application remains functional.

---

# Documentation Rules

Whenever project structure or workflow changes:

Update the corresponding documentation.

At minimum, review:

- PROJECT_STATE.md
- ARCHITECTURE.md
- CHANGELOG.md

---

# Decision Rules

When multiple implementation options exist:

1. Prefer the simplest solution.
2. Prefer maintainability over cleverness.
3. Prefer explicit code over implicit behavior.
4. Avoid speculative optimization.

---

# Revision History

| Version | Date | Description |
|---------|------|-------------|
| Foundation v1.0 | 2026-07-06 | Initial production rule set |