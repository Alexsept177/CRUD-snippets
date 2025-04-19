import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Skapa ett schema för användare
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlenght: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlenght: 3 }
})

// Hasha lösenord innan det sparas
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    next(err)
  }
})

/**
 * Compares the provided password with the stored hashed password.
 *
 * @param {string} candidatePassword - The password to verify
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
