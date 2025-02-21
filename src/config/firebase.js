// firebase.js
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.js';

// Path to your Firebase Admin SDK JSON file

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
