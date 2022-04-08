const ObjectsToCsv = require('objects-to-csv')

const writeToCsv = async (licenseDetails) => {
    const csv = new ObjectsToCsv(licenseDetails);
    await csv.toDisk('./output_data/licenseDetails.csv');
    console.log('Writing to file complete.');
}

module.exports = writeToCsv;
