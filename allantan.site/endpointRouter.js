const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

// init mongodb
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/';

router.get('/:id', (req, res, next) => {
	MongoClient.connect(url, (err, db) => {
    if(err) {
      console.log('db connection error', err);
    } else {
      let dbase = db.db('hw3db');
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
        collectionName = request.baseUrl.substr(1);
      }
      let foundItem = dbase.collection(collectionName).find(ObjectId(req.params.id));
      if(foundItem) {
        foundItem.toArray((err, result) => {
          res.end(JSON.stringify(result[0]));
        });
      } else {
        res.statusCode(404).end();
      }
    }
  });
});

router.all('/', (request, response, next) => {
	if(request.method === 'GET') {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('DB error', err);
      } else {
        console.log('DB success');
        let dbase = db.db("hw3db");
        let collectionName = '';
        if(request.baseUrl === '/browsers') {
          collectionName = 'initialBrowserData';
        } else if(request.baseUrl === '/storage') {
          collectionName = 'storageEstimate';
        } else if(request.baseUrl === '/navtiming') {
          collectionName = 'navigationTiming';
        } else if(request.baseUrl === '/networkinfo') {
          collectionName = 'networkInformation';
        } else {
          collectionName = request.baseUrl.substr(1);
        }
        dbase.createCollection(collectionName, (err, res) => {
          if(err) {
            console.log('create collection error', err);
          }
        });
        let collection = dbase.collection(collectionName);
        collection.find().toArray((err, result) => {
          if(err) {
            console.log('toarr error', err);
          } else {
            response.end(JSON.stringify(result));
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
	} else if(request.method === 'POST') {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('DB error', err);
      } else {
        console.log('DB success');
        let dbase = db.db("hw3db");
        let obj = request.body;
        dbase.createCollection( obj.name, (err, res) => {
          if(err) {
            console.log('collection error', err);
          }
        });
        let collection = dbase.collection(obj.name);
        collection.insertOne(obj.data, (err, res) => {
          if(err) {
            console.log('insert error', err);
          } else {
            obj.data["_id"] = res.insertedId;
            response.end(JSON.stringify(obj.data));
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
	} else if(request.method === 'DELETE') {

	} else if(request.method === 'PUT') {

	}
});

module.exports = router;
