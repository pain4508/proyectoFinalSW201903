/* Framework que permite configurar las respuestas del server*/

var express = require('express');

/*Objeto que permite declarar las rutas que se van a manejar, en el web server*/

var router = express.Router();

/*
HTTP    |  Router method    |
---------------------------- --------
GET     |  router.get       | Consulta
POST    |  router.post      | Nuevo
PUT     |  router.put       | Actualizar
DELETE  |  router.delete    | Borrar
 */


 router.post('/login', function (req, res, next){
    var _userData = req.body;
    console.log(_userData);
    res.json({"msg":"ok"});
 }); // post new

 router.get('/logout', function (req, res, next){
     var _userData= req.body;
     req.session.logged = false;
     req.session.loggeduser = null;
     res.json({"msg":"ok"});
 }); // post login

 router.get('/session', function (req, res, next){
    res.json({"active": req.session.logged && true});
}); // post login

module.exports = router;