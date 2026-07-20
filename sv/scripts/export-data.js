import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_PATH 
  ? JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8'))
  : JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Create export directory
const exportDir = path.join(__dirname, '..', 'exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

async function exportCollection(collectionName) {
  try {
    console.log(`\nExporting ${collectionName}...`);
    const snapshot = await db.collection(collectionName).get();
    
    if (snapshot.empty) {
      console.log(`No documents found in ${collectionName}`);
      return [];
    }

    const data = [];
    snapshot.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });

    const filename = path.join(exportDir, `${collectionName}.json`);
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`✓ Exported ${data.length} document(s) to ${filename}`);
    
    return data;
  } catch (error) {
    console.error(`Error exporting ${collectionName}:`, error.message);
    return [];
  }
}

async function exportDocument(collectionName, docId) {
  try {
    console.log(`\nExporting ${collectionName}/${docId}...`);
    const docRef = await db.collection(collectionName).doc(docId).get();
    
    if (!docRef.exists) {
      console.log(`Document ${collectionName}/${docId} not found`);
      return null;
    }

    const data = {
      id: docRef.id,
      ...docRef.data()
    };

    const filename = path.join(exportDir, `${collectionName}-${docId}.json`);
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`✓ Exported to ${filename}`);
    
    return data;
  } catch (error) {
    console.error(`Error exporting ${collectionName}/${docId}:`, error.message);
    return null;
  }
}

async function exportAllData() {
  console.log('Starting Firebase data export...');
  console.log(`Export directory: ${exportDir}`);

  const allData = {
    profiles: await exportCollection('profiles'),
    projects: await exportCollection('projects'),
    blogs: await exportCollection('blogs'),
    socialLinks: await exportCollection('socialLinks'),
    config: {}
  };

  // Export specific config documents
  const contactConfig = await exportDocument('config', 'contact');
  if (contactConfig) {
    allData.config.contact = contactConfig;
  }

  // Create a combined export file
  const combinedFilename = path.join(exportDir, 'all-data.json');
  fs.writeFileSync(combinedFilename, JSON.stringify(allData, null, 2));
  console.log(`\n✓ Created combined export: ${combinedFilename}`);

  // Create a timestamped backup
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const backupFilename = path.join(exportDir, `backup-${timestamp}.json`);
  fs.writeFileSync(backupFilename, JSON.stringify(allData, null, 2));
  console.log(`✓ Created timestamped backup: ${backupFilename}`);

  console.log('\n✅ Data export completed successfully!');
  
  // Print summary
  console.log('\nSummary:');
  console.log(`- Profiles: ${allData.profiles.length} document(s)`);
  console.log(`- Projects: ${allData.projects.length} document(s)`);
  console.log(`- Blogs: ${allData.blogs.length} document(s)`);
  console.log(`- Social Links: ${allData.socialLinks.length} document(s)`);
  console.log(`- Config: ${Object.keys(allData.config).length} document(s)`);
}

// Run the export
exportAllData()
  .then(() => {
    console.log('\n✓ Export process finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Export failed:', error);
    process.exit(1);
  });
