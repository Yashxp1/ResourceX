import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api/v1/', (req, res) => {
  res.send("HELLO FROM SERVER!")
})

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`)
  connectDB()
})
