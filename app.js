import express from 'express';
import './src/config/setupUploadDir.js'; // This will run and create the directory before server starts
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';
import authRoutes from './src/routes/auth.route.js';
import userProfileRoutes from './src/routes/userProfile.route.js';
import homeRoutes from './src/routes/home.route.js';
import exploreProfilesRoutes from './src/routes/exploreProfiles.route.js';
import notificationsRoutes from './src/routes/notification.route.js';
import singleProfileRoutes from './src/routes/singleProfile.route.js';
import postRoutes from './src/routes/post.route.js';
import interestRoutes from './src/routes/interest.route.js';

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Required for JWT cookies
  })
);



app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Serve static files from the uploads folder
const __dirname = path.resolve(); // Get the root directory
// Serve static files from the uploads folder inside src
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', homeRoutes);
app.use('/api', exploreProfilesRoutes);
app.use('/api', notificationsRoutes);
app.use('/api', singleProfileRoutes);
app.use('/api', postRoutes);
app.use('/api', interestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));