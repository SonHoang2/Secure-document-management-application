import dotenv from 'dotenv'

dotenv.config()

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    encryptionMethod: process.env.ENCRYPTION_METHOD,
    iv: process.env.IV,
    database: {
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN
    },
}