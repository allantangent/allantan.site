const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongodb = require('mongodb');

// init mongodb
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/hw3db';

router.get('/:id', (req, res, next) => {
	res.send('your id is: ' + req.params.id);
});

router.all('/', (req, res, next) => {
	if(req.method === 'GET') {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('DB error', err);
      } else {
        console.log('DB success');
        let collectionName = '';
        if(req.baseUrl === '/browsers') {
          collectionName = 'initialBrowserData';
        } else if(req.baseUrl === '/storage') {
          collectionName = 'storageEstimate';
        } else if(req.baseUrl === '/navtiming') {
          collectionName = 'navigationTiming';
        } else if(req.baseUrl === '/networkinfo') {
          collectionName = 'networkInformation';
        } else {
          collectionName = req.baseUrl.substr(1);
        }
        db.createCollection(collectionName, (err, res) => {
          if(err) {
            console.log('collection error', err);
          }
        });
        let collection = db.collection(collectionName);
        collection.find().toArray((err, result) => {
          if(err) {
            console.log('toarr error', err);
          } else {
            res.end(result);
          }
        });
      }
      db.close();
    });
    /* fake json db
		fs.readFile(__dirname + '/browserdb.json', 'utf8', (err, data) => {
			data = JSON.parse(data);
			res.end(JSON.stringify(data["browsers"]));
    });
    */
	} else if(req.method === 'POST') {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('DB error', err);
      } else {
        console.log('DB success');
        let obj = req.body;
        db.createCollection( obj.name, (err, res) => {
          if(err) {
            console.log('collection error', err);
          }
        });
        let collection = db.collection(obj.name);
        collection.insertOne(obj.data, (err, res) => {
          if(err) {
            console.log('insert error', err);
          } else {
            obj.data["_id"] = res.insertedId;
            res.end(JSON.stringify(obj.data));
          }
        });
      }
      db.close();
    });
    /* fake json db
		fs.readFile(__dirname + '/browserdb.json', 'utf8', (err, data) => {
			data = JSON.parse(data);
			req.body["id"] = data["browsers"].length + 1;
      data["browsers"].push(req.body);
      fs.writeFile(__dirname + '/browserdb.json', JSON.stringify(data));
			res.end(JSON.stringify(req.body));
    });
    */
	} else if(req.method === 'DELETE') {

	} else if(req.method === 'PUT') {

	}
});

module.exports = router;
