import multer from 'multer';
import path from 'path';

// Set up Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // specify your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

export const addPost = async (req, res) => {
  try {
    const { userId, content, category } = req.body;
    const image = req.file ? req.file.path : null; // Image path if exists

    if (!userId || !content || !category) {
      return res.status(400).json({ message: 'User ID, content, and category are required' });
    }

    const newPost = new Post({
      userId,
      content,
      category,
      image,
      impressions: 0,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post added successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export { upload };