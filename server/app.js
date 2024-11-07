import express from 'express'
import fileRoutes from './routes/fileRoutes.js'

const app = express()

app.use('/api/v1/files', fileRoutes)

export default app;