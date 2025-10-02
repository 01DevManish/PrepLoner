import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON as string
  );
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;