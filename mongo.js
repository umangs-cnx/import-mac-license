const mongoose = require('mongoose');
const config = require('./config');

async function connectMongoDB() {
    try {
        mongoose.connect(
            config.DATABASE_URI,
             { },
            (err) => {
              if (err) {
                console.error("Connection failed to : " + config.DATABASE_URI);
                console.error("Error" + err);
                process.exit(1);
                return;
              }
              console.debug("Connected to " + config.DATABASE_URI);
            }
          );
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMongoDB;
