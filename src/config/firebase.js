// firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
const serviceAccount = {
  type: "service_account",
  project_id: "pushnotifications-ede6d",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};
// Path to your Firebase Admin SDK JSON file
console.log(process.env.PORT, '678');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (token, message) => {
  try {
    const payload = {
      notification: {
        title: "New Notification",
        body: message,
      },
    };
    await admin.messaging().sendToDevice(token, payload);
    console.log("Push notification sent successfully");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};
