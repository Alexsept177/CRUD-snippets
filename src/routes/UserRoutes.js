import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/UserController.js'

const Router = express.Router()

// Routes för registrering av användare
Router.get('/register', (req, res) => res.render('users/register'))
Router.post('/register', registerUser)

// Routes för inloggning av användare
Router.get('/login', (req, res) => res.render('users/login'))
Router.post('/login', loginUser)

// Route för utloggning av användare
Router.post('/logout', logoutUser)

export default Router
