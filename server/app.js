import express from 'express'
import documentRoutes from './routes/documentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import AppError from './utils/AppError.js'
import globalErrorHandler from './controllers/errorController.js'
import cors from 'cors'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express()

app.use(cors())

// Body parser, reading data from body into req.body
app.use(express.json());

app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/users', userRoutes);

app.use(globalErrorHandler)


export default app;