
module.exports = function(winston, config) {
    if(config && config.logging && config.logging.logfile)
        winston.add(winston.transports.File, { filename: config.logging.logfile});
};