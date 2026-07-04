# DEVELOPMENT WORKFLOW

## Mandatory workflow before any code modification

Every AI assistant MUST follow this order.

1. Read PROJECT_MANUAL.md
2. Read PROJECT_STATE.md
3. Read CHANGELOG.md
4. Read ARCHITECTURE.md
5. Read CODE_MAP.md
6. Read AI_RULES.md
7. Read AFFILIATE.md
8. Read API_REFERENCE.md
9. Read DEPLOYMENT.md
10. Read GEMINI_SYSTEM_PROMPT.md

Only after reading ALL documents may code modifications begin.

---

## Before modifying code

AI must provide:

- Files that will be modified
- Reason
- Risk assessment
- Impact analysis

User approval is mandatory.

---

## After coding

AI must:

1. Run TypeScript check

npm run lint

2. Generate documentation

npm run docs

3. Update CHANGELOG.md

4. Update PROJECT_STATE.md

5. Commit only after user approval.

---

## Never

- Refactor entire project
- Rename folders
- Change architecture
- Modify Firebase configuration
- Modify Railway deployment
- Change Affiliate logic
- Change API contract