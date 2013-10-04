// Rename this file to config.js and populate it with your values

var path = require('path')
    , rootPath = path.normalize(__dirname + '/..');


module.exports = {
    development: {
        defaultFromAddress: 'your email here',
        db: 'your mongo connection here',
        root: rootPath,
        keys: {
          postMark: 'Your API Key Here'
        },
        logging: {
            logfile: 'site-log.txt'
        }
    }
};