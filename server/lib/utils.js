var util = require('util');

exports.formatMongoConectionStrin = function (connection) {
    return util.format('mongodb://%s%s:%s%s',
        (connection.username && connection.password) && connection.username + ":" + connection.password + '@' || '',
        connection.host || 'localhost',
        connection.port || '27017',
        connection.db && '/' + connection.db || '');
}
