// do bare mongo first, use Monk later.

var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server");

	// lol callback hell --> TODO: use promises
	insertDocuments(db, function () {
		updateDocument(db, function () {
			deleteDocument(db, function () {
				findDocuments(db, function () {
					db.close();
				});
			});
		});
	});
});

var insertDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([{
		a: 1
	}, {
		a: 2
	}, {
		a: 3
	}], function (err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
}
var updateDocument = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Update document where a is 2, set b equal to 1
	collection.updateOne({
		a: 2
	}, {
		$set: {
			b: 1
		}
	}, function (err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Updated the document with the field a equal to 2");
		callback(result);
	});
}

var deleteDocument = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.deleteOne({
		a: 3
	}, function (err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});
}
var findDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function (err, docs) {
		assert.equal(err, null);
		assert.equal(2, docs.length);
		console.log("Found the following records");
		console.dir(docs);
		callback(docs);
	});
}

/*
// data from https://code.tutsplus.com/tutorials/getting-started-with-mongodb-part-1--net-22879
db.nettuts.insert({
	first: 'matthew',
	last: 'setter',
	dob: '21/04/1978',
	gender: 'm',
	hair_colour: 'brown',
	occupation: 'developer',
	nationality: 'australian'
});
db.nettuts.insert({
	first: 'james',
	last: 'caan',
	dob: '26/03/1940',
	gender: 'm',
	hair_colour: 'brown',
	occupation: 'actor',
	nationality: 'american'
});
db.nettuts.insert({
	first: 'arnold',
	last: 'schwarzenegger',
	dob: '03/06/1925',
	gender: 'm',
	hair_colour: 'brown',
	occupation: 'actor',
	nationality: 'american'
});
db.nettuts.insert({
	first: 'tony',
	last: 'curtis',
	dob: '21/04/1978',
	gender: 'm',
	hair_colour: 'brown',
	occupation: 'developer',
	nationality: 'american'
});
db.nettuts.insert({
	first: 'jamie lee',
	last: 'curtis',
	dob: '22/11/1958',
	gender: 'f',
	hair_colour: 'brown',
	occupation: 'actor',
	nationality: 'american'
});
db.nettuts.insert({
	first: 'michael',
	last: 'caine',
	dob: '14/03/1933',
	gender: 'm',
	hair_colour: 'brown',
	occupation: 'actor',
	nationality: 'english'
});
db.nettuts.insert({
	first: 'judi',
	last: 'dench',
	dob: '09/12/1934',
	gender: 'f',
	hair_colour: 'white',
	occupation: 'actress',
	nationality: 'english'
});

db.nettuts.find();
*/