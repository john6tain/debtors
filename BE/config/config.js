const path = require('path');

let dbName = 'debtors-production';

module.exports = {
    development: {
        connectionString: `mongodb://localhost:27017/${dbName}`
    },
    production: {
        connectionString:"mongodb://Admin:admin@ds153682.mlab.com:53682/debtors"
    }
};