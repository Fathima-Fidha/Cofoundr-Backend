// firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { getMessaging } from 'firebase-admin/messaging';
dotenv.config();
const serviceAccount = {
  type: "service_account",
  project_id: "pushnotifications-f2d69",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (token, message) => {
  console.log(token, message, 'Notification Data');

  if (!token || !message) {
    console.error("Invalid token or message");
    return;
  }

  try {
    const payload = {
      token:token, // Device token
      notification: {
        title: "New Notification",
        body: message,
      },
    };

    console.log(payload, "payload")

    const response = await admin.messaging().send(payload);
    console.log("Push notification sent successfully:", response.responses[0].error);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};
