# VNR Travel AI - Security Specifications & Threat Vector Analysis

This specification document outlines the rigorous mathematical and logical data invariants, security test payloads, and test suite definitions designed to harden VNR Travel AI's enterprise-grade multi-tenant database infrastructure on Google Firestore.

---

## 1. Core Data Invariants & Zero-Trust Assertions

1. **Strict Key Completeness (Anti-Update-Gap)**: 
   - Every document write operation (excluding specified patch updates) must match the exact schema structure. No orphaned or "shadow fields" may be injected by the client application.
2. **Personal Identifiable Information (PII) Isolation**:
   - Private contact fields (`email`, `phoneNumber`, `marketingConsent`) are strictly isolated inside the split sub-collection `users/{userId}/private/info`. 
   - Blanket access to the private sub-collection is protected; read access is only allowed for the matching authenticated owner (`request.auth.uid == userId`) or an explicit, verified Cloud-certified Admin. There are zero public directory reads.
3. **Identity Spoofing Blockage**:
   - Users can only write profile entries matching their actual authentication state: `request.auth.uid == userId` and `request.auth.token.email_verified == true`. Direct modification of roles is blocked.
4. **Relational Sync Integrity**:
   - Saved `itineraries/{itineraryId}` references a `creatorId` that must match the authenticated author's UID.
   - Any community board entry under `/posts/{postId}` cannot bypass standard validation checks, and deleting or modifying existing posts requires verified ownership.
5. **Denial-of-Wallet (DoW) Rate Guard**:
   - Standard path variables are constrained (under 128 characters) utilizing regex restrictions (`isValidId()`) to prevent resource exhaustion and billing depletion via automated load generators.

---

## 2. The "Dirty Dozen" Threat Payloads (Test Vector Matrices)

These 12 test payloads represent malicious writes crafted to explore vulnerabilities, ensure proper rejection, and protect client-server boundaries within VNR Travel AI.

