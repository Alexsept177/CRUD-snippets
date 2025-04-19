import Snippet from '../models/SnippetModel.js'

/**
 * Middleware to verify if the current user owns the specified snippet.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Calls the next middleware function
 */
export const authorizeSnippetOwner = async (req, res, next) => {
  console.log('Checking if user owns the snippet:', req.params.id)
  try {
    const snippet = await Snippet.findById(req.params.id).populate('createdBy', 'username')
    if (!snippet) {
      console.error('Snippet not found')
      return res.status(404).send('Snippet not found')
    }
    if (!snippet.createdBy || snippet.createdBy.username !== req.session.loggedInUser.username) {
      console.error('User does not own this snippet')
      return res.status(403).render('error/403', { title: 'Access Forbidden' })
    }
    next()
  } catch (err) {
    next(err)
  }
}

export default authorizeSnippetOwner
