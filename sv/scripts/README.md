    # Data Export Script

This script exports all your Firebase Firestore data to JSON files.

## Setup

1. **Get your Firebase service account key:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely (e.g., `firebase-service-account.json`)
   - **Important:** Add this file to `.gitignore` to keep it private

2. **Set up environment variable:**

   You have two options:

   **Option A:** Using file path
   ```bash
   export FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/firebase-service-account.json
   ```

   **Option B:** Using the JSON directly
   ```bash
   export FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
   ```

## Usage

Run the export script:

```bash
npm run export
```

## Output

The script will create an `exports` directory with the following files:

- `profiles.json` - All profile documents
- `projects.json` - All project documents
- `blogs.json` - All blog documents
- `socialLinks.json` - All social link documents
- `config-contact.json` - Contact configuration
- `all-data.json` - Combined export of all data
- `backup-YYYY-MM-DDTHH-MM-SS.json` - Timestamped backup

## Example

```bash
# Set the environment variable (choose one method)
export FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json

# Run the export
npm run export
```

## Output Example

```
Starting Firebase data export...
Export directory: /path/to/your/project/exports

Exporting profiles...
✓ Exported 1 document(s) to /path/to/your/project/exports/profiles.json

Exporting projects...
✓ Exported 5 document(s) to /path/to/your/project/exports/projects.json

Exporting blogs...
✓ Exported 3 document(s) to /path/to/your/project/exports/blogs.json

✓ Created combined export: /path/to/your/project/exports/all-data.json
✓ Created timestamped backup: /path/to/your/project/exports/backup-2026-02-24T10-30-45.json

✅ Data export completed successfully!

Summary:
- Profiles: 1 document(s)
- Projects: 5 document(s)
- Blogs: 3 document(s)
- Social Links: 2 document(s)
- Config: 1 document(s)
```

## Troubleshooting

### Error: "Cannot find module 'firebase-admin'"

Make sure you've installed dependencies:
```bash
npm install
```

### Error: "Credential implementation provided to initializeApp() via the 'credential' property failed"

This means your service account credentials are incorrect or not properly set. Make sure:
- The JSON file path is correct
- The environment variable is set correctly
- The JSON contains all required fields

### Error: "Permission denied"

Your service account needs Firestore read permissions. In Firebase Console:
- Go to IAM & Admin
- Find your service account
- Make sure it has "Cloud Datastore User" or "Firebase Admin" role
