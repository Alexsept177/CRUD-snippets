import express from 'express'
import helmet from 'helmet'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import Router from './UserRoutes.js'
import SnippetRoutes from './SnippetRoutes.js'

const router = express.Router()

// Lägg till Helmet för säkerhetsheaders
router.use(helmet())

// Lägg till cookie-parser (krävs för CSRF)
router.use(cookieParser())

// Aktivera CSRF-skydd
const csrfProtection = csrf({ cookie: true })
router.use(csrfProtection)

// Gör CSRF-token tillgänglig i alla vyer (EJS/HTML)
router.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
})

// Hemruta
router.get('/', (req, res) => {
  res.render('snippets/index', { title: 'Home' })
})

// Användare
router.use('/users', Router)

// Snippets
router.use('/snippets', SnippetRoutes)

// 404 om ingen sida hittas
router.use((req, res) => {
  res.status(404).render('error/404', { title: 'Page Not Found' })
})

// Hantera fel
router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('CSRF Token validation failed. Try again.')
  } else {
    console.error(err)
    res.status(500).render('error/500', { title: 'Internal Server Error' })
  }
})

export { router }
