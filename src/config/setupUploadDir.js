import fs from 'fs';
import path from 'path';

// Get the correct directory for the current file
const uploadDir = path.join(process.cwd(), 'src', 'uploads'); // This uses the root directory for the project

// Check if the directory exists, and create it if necessary
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}