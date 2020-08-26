const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.options('*', function(req, res) {
	res.send(200);
});

// endpoints
app.get('/:id', (req, res) => {
	res.send('your id is: ' + req.params.id);
});
app.all('/', (req,res) => {
	if(req.method === 'GET') {

	} else if(req.method === 'POST') {

	} else if(req.method === 'DELETE') {

	} else if(req.method === 'PUT') {

	}
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Node Endpoints working :)');
});

module.exports = server;

