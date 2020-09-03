const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const helmet = require('helmet');
const mongodb = require('mongodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.options('*', function(req, res) {
	res.send(200);
});

// init mongodb
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
MongoClient.connect(url, (err, db) => {
  if(err) {
    console.log('db connection error', err);
  } else {
    let dbase = db.db('hw3db');
    dbase.createCollection('initialbrowserdata', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('storageestimate', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('dataconsumption', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('fp', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('fcp', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('fid', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('lcp', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('lcpfinal', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('cls', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('clsfinal', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('tbt', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('navigationtiming', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('networkinformation', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
    dbase.createCollection('errors', (err, res) => {
      if(err) {
        console.log('create collection error', err);
      }
    });
  }
  db.close();
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

