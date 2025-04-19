/**
 * Middleware to check if a user is logged in.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Redirects to 404 page if user is not logged in.
 */
const authorizeLoggedOn = (req, res, next) => {
  console.log('Checking if user is logged in:', req.session.loggedInUser)
  if (!req.session || !req.session.loggedInUser) {
    console.error('User is not logged in')
    return res.status(404).render('error/404', { title: 'Page Not Found' })
  }
  next()
}

export default authorizeLoggedOn
