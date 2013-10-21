var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto');


    var UserSchema = new Schema({
        displayName: {type: String, default: ''},
        email: { type: String, default: '' },
        forgotPasswordHash: { type: String, default: '' },
        forgotPasswordExpiration: {type: Date},
        hashed_password: { type: String, default: '' },
        salt: { type: String, default: '' },
        providers: [
            {
                provider: {type: String, default: ''},
                id: {type: String, default: ''},
                profile: {type: String, default: ''}
            }
        ]
    });

    UserSchema
        .virtual('password')
        .set(function (password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
        })
        .get(function () {
            return this._password;
        });

    UserSchema.methods = {
        authenticate: function (plainText) {
            return this.encryptPassword(plainText) === this.hashed_password
        },
        makeSalt: function () {
            return Math.round((new Date().valueOf() * Math.random())) + '';
        },
        encryptPassword: function (password) {
            if (!password) return '';

            try {
                return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
            } catch (err) {
                return '';
            }
        }
    };

    UserSchema.statics.findAndSetForgotPassword = function (resetPassword, callback) {
        this.findOne({email: resetPassword.email}, function findUserCallback (error, foundUser) {

            if(error)
                return callback(error, false, false);

            if(!foundUser)
                return callback('Could not find User', false, false);

            foundUser.forgotPasswordExpiration = Date.now();
            var userJSON = JSON.stringify(foundUser);
            var hash = crypto.createHash('md5').update(userJSON).digest('hex');
            foundUser.forgotPasswordHash = hash;

            foundUser.save(function saveUserCallback(error) {
                if(error) return callback(error, false);

                callback(null, true, foundUser);
            });

        });
    };

    UserSchema.statics.findAndSetPassword = function (setPassword, callback) {

        this.findOne({forgotPasswordHash: setPassword.forgotPasswordHash}, function findUserCallback(error, foundUser) {
            if (error)
                return callback(error, false, null);

            if(!foundUser)
                return callback('Could not find User', false, false);

            foundUser.password = setPassword.password;
            foundUser.forgotPasswordExpiration = null;
            foundUser.forgotPasswordHash = null;

            foundUser.save(function saveUserCallback(error) {
                if (error)
                    return callback(error, false, null);

                callback(null, true, foundUser);
            });
        });
    };

    UserSchema.statics.findAndAuthenticate = function (creds, callback) {

        this.findOne({email: creds.email}, function findUserCallback(error, foundUser){
            if(error)
                return callback(error, false, false);

            if(!foundUser)
                return callback('Could not find User', false, false);

            if(!foundUser.authenticate(creds.password))
                return callback('Password Inncorrect', true, false, foundUser);

            return callback(null, true, true, foundUser);
        });
    };

mongoose.model('User', UserSchema);
