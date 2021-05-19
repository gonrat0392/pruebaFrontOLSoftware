'use-strict'

const jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = require('../data/data.secretKey');

var generateToken = function generateToken(user) {
    var payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add( 1, 'days').unix()
    }
    return jwt.encode(payload, secretKey.APIKEY);
}

module.exports = {
    generateToken: generateToken
}