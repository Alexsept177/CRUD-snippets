import User from '../models/UserSchema.js'

/**
 * Registers a new user in the system.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      req.session.errorMessage = 'Passwords do not match'
      return res.redirect('./register')
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      req.session.errorMessage = 'Username or email already exists'
      return res.redirect('./register')
    }

    if (username.length < 3 || password.length < 3) {
      req.session.errorMessage = 'Username and password must be at least 3 characters long'
      return res.redirect('./register')
    }

    const user = new User({ username, email, password })
    await user.save()
    req.session.successMessage = 'Account successfully registered!'
    res.redirect('./login')
  } catch (error) {
    req.session.errorMessage = 'Error during registration: ' + error.message
    res.redirect('./register')
  }
}

/**
 * Authenticates and logs in a user.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const user = await User.findOne({ $or: [{ username }, { email }] })
    if (!user) {
      req.session.errorMessage = 'Invalid username or password'
      return res.redirect('./login')
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      req.session.errorMessage = 'Invalid username or password'
      return res.redirect('./login')
    }

    req.session.successMessage = 'Successfully logged in!'
    req.session.loggedInUser = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    res.redirect('../snippets/snippets_list')
  } catch (error) {
    req.session.errorMessage = 'Error during login: ' + error.message
    res.redirect('./users/login')
  }
}

/**
 * Logs out a user and clear session.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
export const logoutUser = async (req, res) => {
  try {
    req.session.user = null
    // Regenerera sessionen
    req.session.regenerate(err => {
      if (err) {
        console.error('Error regenerating session:', err)
        return res.redirect('./')
      }
      // Rensa sessionen och skicka användaren till startsidan
      req.session.successMessage = 'Logout successful!'
      res.clearCookie('connect.sid')
      res.redirect('../')
    })
  } catch (error) {
    console.error('Error during logout:', error)
    res.redirect('../')
  }
}
