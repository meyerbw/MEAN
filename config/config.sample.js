// Rename this file to config.js and populate it with your values

var path = require('path')
    , rootPath = path.normalize(__dirname + '/..');


module.exports = {
    development: {
        defaultFromAddress: 'your email here',
        db: 'your mongo connection here',
        root: rootPath,
        app: {
            name: 'your application name'
        },
        keys: {
            postMark: 'Your API Key Here',
            google: {
                key: '',
                secret: '',
                callback: "http://localhost:3000/auth/google"
            }
        },
        logging: {
            logfile: 'site-log.txt'
        }
    }
};
