# VNR Travel AI - Production Backup Plan & Disaster Recovery Protocol

This document establishes the production backup strategies, automated retention configurations, and step-by-step restoration checklist for **VNR Travel AI** core databases, assets, and metadata layer.

---

## 1. Automated Daily Backup Specification

| Operational Parameter | Specification Details |
| :--- | :--- |
| **Backup Frequency** | Daily, fully incremental snapshotting |
| **Execution Window**| **03:00 AM Indochina Time (ICT)** (Offset hour of lowest rail booking & api transactions activity) |
| **Automated Retention** | **30 Days Cycle** (Self-cleaning oldest records utilizing GCS bucket Lifecycle Management) |
| **Target Storage Class** | Cloud Storage Nearline/Coldline Bucket: `gs://vnr-travel-production-backups/` |
| **SRE Alert Channel** | Automated Slack & Chat Hook to `vnrtravelai@gmail.com` on Job failure status |

---

## 2. Backup Coverage Matrix

The backup orchestrator is configured to export the following transactional collections and metadata scopes:

```
+-------------------------------------------------------------------------------+
|                             VNR Travel AI Backups                             |
+-------------------------------------------------------------------------------+
|  1. users             -> Core traveler accounts, profiles (Admin/Staff/Guest) |
|  2. itineraries       -> AI rail schedules, custom route coordinates         |
|  3. affiliateClicks   -> UTM tokens, travel tickets conversion ledger         |
|  4. posts             -> Rail community travel log sharing entries            |
|  5. comments          -> Interactive dialogue replies associated with posts   |
|  6. likes             -> Social proof, bookmarks and traveler upvote signals  |
|  7. storage metadata  -> Image asset mappings & GCS public link pointers       |
+-------------------------------------------------------------------------------+
```

---

## 3. Automated Cron Trigger Setup (Google Cloud Scheduler)

To configure the daily backup job, run the following commands via GCloud Console CLI tools:

```bash
# 1. Establish custom Cloud Storage bucket for storage backup
gsutil mb -c nearline -l asia-southeast1 gs://vnr-travel-production-backups

# 2. Add Lifecycle rules for 30-day auto-purge of old backups
gsutil lifecycle set lifecycle-config.json gs://vnr-travel-production-backups

# 3. Create Scheduler run task at 03:00 AM daily (Asia/Ho_Chi_Minh timezone)
gcloud scheduler jobs create http firestore-daily-backup \
    --schedule="0 3 * * *" \
    --uri="https://firestore.googleapis.com/v1/projects/vnr-travel-ai/databases/(default)/documents:exportDocuments" \
    --http-method=POST \
    --headers="Content-Type=application/json" \
    --message-body="{\"outputUriPrefix\": \"gs://vnr-travel-production-backups/snapshots\"}" \
    --time-zone="Asia/Ho_Chi_Minh" \
    --oauth-service-account-email="backup-agent@vnr-travel-ai.iam.gserviceaccount.com"
```

Where `lifecycle-config.json` is:
```json
{
  "rule": [
    {
      "action": {"type": "Delete"},
      "condition": {"age": 30}
    }
  ]
}
```

---

## 4. Disaster Recovery & Restoration Checklist

Execute these procedures sequentially in the event of major data corruption or accidental deletions:

### Phase 1: Snapshot Identification & Download (Export Verification)
- [ ] Determine the precise timestamp representing the newest healthy snapshot in `gs://vnr-travel-production-backups/snapshots/` (e.g. `2026-06-20T03:00:11-07:00`).
- [ ] List directories to ensure full schemas are captured:
  ```bash
  gsutil ls gs://vnr-travel-production-backups/snapshots/2026-06-20/
  ```

### Phase 2: Metadata Integrity & Checksum Verification
- [ ] Fetch exported `.json` manifest parameters containing data offsets.
- [ ] Run CRC32 checksum checks to confirm backup is solid and uncorrupted:
  ```bash
  gsutil hash -c gs://vnr-travel-production-backups/snapshots/2026-06-20/all_namespaces.export_metadata
  ```

### Phase 3: Restoration to Sandbox / Staging Env
- [ ] Do **NOT** restore straight to production database. Provision/select a parallel Staging environment instance (`vnr-travel-ai-staging`).
- [ ] Perform a full schema injection:
  ```bash
  gcloud config set project vnr-travel-ai-staging
  gcloud firestore import gs://vnr-travel-production-backups/snapshots/2026-06-20/
  ```

### Phase 4: Staging Smoke Testing & Validation
- [ ] Check total count of restored passenger routes inside the `itineraries` collection match records from before the incident.
- [ ] Check security permissions and review real-time query rendering in the staging app frontend.
- [ ] Verify affiliate links and ensure outbound conversion records are fully intact.

### Phase 5: Production Restoration & Synchronization
- [ ] Inform developer operations team and trigger the site banner flag: `UNDER_MAINTENANCE=true`.
- [ ] Run the final production targeted restore command (selective collection restoration is preferred for localized errors):
  ```bash
  gcloud config set project vnr-travel-ai-production
  
  # To restore specific corrupted collections selectively
  gcloud firestore import gs://vnr-travel-production-backups/snapshots/2026-06-20/ \
      --collection-ids=users,itineraries,posts,comments,likes,affiliateClicks
  ```
- [ ] Clear CDNs, reset cache, and reset the maintenance banner to restore full user traffic access.
