const License = require('./schema/License.model');
const decrypt = require('./decrypt');
const { connectMongoDB, disconnectMongoDB } = require('./mongo');
const writeToCsv = require('./writeToCsv');

async function startImport () {
    try {
        await connectMongoDB();
        const licensesFound = await License.find({macAssigned: true});
        const licenseDetails = [];
        for (let license of licensesFound) {
            let { encryptedMacAddress, encryptedLicenseKey } = license;
            let macAddress = decrypt(encryptedMacAddress);
            let licenseKey = decrypt(encryptedLicenseKey);
            let entry = {
                'macAddress': macAddress,
                'licenseKey': licenseKey
            };
            licenseDetails.push(entry);
            console.log(`macAddress: ${macAddress}, licenseKey: ${licenseKey}`);
            
        }
        console.log('Writing csv data to file stored in ./output-data/licenseDetails.csv');
        await writeToCsv(licenseDetails);
        disconnectMongoDB();
    } catch (error) {
        console.log(error);
    }
}

console.log('Starting the script');
startImport();