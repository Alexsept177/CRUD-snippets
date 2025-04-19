import session from 'express-session'

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'mySuperSecretKey',
  resave: false,
  saveUninitialized: true
}

const sessionMiddleware = session(sessionOptions)

/**
 * Middleware that adds the logged-in user to response locals.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const loggedInUserMiddleware = (req, res, next) => {
  res.locals.loggedInUser = req.session.loggedInUser || null
  next()
}

/**
 * Middleware that handles flash messages and notifications in the session.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const notificationMiddleware = (req, res, next) => {
  if (req.session) {
    res.locals.flash = req.session.flash || {}
    res.locals.successMessage = req.session.successMessage
    res.locals.errorMessage = req.session.errorMessage

    delete req.session.flash
    delete req.session.successMessage
    delete req.session.errorMessage
  }
  next()
}

export { sessionMiddleware, loggedInUserMiddleware, notificationMiddleware }
