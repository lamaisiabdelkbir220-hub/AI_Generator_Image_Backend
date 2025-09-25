import admin from 'firebase-admin';
import env from '@/lib/env';

// Initialize Firebase only if we have the required environment variable
let messaging: admin.messaging.Messaging | null = null;

if (!admin.apps.length && env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  try {
    const serviceAccountBase64 = env.FIREBASE_SERVICE_ACCOUNT_BASE64;

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

    messaging = admin.messaging();
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export { messaging, admin };
