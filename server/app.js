import express from 'express'
import documentRoutes from './routes/documentRoutes.js'
import userRoutes from './routes/userRoutes.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express()

app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/users', userRoutes);


export default app;