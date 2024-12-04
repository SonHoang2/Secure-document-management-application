import express from 'express'
import documentRoutes from './routes/documentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import auditLogRoutes from './routes/auditLogRoutes.js'
import globalErrorHandler from './controllers/errorController.js'
import path from 'path'
import cors from 'cors'
import { __dirname } from './shareVariable.js'
const app = express()

app.use(cors())

// Body parser, reading data from body into req.body
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/upload/images/')));

app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auditLogs', auditLogRoutes);


app.use(globalErrorHandler)


export default app;