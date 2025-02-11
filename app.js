import express from 'express';
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

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', homeRoutes);
app.use('/api', exploreProfilesRoutes);
app.use('/api', notificationsRoutes);
app.use('/api', singleProfileRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));