var jsonServer = require('json-server');

var server = jsonServer.create();

server.use(jsonServer.defaults());

server.get('/custom', function(req, res) { res.json({ msg: 'hello' }) });

var router = jsonServer.router('db.json');

server.use(router);

server.listen(3000);
