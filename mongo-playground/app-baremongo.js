// do bare mongo first, use Monk later.

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Promise = require('bluebird');

// Connection 
const user = process.env.user;
const password = process.env.password;
const dbname = process.env.db_name;
const url = `mongodb://${user}:${password}@ds135382.mlab.com:35382/${dbname}`;
console.log(url);
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
	assert.equal(null, err);
	console.log(`Connected correctly to server at ${url}`);
	// clear database
	db.dropDatabase();
	console.log('Database cleared.');

	// lol callback hell --> TODO: use promises
	insertDocuments(db, () => {
		updateDocument(db, () => {
			deleteDocument(db, () => {
				findDocuments(db, () => {
					db.close();
				});
			});
		});
	});
});

let insertDocuments = (db, callback) => {
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
let updateDocument = (db, callback) => {
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

let deleteDocument = (db, callback) => {
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
let findDocuments = (db, callback) => {
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