# VNR Travel AI - User Acceptance Testing (UAT) Checklist

This document details the complete step-by-step User Acceptance Testing (UAT) manual for validating production workflows of the **VNR Travel AI** platform. It provides testing practitioners with explicit conditions, test inputs, execution steps, and verification benchmarks.

---

## 🛠️ Global Pre-requisites & Environment Alignment
1. **Target URLs**:
   - Production / Staging: `https://vnrtravelai.web.app` (or active development URL)
2. **Tools required**:
   - Chrome Developer Tools (F12) for Console, Network, and Application (Service Workers, Cache storage) Inspection.
   - Google Firebase Console accessible with administrative access to view Firestore documents under `users`, `itineraries`, `posts`, `comments`, `likes`, and `affiliateClicks`.

---

## 📋 Core Test Scenarios

### 1. Google Single Sign-On (SSO) Flow
Verify that travellers can authenticate securely using their Google accounts, and their corresponding profile and private info docs are initialized.

* **Pre-conditions**: No active logged-in user session.
* **Test Steps**:
  1. Navigate to the **Profile** tab in the active application interface.
  2. Locate the "Sign in with Google" button and click it.
  3. Enter valid Google credentials in the Google Auth popup selector window and submit.
* **Expected Result**:
  - The authentication popup prompts success.
  - The application UI redirects back to the main Profile screen showing the traveller's Google nickname and avatar picture.
  - **Database Verification**:
    - Check Firebase Auth: A new user record matching the correct Google UID is initialized.
    - Check Firestore collection `/users/{uid}`: A public profile document is created with:
      - `userId`: matcher for the UID
      - `displayName`: Google Account Name
      - `email`: Google Account Email
      - `role`: `'user'`
      - `premium`: `false`
      - `createdAt`: accurate server time
    - Check Firestore sub-collection `/users/{uid}/private/info`: A default secure document is generated containing `updatedAt`.

---

### 2. Email & Password Authentication Flow
Validate that users can register, verify, sign in, and reset password credentials cleanly without exposing private structures.

* **Pre-conditions**: Guest context. Clean unused email address (e.g., `tester_se19@gmail.com`).
* **Test Steps**:
  - **Register Sub-Case**:
    1. In the **Profile** view, navigate to "Sign Up" mode.
    2. Input name: `"Nguyen Van SRE"`, email: `"tester_se19@gmail.com"`, and password: `"SafeSecurePassword99!"`. Click Register.
  - **Email Verification Sub-Case**:
    1. Click the "Send Email Verification" button if shown.
    2. Confirm toast alert reports successful transmission.
  - **Sign Out & Log In Sub-Case**:
    1. Click "Sign Out".
    2. Navigate back to "Sign In" mode.
    3. Input `"tester_se19@gmail.com"` and `"SafeSecurePassword99!"`, click Log In.
* **Expected Result**:
  - User logs in successfully and UI switches to show active account dashboard.
  - All errors (e.g. invalid password, duplicate email) trigger legible front-facing toasts.
  - **Verification**: Check Firestore `/users/{uid}` fields.

---

### 3. Save, Edit & Delete AI Travel Itinerary
Check the core AI-planner logic's ability to save, edit, and subsequently delete customized railway logs.

* **Pre-conditions**: User is signed in.
* **Test Steps**:
  - **Generation & Saving**:
    1. Navigate to **AI Planner** tab.
    2. Set Departure as `"Hà Nội"`, Destination as `"Đà Nẵng"`, Days as `3`, Budget as `"Tiêu chuẩn"`, and Heritage Focus. Click "Lập kế hoạch".
    3. Once the AI generates the schedule, scroll down and click **"Lưu hành trình" (Save itinerary)**.
  - **Editing**:
    1. Navigate to the **My Trips** / **Hành Trình Của Tôi** tab.
    2. Click "Sửa" or "Chỉnh sửa" on the saved trip.
    3. Change the Trip Title descriptor to `"Hành Trình Di Sản Miền Trung SE"` and click update.
  - **Deleting**:
    1. In the **My Trips** tab list, click the **Trash Icon / Delete** button.
* **Expected Result**:
  - **Saving**: Trip is stored. Check Firestore collection `itineraries`: the doc fields match.
  - **Editing**: Title changes in both frontend view and Firestore immediately.
  - **Deleting**: Itinerary is permanently deleted from Firestore and vanishes from the client.

---

### 4. Create Post in Railways Community Forum
Validate the full forum publishing capability of travelling users.

* **Pre-conditions**: User is logged in.
* **Test Steps**:
  1. Navigate to the **Cộng Đồng (Community)** tab.
  2. Scroll to the "Đăng Bài Viết Mới" (Post New Thread) panel.
  3. Input Title: `"Hành trình trải nghiệm tàu HD1 nối liền di sản Huế - Đà Nẵng"`.
  4. Input Content: `"Tàu chạy siêu đẹp, qua đèo Hải Vân ngắm hoàng hôn vô cùng tuyệt vời. Mọi người nên thử!"`.
  5. Click **"Chia sẻ" (Post/Share)**.
