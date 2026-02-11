const axios = require('axios');
const FormData = require('form-data');

// Load API keys from environment variables for security
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

/**
 * Upload a file to IPFS via Pinata
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The IPFS URL of the uploaded file
 */
async function uploadToIPFS(file) {
    const form = new FormData();
    form.append('file', file);

    const response = await axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, form, {
        maxContentLength: 'Infinity', // Allow large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
        },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
}

/**
 * Store metadata about the uploaded file
 * @param {string} ipfsHash - The IPFS hash of the uploaded file
 * @param {object} metadata - The metadata to store
 * @returns {Promise<void>}
 */
async function storeMetadata(ipfsHash, metadata) {
    const response = await axios.post(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, {
        ipfsHash,
        metadata,
    }, {
        headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
        },
    });
    
    return response.data;
}

module.exports = {
    uploadToIPFS,
    storeMetadata,
};
