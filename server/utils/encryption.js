import crypto from 'crypto';
import fs from 'fs';
import config from '../config/config.js';

export function encrypt(algorithm, buffer, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return encrypted;
};

export function decrypt(algorithm, buffer, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return decrypted;
}

export function saveEncryptedFile(buffer, filePath, key, iv) {
    const encrypted = encrypt(config.encryptionMethod, buffer, key, iv);

    fs.writeFileSync(filePath, encrypted);
}

export function getEncryptedFile(filePath, key, iv) {

    const encrypted = fs.readFileSync(filePath);
    const buffer = decrypt(config.encryptionMethod, encrypted, key, iv);
    return buffer;
}