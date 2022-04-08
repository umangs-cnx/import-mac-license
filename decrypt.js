// import { deserialize } from 'v8';
const { deserialize } = require('v8');
const { decryptBigBuffer } = require("node-buffer-crypto");
const config = require('./config');
const PRIVATE_KEY = config.PRIVATE_KEY;

const decrypt = (encryptedData) => (
    deserialize(
        decryptBigBuffer(
            PRIVATE_KEY,
            encryptedData
        )
    )
)

module.exports = decrypt;
