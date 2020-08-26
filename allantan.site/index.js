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
const endpointRoutes = require('./endpointRouter');
app.use('/browsers', endpointRoutes);
app.use('/storage', endpointRoutes);
app.use('/dataconsumption', endpointRoutes);
app.use('/fp', endpointRoutes);
app.use('/fcp', endpointRoutes);
app.use('/fid', endpointRoutes);
app.use('/lcp', endpointRoutes);
app.use('/lcpfinal', endpointRoutes);
app.use('/cls', endpointRoutes);
app.use('/clsfinal', endpointRoutes);
app.use('/tbt', endpointRoutes);
app.use('/navtiming', endpointRoutes);
app.use('/networkinfo', endpointRoutes);
app.use('/errors', endpointRoutes);

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Node Endpoints working :)');
});

module.exports = server;

