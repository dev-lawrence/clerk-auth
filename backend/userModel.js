import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
  },

  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
