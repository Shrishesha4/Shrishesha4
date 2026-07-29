# API notes

The previous content-management API (`POST /api/blogs`, `POST /api/projects`) is **not implemented** in this repository. Do not reintroduce endpoints that fetch arbitrary remote URLs (e.g. `mdUrl`) without:

1. Authentication (`API_SECRET` / admin auth)
2. Strict URL allowlists (public HTTPS hosts only; block private/link-local IPs)
3. Size and content-type limits on remote fetches

## Contact API

**Endpoint:** `POST /api/contact`

Stores contact form submissions via Firebase Admin SDK (bypasses client Firestore rules). Requires `FIREBASE_SERVICE_ACCOUNT` or `FIREBASE_SERVICE_ACCOUNT_PATH`.

Optional `spreadsheetUrl` is accepted only when it is an HTTPS `script.google.com/macros/...` URL.

Rate limited to 5 requests per IP per minute. Includes a honeypot field (`website`).
