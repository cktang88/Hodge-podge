// finally using Monk. Don't even need to bother w/ Mongoose...

const db = require('monk')('localhost/mydb')
// or
// const db = require('monk')('user:pass@localhost:port/mydb')

const users = db.get('users')

users.index('name last')
users.insert({ name: 'Tobi', bigdata: {} })
users.find({ name: 'Loki' }, '-bigdata').then(function () {
  // exclude bigdata field
})
users.find({}, {sort: {name: 1}}).then(function () {
  // sorted by name field
})
users.remove({ name: 'Loki' })

db.close()