* **Expected Result**:
  - The newly created post is instantly displayed at the top of the feed list (ordered by `createdAt desc`).
  - **Database Verification**: Check Firestore collection `/posts`:
    - Document Id equals `postId` (validated by firestore.rules regex `/^post-[a-zA-Z0-9_-]+$/`).
    - `likesCount` initiates at `0`.
    - `commentsCount` initiates at `0`.

---

### 5. Comment on Post
Verify that users can exchange remarks on railway itineraries.

* **Pre-conditions**: Authenticated user. Active feed display showing post from Scenario 4.
* **Test Steps**:
  1. Under the post created in Scenario 4, click the "Bình luận / Comments" expand check.
  2. Type: `"Có buffet nước uống hay quầy hàng ăn nhẹ không bác?"` in the input bar.
  3. Post the comment.
* **Expected Result**:
  - Comment appends underneath the post and the comment input content clears.
  - The parent post's comment indicator immediately updates (`commentsCount` increments from `0` to `1`).
  - **Database Verification**:
    - Under Firestore, verify that the path `/posts/{postId}` updates with `commentsCount = 1` through server increment safely.
    - Check the sub-collection or separate collection `/comments`: A new document is added containing `postId`, `commentId`, `authorId`, `content`, and `createdAt`.

---

### 6. Interactive Post Likes/Thả Tim
Ensure travellers can interact with content through safe increments and decrements, restricted from bloating arbitrary data.

* **Pre-conditions**: Authenticated user. Target post from Scenario 4 showing 0 likes.
* **Test Steps**:
  - **Like Sub-Case**:
    1. Click the "Thả Tim" or "Like Icon" under the post.
  - **Unlike Sub-Case (Toggle off)**:
    1. Click the "Thả Tim" or "Like Icon" again on the liked post.
* **Expected Result**:
  - **Liking**:
    - Heart turns red, like count displays `1`.
    - Firestore `/posts/{postId}` increments `likesCount` to `1`.
    - Check `/likes` collection: a tracker document containing `postId` and `userId` binds in.
  - **Unliking**:
    - Heart changes back, like count falls to `0`.
    - Firestore `/likes` token document gets deleted.
    - Post `likesCount` drops back to `0`.

---

### 7. Affiliate Click & Conversion Tracking
Ensure click transitions to railway partners are logged cleanly and securely.

* **Pre-conditions**: No login required (guest or user session). Developer tools Network tab is open.
* **Test Steps**:
  1. Navigate to the **Vé Tàu & Đối Tác** or **Hotels** page.
  2. Select any affiliate booking partner (e.g., **BAOLAU**, **12go**, **Traveloka**) and click on their external booking redirection button.
* **Expected Result**:
  - A browser redirect opens in a blank viewport containing designated URL query logs: `utm_source=vnr_travel_ai`, `utm_medium=affiliate`, `utm_campaign=rail_transit_upsell`.
  - Check Network Tab: A mock analytical post payload resolves successfully on `/api/clicks`.
  - **Firestore Verification**: Check the `/affiliateClicks` (or `/affiliateclicks`) collection. A new immutable document gets appended containing:
    - `createdAt`
    - `provider`
    - `campaign`
    - `serviceType` (e.g., `train_tickets`, `hotel_rooms`)
    - `userId` (binds actual traveler UID if active, otherwise references `"anonymous"`).

---

### 8. Admin Panel Metrics Guard & Dashboard Controls
Verify that only administrative accounts have privileges to query transactional clicks and audit logs.

* **Pre-conditions**:
  - Test Case A: User is logged in as standard Member.
  - Test Case B: User logs in using Admin account: `vnrtravelai@gmail.com`.
* **Test Steps**:
  1. Select the **Admin/Analytics** portal tab.
* **Expected Result**:
  - **Test Case A (Member)**:
    - User is blocked by frontend guard (not shown) or receives clear error notification.
    - Direct attempts to fetch `/api/leads` or querying `/affiliateClicks` Firestore elements are blocked by Firebase rules, outputting: `"Missing or insufficient permissions"`.
  - **Test Case B (Admin - `vnrtravelai@gmail.com`)**:
    - Dashboard renders beautiful summaries: Total Leads, Affiliate Click Logs, CRM data tracker.
    - Charts render with active information. No permission traps.

---

### 9. Offline PWA Resiliency & Cache Support
Assure travellers can access crucial routes, saved itineraries, and instructions when running without cellular connectivity.

* **Pre-conditions**: Application is installed as PWA on mobile or desktop test device.
* **Test Steps**:
  1. Open Chrome Developer Tools -> **Application** -> **Service Workers**. Confirm Service Worker `/sw.js` is registered, active, and running.
  2. View **Cache Storage**: Confirm precache `vnr-travel-v1` lists core documents like `manifest.json`, `index.html`.
  3. Turn off internet. In Developer Tools Network tab, toggle the **"Offline"** checkbox.
  4. Navigate between tabs: **Home / HomeView**, **Guides / GuidesView**, and **My Trips / MyTripsView**.
* **Expected Result**:
  - The application logic operates smoothly. The interface does not crash or display dead browser screens.
  - **Saved itineraries** stored in local cache/cache storage load up instantly and remain fully interactive offline.
  - Once internet connection is restored (toggle "Offline" offline), real-time Firebase listeners automatically reconvene, synchronize with Cloud Firestore backends, and update the UI content automatically.

---
