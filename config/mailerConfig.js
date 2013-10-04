var fs =  require('fs');

module.exports = function(mailer, config) {

    //config Mailer
    mailer.set('apiKey', config.keys.postMark);
    mailer.set('defaultFrom', config.defaultFromAddress);
    //setup mailer templates
    var templates_path = config.root + '/server/views/emails';
    fs.readdirSync(templates_path).forEach(function (file) {
        if (~file.indexOf('.jade')) mailer.template(file, templates_path + '/' + file);
    });

};