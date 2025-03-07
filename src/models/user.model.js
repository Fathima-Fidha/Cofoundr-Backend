import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
    experience: { type: String },
    location: { type: String },
    preferences: { type: [String], set: (prefs) => prefs.map((p) => p.toLowerCase()) },
    skills: { type: [String], set: (skills) => skills.map((s) => s.toLowerCase()) },
    profileViews: { type: Number, default: 0 },
    interests: { type: Number, default: 0 },
    fcmToken: { type: String,default: null },
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
