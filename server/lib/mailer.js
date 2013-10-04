var jade = require('jade')
    , postMark = require('postmark')
    , fs = require('fs')
    , path = require('path');


var Mailer = function(opts) {
    this.options = {};
    this.templates = {};

    if(arguments.length === 1)
        this.options = opts;
};

Mailer.prototype.set = function (key, value) {
    if (arguments.length == 1)
        return this.options[key];
    this.options[key] = value;
    return this;
};
Mailer.prototype.get = Mailer.prototype.set;

/// mailer.template('forgotPassword', ''
Mailer.prototype.template = function(name, path) {
    var tempalteName = name.substr(0, name.lastIndexOf('.'));

    var self = this;
    //compile method
    fs.readFile(path, function(error, data) {
        //TODO: Add error handling
        return self.templates[tempalteName] = jade.compile(data.toString());
    });
};

Mailer.prototype.configPostmark = function() {
    var apiKey = this.get('apiKey');
    if(!apiKey)
        throw new Error("Postmark API key is not defined.");

    this.connection = postMark(apiKey);
}


Mailer.prototype.send = function(template, addresses, subject, data, callback) {
    if(!this.connection)
        this.configPostmark();

    if(!addresses.from && !this.get('defaultFrom'))
        throw new error("");

    this.connection.send({
        "From": addresses.from || this.get('defaultFrom'),
        "To": addresses.to,
        "Bcc": addresses.bcc,
        "Subject": subject,
        "HtmlBody": this.templates[template](data)
    }, function(error) {
        if(error) return callback(error);
        callback();
    });

};

var mailer = module.exports = exports = new Mailer;