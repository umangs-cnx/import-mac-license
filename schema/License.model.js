const mongoose = require('mongoose');

const License = new mongoose.Schema({
    licenseKeyHash: String,
    macAddressHash: String,
    encryptedLicenseKey: Buffer,
    encryptedMacAddress: Buffer,
    macAssigned: Boolean
});

module.exports = mongoose.model("License", License);
