# VNR Travel AI - Go-Live Production Readiness Checklist

This document acts as the definitive security audit, system integration validation, and go-live health log for shipping **VNR Travel AI** into master production.

---

## 🛡️ 1. SECURITY & DATA SHIELDING

### [ ] Authentication Configuration
- [ ] Production email/password and Google authentication providers are turned on in the Firebase Console.
- [ ] Authorized domains list restricted exclusively to:
  - `vnrtravelai.web.app`
  - `vnrtravelai.firebaseapp.com`
  - `localhost` (development testing only).
- [ ] Auth token lifetimes kept at standard sessions under standard client SDK refreshes.

### [ ] Firestore Security Rules (firestore.rules)
- [ ] User profile document writes are guarded so only the authenticated owner UID can update their corresponding record.
- [ ] Public reads allowed for `posts`, `comments`, and aggregate metrics, while writes require a valid user session.
- [ ] Critical ledger collection `affiliateClicks` is append-only for guests (preventing arbitrary document deletion/edits).
- [ ] Direct system diagnostic collections like `crashes` set to write-only for clients, hiding server-level stack traces from general viewers.

### [ ] Cloud Storage Security Rules (storage.rules)
- [ ] Uploaded profile images and travel logs restricted to `image/*` MIME-types.
- [ ] Files constrained under 10MB limits per asset write.
- [ ] Deletion of static media assets restricted to verified authors or staff role permissions.

### [ ] Firebase App Check
- [ ] App Check activated with Google reCAPTCHA v3 Enterprise on the frontend client.
- [ ] Firebase project rules enforce App Check tokens for `itineraries`, `posts`, and `comments` write APIs to prevent spam bots.

### [ ] Admin Shield
- [ ] Email filters verify admin identity: only `vnrtravelai@gmail.com` can fetch full affiliate metrics or view diagnostic crash summaries.
- [ ] Role checking handled in backend Firebase Rules (`request.auth.token.role == 'admin'` under custom claims).

---

## 📊 2. REAL-TIME TELEMETRY & MARKETING UTILITIES

### [ ] Outbound Affiliate Conversion Loggers
- [ ] Outbound click handlers successfully inject UTM params: `utm_source`, `utm_medium`, `utm_campaign`.
- [ ] Direct partners (BAOLAU, 12go, Traveloka) confirm deep-links resolve with valid tracker codes.
- [ ] All conversions fire the unified `affiliate_click` Google Analytics events and save a duplicate Firestore log to `affiliateClicks`.

### [ ] Google Analytics 4 (GA4) Tracking
- [ ] Measurement ID `G-QDRE7EP0S9` configured in both environment configs and HTML loaders.
- [ ] Page-view event handler logs page routes on virtual state transitions (`/home`, `/planner`, `/tours`, `/hotels`).
- [ ] Custom dimensions created in GA4 console for `provider`, `serviceType`, and `campaign` tracking.

### [ ] Global Incident & Crash Monitoring
- [ ] `ErrorBoundary` interceptor listens to unhandled promise rejections and top-level `window.onerror`.
- [ ] Exceptions write securely to `crashes` collection with browser runtime signatures for telemetry triage.

---

## 📱 3. CLIENT INTERFACE & GO-LIVE WRAPPERS

### [ ] Progressive Web App (PWA) Foundation
- [ ] `/manifest.json` correctly parsed by major browsers, containing multi-resolution maskable launchers.
- [ ] Service worker `/sw.js` matches the fallback redundancy file `/service-worker.js`.
- [ ] Cache engine pre-caches offline fallback states for Home, AI Planner, Hotels, and Saved Itineraries.
- [ ] Desktop and Mobile responsive web overlays successfully deliver native app installation banners dynamically.

### [ ] Multi-lingual SEO Optimization (Sitemap & Schema)
- [ ] Bi-lingual title tag, Open Graph metadata, and Twitter Card fields dynamically update based on locale switcher selection.
- [ ] `/robots.txt` targets production `/sitemap.xml` correctly.
- [ ] `/sitemap.xml` indexes and values mapped for Vietnam Railways tourist route discovery.

### [ ] Firebase Hosting Release Configuration
- [ ] `firebase.json` specifies SPA rewrite mappings (`**` route to `/index.html`).
- [ ] Static asset folders under `/assets/**` leverage extreme caches (`max-age=31536000, immutable`).
- [ ] Secure headers config blocks clickjacking and enforces HTTPS connections permanently.

---

## 🗄️ 4. DATABASE PERFORMANCES & BACKUPS

### [ ] Firestore Indexes
- [ ] Verified composite index settings deployed containing multi-sorting orders for `posts`, `comments`, `likes`, `itineraries`, and `affiliateClicks`.

### [ ] Disaster Backups Plan
- [ ] Scheduler triggers successfully at `03:00 AM ICT` (Asia/Ho_Chi_Minh).
- [ ] GCS retention strategy removes backups over 30 days old.
- [ ] Checklist tested on sandboxed staging deployment.
