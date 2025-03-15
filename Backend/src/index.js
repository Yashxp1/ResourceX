import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './lib/db.js'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()


app.use(express.json()); 
app.use('/api/v1', authRoutes)
// app.use('/api/v1')

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`)
  connectDB()
})
