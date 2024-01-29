import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isNew || this.isModified('password')) {
      const hashedPassword = await argon2.hash(this.password);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
