// server/models/User.js
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },  // User or admin or operator
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
