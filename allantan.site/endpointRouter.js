const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

// init mongodb
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/';

router.all('/:id', (req, res, next) => {
  if(req.method === 'GET') {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('db connection error', err);
      } else {
        let dbase = db.db('hw3db');
        let collectionName = '';
        if(req.baseUrl === '/browsers') {
          collectionName = 'initialbrowserdata';
        } else if(req.baseUrl === '/storage') {
          collectionName = 'storageestimate';
        } else if(req.baseUrl === '/navtiming') {
          collectionName = 'navigationtiming';
        } else if(req.baseUrl === '/networkinfo') {
          collectionName = 'networkinformation';
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
  } else if(req.method === 'DELETE') {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('db connection error', err);
      } else {
        let dbase = db.db('hw3db');
        let collectionName = '';
        if(req.baseUrl === '/browsers') {
          collectionName = 'initialbrowserdata';
        } else if(req.baseUrl === '/storage') {
          collectionName = 'storageestimate';
        } else if(req.baseUrl === '/navtiming') {
          collectionName = 'navigationtiming';
        } else if(req.baseUrl === '/networkinfo') {
          collectionName = 'networkinformation';
        } else {
          collectionName = request.baseUrl.substr(1);
        }
        dbase.collection(collectionName).deleteOne({ "_id": ObjectId(req.params.id) }, (err, result) => {
          if(err) {
            res.status(404).end();
            console.log('delete error', err);
          } else {
            res.status(200).end();
          }
        });
      }
    });
  } else if(req.method === 'PUT') {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('db connection error', err);
      } else {
        let dbase = db.db('hw3db');
        let newVal = {
          $set: req.body.data,
        }
        dbase.collection(req.body.name.toLowerCase()).update(ObjectId(req.params.id), newVal, (err, result) => {
          if(err) {
            res.status(404).end();
            console.log('put error', err);
          } else {
            res.status(202).end();
          }
        });
      }
    });
  }
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
          collectionName = 'initialbrowserdata';
        } else if(request.baseUrl === '/storage') {
          collectionName = 'storageestimate';
        } else if(request.baseUrl === '/navtiming') {
          collectionName = 'navigationtiming';
        } else if(request.baseUrl === '/networkinfo') {
          collectionName = 'networkinformation';
        } else {
          collectionName = request.baseUrl.substr(1);
        }
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
        let collection = dbase.collection(obj.name.toLowerCase());
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
	}
});

module.exports = router;
