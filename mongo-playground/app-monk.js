// finally using Monk. Don't even need to bother w/ Mongoose...
// Connection 
const user = process.env.user;
const password = process.env.password;
const dbname = process.env.db_name;
const url = `mongodb://${user}:${password}@ds135382.mlab.com:35382/${dbname}`;

// haha for lazy people
const log = console.log;
const fs = require('fs');

const db = require('monk')(url);
log(`Connected to mongodb at ${url}`);
// collection
const col = db.get('bios-sample-data');
col.remove({}).then(() => {
	log('Collection cleared.');
	const arr = JSON.parse(fs.readFileSync('./bios-data.json', 'utf8'));
	return col.insert(arr);
}).then( col => {
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