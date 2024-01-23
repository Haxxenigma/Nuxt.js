import { pbkdf2Sync, randomBytes } from 'crypto';

const options = [100000, 64, 'sha512'];

export async function hash(password) {
    const salt = randomBytes(16).toString('hex');
    const key = pbkdf2Sync(password, salt, ...options).toString('hex');
    return { salt, key };
}

export async function compare(plainPassword, password) {
    const [salt, hash] = password.split(':');
    const key = pbkdf2Sync(plainPassword, salt, ...options).toString('hex');
    return key === hash;
}