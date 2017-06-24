// do bare mongo first, use Monk later.
const Promise = require('bluebird');
var mongo = require('mongodb');
// promisify
Promise.promisifyAll(mongo);

const MongoClient = mongo.MongoClient;
const assert = require('assert');


// Connection 
const user = process.env.user;
const password = process.env.password;
const dbname = process.env.db_name;
const url = `mongodb://${user}:${password}@ds135382.mlab.com:35382/${dbname}`;
console.log(url);

let db_inst = {};
// Use connect method to connect to the Server
MongoClient.connectAsync(url)
	.then((db) => {
		db_inst = db;
		//assert.equal(null, err);
		console.log(`Connected correctly to server at ${url}`);
		// clear database
		db.dropDatabase();
		console.log('Database cleared.');

		// Get the documents collection
		return db.collection('documents');
		// "col" = collection
	}).then((col) => {
		insertDocuments(col);
		console.log("Inserted 3 docs into 'documents' collection.");
		return col;
	})
	.then((col) => {
		updateDocument(col);
		console.log("Updated doc where a = 2.");
		return col;
	})
	.then((col) => {
		deleteDocument(col);
		console.log("Removed doc where a = 3.");
		return col;
	})
	.then((col) => {
		return findDocuments(col);
	})
	.then((docs) => {
		return docs.toArrayAsync();
	})
	.then((docs) => {
		console.log("Found the following records:");
		console.log(docs);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		db_inst.close();
		console.log('db closed successfully.');
	});

let insertDocuments = (col) => {
	// Insert some documents
	return col.insertManyAsync([{
		a: 1
	}, {
		a: 2
	}, {
		a: 3
	}]);
}
let updateDocument = (col) => {
	// Update document where a is 2, set b equal to 1
	return col.updateOneAsync({
		a: 2
	}, {
		$set: {
			b: 1
		}
	});
}

let deleteDocument = (col) => {
	// delete doc
	return col.deleteOneAsync({
		a: 3
	});
}
let findDocuments = (col) => {
	return col.findAsync({});
}