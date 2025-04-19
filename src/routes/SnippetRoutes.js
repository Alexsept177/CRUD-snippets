import express from 'express'
import { getAllSnippets as getAll, create, updateSnippet as edit, deleteSnippet, showSnippet } from '../controllers/SnippetController.js'
import authorizeLoggedOn from '../middlewares/authorizeLoggedOn.js'
import authorizeSnippetOwner from '../middlewares/authorizeSnippetOwner.js'
import Snippet from '../models/SnippetModel.js'

const router = express.Router()

// Lista alla snippets (öppen för alla)
router.get('/snippets_list', getAll)

router.get('/create', authorizeLoggedOn, (req, res) => {
  res.render('snippets/create') // Rendera formuläret för att skapa en snippet
})

// Skapa en ny snippet (endast inloggade)
router.post('/create', authorizeLoggedOn, create)

// Visa en enskild snippet (öppen för alla)
router.get('/snippets_list/show/:id', showSnippet)

// Redigera en snippet (endast ägare)
router.get('/snippets_list/edit/:id', async (req, res, next) => {
  try {
    // Kontrollera att användaren är inloggad
    if (!req.session || !req.session.loggedInUser) {
      console.error('User is not logged in')
      return res.status(404).render('error/404', { title: 'Page Not Found' })
    }

    const snippet = await Snippet.findById(req.params.id).populate('createdBy', 'username')

    if (!snippet) {
      return res.status(404).render('error/404', { title: 'Page Not Found' })
    }
    // Kontrollera att inloggad användare är ägare till snippet
    if (!snippet.createdBy || snippet.createdBy.username !== req.session.loggedInUser.username) {
      return res.status(403).render('error/403', { title: 'Access Forbidden' })
    }

    res.render('snippets/edit', { snippet })
  } catch (err) {
    next(err)
  }
})

// Uppdatera en snippet (endast ägare)
router.post('/snippets_list/edit/:id', authorizeSnippetOwner, edit)

// Radera en snippet (endast ägare)
router.post('/snippets_list/delete/:id', authorizeSnippetOwner, deleteSnippet)

export default router
