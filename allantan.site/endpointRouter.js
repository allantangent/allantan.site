const express = require('express');
const router = express.Router();
const fs = require('fs');

//const browsers;

router.get('/:id', (req, res, next) => {
	res.send('your id is: ' + req.params.id);
});

router.all('/', (req, res, next) => {
	if(req.method === 'GET') {
    /* fake json db
		fs.readFile(__dirname + '/browserdb.json', 'utf8', (err, data) => {
			data = JSON.parse(data);
			res.end(JSON.stringify(data["browsers"]));
    });
    */
	} else if(req.method === 'POST') {
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
