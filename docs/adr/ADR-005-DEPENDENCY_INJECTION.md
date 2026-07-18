# ADR-005

# Dependency Injection Architecture

---

Status

Accepted

---

Date

2026-07-18

---

Version

1.0

---

# Context

As VNR Travel AI expanded, the number of services, repositories and planners increased significantly.

Current backend modules include:

* Planning Engine
* Knowledge Repository
* Railway
* Hotel
* Food
* Tour
* Scheduler
* Budget
* Affiliate
* AI Provider

If every class instantiated its own dependencies using `new`, the project would quickly become tightly coupled and difficult to maintain.

Problems observed in early prototypes included:

* duplicated object creation
* circular dependencies
* inconsistent service lifecycles
* difficult unit testing
* difficult mocking
* hidden dependencies

A centralized dependency management mechanism became necessary.

---

# Decision

The project adopts a centralized **Dependency Injection (DI)** architecture.

All shared services and repositories are created by a single container.

The backend must use:

```text
ApplicationContainer
```

as the root dependency provider.

---

# Architecture

```text
ApplicationContainer

│

├── CacheManager

├── TemplateRepository

├── KnowledgeRepository

│      ├── RailwayService

│      ├── HotelService

│      ├── FoodService

│      ├── TourService

│      ├── SchedulerService

│      ├── ItineraryService

│      ├── BudgetService

│      └── AffiliateService

│

├── AI Provider

│

└── Future Services
```

---

# Dependency Flow

Dependencies always flow downward.

```text
ApplicationContainer

↓

PlanningEngine

↓

KnowledgeRepository

↓

Business Services

↓

Repositories
```

No module may resolve dependencies upward.

---

# Responsibilities

ApplicationContainer is responsible for:

* object creation
* singleton lifecycle
* dependency wiring
* service registration
* repository registration

ApplicationContainer is NOT responsible for:

* business logic
* planning
* scheduling
* AI generation

---

# Lifecycle

All core services are Singleton.

Examples

```text
PlanningEngine

KnowledgeRepository

CacheManager

TemplateRepository

AffiliateRepository
```

Objects that represent user requests are Transient.

Examples

```text
PlanningRequest

PlanningContext

ScheduleSlot

DayPlan
```

---

# Injection Rules

Classes must receive dependencies through constructors whenever possible.

Example

```typescript
class RailwayService {

    constructor(

        private repository: RailwayRepository

    ) {}

}
```

Avoid:

```typescript
const repository = new RailwayRepository();
```

inside business services.

---

# Testing Benefits

Dependency Injection enables:

* repository mocking
* service mocking
* isolated unit testing
* deterministic tests
* easier integration testing

---

# Future Expansion

ApplicationContainer will later register:

* WeatherService
* PricingService
* EventService
* AIOptimizerService
* ReflectionService
* RecommendationRankingService
* NotificationService
* UserPreferenceService

PlanningEngine will not require modification to use these services.

---

# Alternatives Considered

## Option 1

Manual object creation in every module.

Rejected.

Reason:

High coupling.

---

## Option 2

Global static objects.

Rejected.

Reason:

Poor testability.

---

## Option 3

Central Dependency Injection Container.

Accepted.

Reason:

Scalable.

Maintainable.

Testable.

---

# Constraints

ApplicationContainer must remain lightweight.

It must never contain business logic.

Its only purpose is dependency composition.

---

# Impact

Affected modules

* ApplicationContainer
* PlanningEngine
* KnowledgeRepository
* SchedulerEngine
* BudgetService
* AffiliateService
* AI Provider

Future modules must register through the container.

---

# Related Documents

* ADR-001-PLANNING_ENGINE_ARCHITECTURE.md
* ADR-002-KNOWLEDGE_REPOSITORY_ARCHITECTURE.md
* ADR-003-SCHEDULER_ENGINE_ARCHITECTURE.md
* ADR-004-AI_PROVIDER_ARCHITECTURE.md
* ARCHITECTURE.md

---

# Decision

ApplicationContainer is the single composition root of the backend.

No business module may instantiate shared services or repositories directly.

All shared dependencies must be resolved through the Dependency Injection architecture.
