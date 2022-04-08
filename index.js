const License = require('./schema/License.model');
const decrypt = require('./decrypt');
const connectMongoDB = require('./mongo');

async function startImport () {
    try {
        console.log('Connecting to DB...');
        connectMongoDB();
        const licensesFound = await License.find({macAssigned: true});
        const licenseDetails = {};
        for (let license of licensesFound) {
            let { encryptedMacAddress, encryptedLicenseKey } = license;
            let macAddress = decrypt(encryptedMacAddress);
            let licenseKey = decrypt(encryptedLicenseKey);
            console.log(`macAddress: ${macAddress}, licenseKey: ${licenseKey}`);
            licenseDetails[macAddress] = license;
        }
        console.log(`Writing this to csv.${JSON.stringify(licenseDetails)}`);
        
    } catch (error) {
        console.log(error);
    }
}

console.log('Starting the script');
startImport();