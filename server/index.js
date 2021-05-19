'use strict'
var isToken = require('./services/index')
var middlewareToken = require('./middlewares/auth')
var users = require('./data/data.users')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb', extended: false}))
app.use(cors())

app.post('/login', (req, res) => {
    let user = req.body.user
    let pass = req.body.pass
    let description = ''
    let resp = ''
    console.log('Este es el req: ' + JSON.stringify(req.body));

    if (!user) {
        description = 'El usuario es obligatorio'
    }

    if (!pass) {
        description = 'La contraselña es obligatoria'
    }

    if (description != '') {
        resp = {
            codeStatus: '300',
            status: 'Error',
            description: description
        }
        return res.send(resp)
    }

    for (const i in users.info) {
        if (Object.hasOwnProperty.call(users.info, i)) {
            const element = users.info[i];
            if (element.user != user || element.password != pass) {
                resp = {
                    codeStatus: '300',
                    status: 'Error',
                    description: 'El usuario o contraseña es incorrecto'
                }
                return res.send(resp)
            } else {
                console.log('Este es el element: ' + JSON.stringify(element));
                //return res.send(user)
                var token = isToken.generateToken(user);
                return res.send({
                    codeStatus: '200',
                    status: 'Exito',
                    token: token 
                });
            }
        }
    }



})

app.get('/token', (req, res) => {
    let authorization = req.body.authorization
    let resp = ''
    if (!authorization) {
        resp = {
            codeStatus: '300',
            status: 'Error',
            description: 'El token es obligatorio'
        }
        return res.send(resp)
    } else {
        let auth = middlewareToken.isAuth(authorization)
        if (auth != '200') {
            resp = {
                codeStatus: '400',
                status: 'Error',
                description: 'El token es invalido o ya expiro'
            }
            return res.send(resp)
        } else {
            return res.send({
                codeStatus: '200',
                status: 'Exito',
            });
        }
    }
})

app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`);
})