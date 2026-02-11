// controllers/walletController.js

const { Keypair } = require('@solana/web3.js');
const nacl = require('tweetnacl');
const bs58 = require('bs58');

/**
 * Generates a new Solana wallet (Keypair).
 * @returns {Object} The new wallet's public and private key.
 */
function generateWallet() {
    const keypair = Keypair.generate();
    return {
        publicKey: keypair.publicKey.toBase58(),
        secretKey: bs58.encode(keypair.secretKey),
    };
}

/**
 * Imports a Solana wallet from a secret key.
 * @param {string} secretKey - The secret key in base58 format.
 * @returns {Object} The imported wallet's public key and secret key.
 */
function importWallet(secretKey) {
    const decodedSecretKey = bs58.decode(secretKey);
    const keypair = Keypair.fromSecretKey(decodedSecretKey);
    return {
        publicKey: keypair.publicKey.toBase58(),
        secretKey: secretKey,
    };
}

/**
 * Encrypts the wallet's secret key using a passphrase.
 * @param {string} secretKey - The secret key in base58 format.
 * @param {string} passphrase - The passphrase used for encryption.
 * @returns {string} The encrypted secret key.
 */
function encryptSecretKey(secretKey, passphrase) {
    const key = nacl.hash(new TextEncoder().encode(passphrase));
    const nonce = nacl.randomBytes(24); // nonce should be unique for each encryption
    const secretKeyBytes = bs58.decode(secretKey);
    const encrypted = nacl.secretbox(secretKeyBytes, nonce, key);

    return {
        nonce: bs58.encode(nonce),
        encryptedSecretKey: bs58.encode(encrypted),
    };
}

/**
 * Validates the secret key format.
 * @param {string} secretKey - The secret key to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateSecretKey(secretKey) {
    try {
        const decoded = bs58.decode(secretKey);
        return decoded.length === 64; // Solana secret key is 64 bytes
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateWallet,
    importWallet,
    encryptSecretKey,
    validateSecretKey,
};