### Vector 1: Identity Spoofing - Impersonating User Profiles
*   **Target Path**: `/users/fake-user-123`
*   **Payload**:
    ```json
    {
      "userId": "legit-user-456",
      "fullName": "Imposter Admin",
      "role": "admin",
      "createdAt": "2026-06-16T08:00:00Z",
      "updatedAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - The authenticated UID must match the resource path and internal `userId`.

### Vector 2: Privilege Escalation - Self-Assigning Admin Role
*   **Target Path**: `/users/legit-user-456`
*   **Payload**:
    ```json
    {
      "userId": "legit-user-456",
      "fullName": "Gamer Kid",
      "role": "admin",
      "createdAt": "2026-06-16T08:00:00Z",
      "updatedAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - Modifying roles to "admin" or mutating role states without master validation is denied.

### Vector 3: Resource Poisoning - Gigantic Junk-Character Document ID
*   **Target Path**: `/users/VeryLongJunkIdStringRepeatedOverAndOverToBlowUpIndexingBudgetsAndDepleteDiskCapacity`
*   **Payload**:
    ```json
    {
      "userId": "victim-user",
      "fullName": "Alice",
      "role": "member",
      "createdAt": "2026-06-16T08:00:00Z",
      "updatedAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - Length checking and regex checks fail.

### Vector 4: PII Siphoning - Unauthorized Read of Private Sub-collection
*   **Authenticated User**: `guest-attacker-999`
*   **Target Path**: `/users/legit-user-456/private/info`
*   **Action**: `read`
*   **Expectation**: `PERMISSION_DENIED` - Non-owners cannot read PII sub-documents.

### Vector 5: Temporal Fraud - Forging Creation Dates
*   **Target Path**: `/users/legit-user-111`
*   **Payload**:
    ```json
    {
      "userId": "legit-user-111",
      "fullName": "John Doe",
      "role": "member",
      "createdAt": "1999-01-01T00:00:00Z", 
      "updatedAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - `createdAt` must match server-asserted `request.time`.

### Vector 6: Saved Itinerary Plagiarism - Forging AI Creator ID
*   **Authenticated User**: `pirate-user-777`
*   **Target Path**: `/itineraries/new-itinerary-1`
*   **Payload**:
    ```json
    {
      "itineraryId": "new-itinerary-1",
      "title": "Hành Trình Di Sản Miền Trung",
      "summary": "AI Planned trip",
      "departure": "Hà Nội",
      "arrival": "Đà Nẵng",
      "daysCount": 3,
      "totalEstimatedCostVnd": 3500000,
      "creatorId": "innocent-target-user-222", 
      "createdAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - Creator ID in payload must match `request.auth.uid`.

### Vector 7: Mass-Scrape - Reading entire lists of Affiliate Clicks
*   **Authenticated User**: `bad-bot-888`
*   **Target Path**: `/affiliate_clicks`
*   **Action**: `list` without filters matching the applicant's UID.
*   **Expectation**: `PERMISSION_DENIED` - Blanket index scrapes are forbid.

### Vector 8: Orphaned Posts - Publishing community records as someone else
*   **Authenticated User**: `troll-user-333`
*   **Target Path**: `/posts/fake-post-1`
*   **Payload**:
    ```json
    {
      "postId": "fake-post-1",
      "authorId": "super-star-koc-999", 
      "authorName": "Chung Sỹ",
      "title": "My Dream Train Review",
      "content": "Terrible train, do not go...",
      "likesCount": 0,
      "commentsCount": 0,
      "createdAt": "2026-06-16T08:00:00Z",
      "updatedAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - Handled creator mismatch checks.

### Vector 9: Value Poisoning - Injecting non-integer values into Numeric Counters
*   **Target Path**: `/posts/valid-post-123`
*   **Payload (Update)**:
    ```json
    {
      "postId": "valid-post-123",
      "authorId": "legit-user-555",
      "authorName": "Reviewer",
      "title": "Valid Post Title",
      "content": "Clean review content.",
      "likesCount": "One Million Likes", 
      "commentsCount": 0,
      "createdAt": "2026-06-16T08:00:00Z",
      "updatedAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - String value instead of integer triggers schema failure.

### Vector 10: State Bypass - Elevating Likes Count Directly
*   **Target Path**: `/posts/valid-post-123`
*   **Payload (Direct Update of LikesCount to skyrocket ranking)**:
    - Attempting an atomic field modification on `likesCount` while bypassing the designated Like validation rules.
*   **Expectation**: `PERMISSION_DENIED` - Mutating metadata counters outside atomic, approved transaction forms.

### Vector 11: Affiliate Link Fraud - Tampering with clicked Affiliate IDs
*   **Target Path**: `/affiliate_clicks/click-777`
*   **Payload**:
    ```json
    {
      "clickId": "click-777",
      "userId": "buyer-1",
      "provider": "baolau",
      "targetUrl": "https://www.baolau.com/...",
      "affiliateIdUsed": "hacked-partner-code", 
      "createdAt": "2026-06-16T08:00:00Z"
    }
    ```
*   **Expectation**: `PERMISSION_DENIED` - Modifying records or injecting unvalidated partner commission ID strings.

### Vector 12: Unverified Auth Spoof - Writing items with spoofed Email-Not-Verified state
*   **Target Path**: `/users/unverified-auth-user`
*   **Auth Token State**: `{ "uid": "unverified-auth-user", "email": "scam@email.com", "email_verified": false }`
*   **Expectation**: `PERMISSION_DENIED` - Must require `request.auth.token.email_verified == true`.

---

## 3. The Firebase Test Runner Blueprint (TDD Spec)

Below is the complete testing suite designed to execute the threat vector analysis, ensuring zero logic leaks and securing VNR Travel AI completely.

```typescript
// firestore.rules.test.ts
import { 
  initializeTestEnvironment, 
  RulesTestEnvironment, 
  assertFails, 
  assertSucceeds 
} from "@firebase/rules-unit-testing";
import { readFileSync } from "fs";

let testEnv: RulesTestEnvironment;

describe("VNR Travel AI - Hardened Security Rules Test Suite", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "vnr-travel-ai-prod",
      firestore: {
        rules: readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      }
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  test("Vector 1 fails - Guest cannot spoof userId or write to foreign profile", async () => {
    const context = testEnv.authenticatedContext("imposter-uid", { email_verified: true });
    const db = context.firestore();
    const docRef = db.collection("users").doc("victim-uid");
    
    await assertFails(
      docRef.set({
        userId: "victim-uid",
        fullName: "Fake User",
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
  });

  test("Vector 4 fails - Attacker cannot view foreign isolated PII sub-collection", async () => {
    const context = testEnv.authenticatedContext("attacker-uid", { email_verified: true });
    const db = context.firestore();
    const docRef = db.collection("users").doc("victim-uid").collection("private").doc("info");
    
    await assertFails(docRef.get());
  });
});
```
