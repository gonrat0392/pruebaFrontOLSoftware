var jwt = require('jwt-simple');
var moment  = require('moment');
var secretKey = require('../data/data.secretKey');

var isAuth = function isAuth(req) {
    console.log('Este es el req: ' + req);
    const token = req;
    console.log('Este es el token' + token);
    const payload = jwt.decode(token, secretKey.APIKEY, function (error) {
        console.error();
    });
    let response = '';
    if (payload.exp <= moment().unix()) {
        response = '401';
        return response
    }
    req.user = payload.sub;
    response = '200';
    return response
}

module.exports = {
    isAuth: isAuth
}