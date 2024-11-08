import crypto from 'crypto'
import config from '../config.js'

const { secretKey, encryptionMethod } = config

if (!secretKey || !encryptionMethod) {
    throw new Error('secretKey, and encryptionMethod are required')
}

// Encrypt data
export function encryptData(text) {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(secretKey),
        iv
    );

    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

// Decrypt data
export function decryptData(text) {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(secretKey),
        iv
    );

    // By default node uses PKCS padding, but Python uses null-byte
    // padding instead. So calling cipher.setAutoPadding(false); after
    // you create the decipher instance will make it work as expected:
    //decipher.setAutoPadding(false);

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}