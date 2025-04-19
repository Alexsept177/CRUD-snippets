import Snippet from '../models/SnippetModel.js'

/**
 * Get all snippets and render them in a list view.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getAllSnippets = async (req, res) => {
  try {
    // Hämta alla snippets från databasen
    const snippets = await Snippet.find().populate('createdBy', 'username')

    // Rendera listvyn och skicka med snippets
    res.render('./snippets/snippets_list', {
      snippets,
      loggedInUser: req.session.loggedInUser
    })
  } catch (err) {
    res.status(500).send('Error fetching snippets: ' + err.message)
  }
}

/**
 * Creates a new snippet and saves it to the database.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void}
 */
export const create = async (req, res) => {
  try {
    if (!req.session.loggedInUser) {
      return res.status(401).send('You need to log in to create a snippet')
    }

    // Validering av titel och innehåll innan instansen skapas
    if (req.body.title.length > 50) {
      req.session.errorMessage = 'Title must be 50 characters or less'
      return res.redirect('./create')
    }
    
    if (req.body.content.length > 500) {
      req.session.errorMessage = 'Content must be 500 characters or less'
      return res.redirect('./create')
    }

    // Skapa Snippet endast om valideringen passerar
    const snippet = new Snippet({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.session.loggedInUser.id
    })

    await snippet.save()
    res.status(201).redirect('./snippets_list')
  } catch (error) {
    res.status(500).send('Error creating snippet: ' + error.message)
  }
}

/**
 * Displays a single snippet by its ID.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
export const showSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate('createdBy', 'username')
    const snippets = await Snippet.find()
    if (!snippet) {
      return res.status(404).send('Snippet not found')
    }
    res.render('./snippets/show', {
      snippet,
      snippets,
      loggedInUser: req.session.loggedInUser
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Renders the edit form for a specific snippet.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
export const showEditForm = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
    if (!snippet) {
      return res.status(404).send('Snippet not found')
    }
    res.render('../snippets/edit', { snippet })
  } catch (err) {
    next(err)
  }
}

/**
 * Updates an existing snippet in the database.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
export const updateSnippet = async (req, res, next) => {
  console.log('Request params:', req.params)
  console.log('Request body:', req.body)
  try {
    // Validering innan uppdatering sker
    if (req.body.title.length > 50) {
      req.session.errorMessage = 'Title must be 50 characters or less'
      return res.redirect(`./${req.params.id}`)
    }
    
    if (req.body.content.length > 500) {
      req.session.errorMessage = 'Content must be 500 characters or less'
      return res.redirect(`./${req.params.id}`)
    }

    // Uppdatera snippet efter att validering har passerat
    const snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content
      },
      { new: true }
    )

    if (!snippet) {
      return res.status(404).send('Snippet not found')
    }
    
    console.log('Snippet updated successfully:', snippet)
    req.session.successMessage = 'Snippet updated successfully!'
    res.redirect(`../show/${snippet._id}`)
  } catch (err) {
    next(err)
  }
}

/**
 * Deletes a snippet from the database.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
export const deleteSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id)
    if (!snippet) {
      return res.status(404).send('Snippet not found')
    }
    req.session.successMessage = 'Snippet deleted successfully!'
    res.redirect('../') // Omdirigera till listan efter radering
  } catch (err) {
    next(err)
  }
}
