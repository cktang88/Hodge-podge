// finally using Monk. Don't even need to bother w/ Mongoose...
// Why use Monk:
// 1. syntactic sugar (combines a lot of similar mongo default functions into more general functions)
// 2. works with promises
// 3. has plug-n-play middleware

'use strict'

// Connection 
const user = process.env.user;
const password = process.env.password;
const dbname = process.env.db_name;
const url = `mongodb://${user}:${password}@ds135382.mlab.com:35382/${dbname}`;

// haha for lazy people
const log = console.log;
const fs = require('fs');

let db = {};
require('monk')(url).then((adb) => {
	try {
		// drop db by connecting to underlying db instance
		adb._db.dropDatabase();
		console.log('DB dropped.');
		db = adb;
	} catch (e) {
		log(e);
	}
}).then(() => {
	log(`Connected to mongodb at ${url}`);
	// collection
	return db.get('bios-sample-data');
}).then(col => {
	col.remove({});
	return col;
}).then(col => {
	log('Collection cleared.');
	const arr = JSON.parse(fs.readFileSync('./bios-data.json', 'utf8'));
	return col.insert(arr);
}).then(col => {
	log(`Inserted ${col.length} docs into collection.`);
}).then(() => {
	db.close();
	log('db closed successfully.');
});
/*
users.index('name last')
users.insert({ name: 'Tobi', bigdata: {} })
users.find({ name: 'Loki' }, '-bigdata').then(function () {
  // exclude bigdata field
})
users.find({}, {sort: {name: 1}}).then(function () {
  // sorted by name field
})
users.remove({ name: 'Loki' })
*/