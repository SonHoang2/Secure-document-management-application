import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, PORT, SECRET_KEY, ENCRYPTION_METHOD } = process.env

export default {
    env: NODE_ENV,
    port: PORT,
    secretKey: SECRET_KEY,
    encryptionMethod: ENCRYPTION_METHOD,
}