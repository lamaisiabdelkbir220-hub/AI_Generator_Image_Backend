import admin from 'firebase-admin';
import env from '@/lib/env';

if (!admin.apps.length) {
  const serviceAccountBase64 = env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!serviceAccountBase64) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set.'
    );
  }

  // Decode the Base64 string back to a JSON string
  const serviceAccountJsonString = Buffer.from(
    serviceAccountBase64,
    'base64'
  ).toString('utf8');

  // Parse the JSON string into an object
  const serviceAccount = JSON.parse(serviceAccountJsonString);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const messaging = admin.messaging();

export { messaging, admin };
