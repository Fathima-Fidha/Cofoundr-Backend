import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated post ID
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false }, // Optional field for image URL or path
    impressions: { type: Number, default: 0 }, // Track the number of views/impressions
    createdAt: { type: Date, default: Date.now }, // Store post creation time
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
