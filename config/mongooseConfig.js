var fs =  require('fs');

module.exports = function(mongoose, config) {

//bootstrap mongoose
    mongoose.connect(config.db);

// Bootstrap models
    var models_path = config.root + '/server/models';
    fs.readdirSync(models_path).forEach(function (file) {
        if (~file.indexOf('.js')) require(models_path + '/' + file);
    });

};