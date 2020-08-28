const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

// init mongodb
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/';

router.all('/:id', (req, res, next) => {
  try {
    ObjectId(req.params.id)
  } catch(err) {
    res.status(404).end('404 error. Try again.');
    return;
  }
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
          collectionName = req.baseUrl.substr(1);
        }
        dbase.collection(collectionName).findOne( { "_id": ObjectId(req.params.id) }, (err, result) => {
          if(err || result == null) {
            res.status(404).end('404 error. Try again.');
            console.log('get error', err);
          } else {
            res.status(200);
            res.json(result);
          }
        });
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
          collectionName = req.baseUrl.substr(1);
        }
        dbase.collection(collectionName).findOneAndDelete({ "_id": ObjectId(req.params.id) }, (err, result) => {
          if(err) {
            res.status(404).end('404 error. Try again.');
            console.log('delete error', err);
          } else {
            res.status(200);
            res.json(result.value);
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
          $set: {}
        };
        if(typeof req.body.data === 'object') {
          for(let prop in req.body.data) {
            newVal.$set[prop] = req.body.data[prop];
          }
        } else {
          for(let prop in req.body.data) {
            newVal.$set[prop] = req.body[prop];
          }
          delete newVal.metricName;
        }
        if(req.body.vitalsScore != null) {
          newVal.$set.vitalsScore = req.body.vitalsScore;
        } else {
          delete newVal.vitalsScore;
        }
        let options = {
          returnOriginal: false
        }
        dbase.collection(req.body.metricName.toLowerCase()).findOneAndUpdate( {"_id": ObjectId(req.params.id) }, 
        newVal, options, (err, result) => {
          if(err) {
            res.status(404).end('404 error. Try again.');
            console.log('put error', err);
          } else {
            res.status(202);
            res.json(result.value);
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
            response.json(result);
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
        let dbase = db.db("hw3db");
        let obj = request.body;
        let collection = dbase.collection(obj.metricName.toLowerCase());
        let insertedData = {};
        if(typeof obj.data === 'object') {
          for(let prop in obj.data) {
            insertedData[prop] = obj.data[prop];
          }
        } else {
          for(let prop in obj) {
            insertedData[prop] = obj[prop];
          }
          delete insertedData.metricName;
        }
        if(obj.vitalsScore != null) {
          insertedData.vitalsScore = obj.vitalsScore;
        } else {
          delete insertedData.vitalsScore;
        }
        collection.insertOne(insertedData, (err, res) => {
          if(err) {
            console.log('insert error', err);
          } else {
            obj.data["_id"] = res.insertedId;
            response.json(obj.data);
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
