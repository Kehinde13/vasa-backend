import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

// Define the User schema
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  businessName: { type: String },
  role: { type: String, enum: ['VA', 'Team Lead', 'Client'], required: true },
  phone: { type: String },
  timeZone: { type: String },

  businessType: { type: String },
  services: [String],  // Array of services like "Email Management", etc.

}, { timestamps: true });  // Adds createdAt and updatedAt fields

// Hash the password before saving the user
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await hash(this.password, 10);
});

// Method to compare entered password with the stored hash
userSchema.methods.matchPassword = function (enteredPassword) {
  return compare(enteredPassword, this.password);
};

export default model('User', userSchema);
