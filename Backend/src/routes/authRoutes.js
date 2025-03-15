import express from 'express'
import {signup, login, logout, getAllUsers, getUserById} from '../controllers/authController.js'


const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)

export default router