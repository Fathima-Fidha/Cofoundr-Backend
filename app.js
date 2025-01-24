import express from 'express';  
import dotenv from 'dotenv';  
import connectDB from './src/config/db.js';  
import cors from 'cors';  
import authRoutes from './src/routes/auth.route.js';  

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));