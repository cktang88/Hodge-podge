'use strict'
const rp = require('request-promise'); // uses bluebird promises
const assert = require('assert');

let makeurl = name => 'https://api.github.com/users/' + name;
let log = console.log;
let fetch = _url => {
	let options = {
		url: _url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
		},
		json: true //autoparse JSON
	}
	return rp(options)
		.then(body => {
			return body;
		})
		.catch(err => log(err.message));
}
//find user email
let findemail = username => {
	// option1: try to get from /users/[username] page directly, most likely to fail
	fetch(makeurl(username)).then(user => {
		log(user.email);
	}).catch(e => log("Error."))
	// option2: go to /users/[username]/events page to get events, then get commits, then get email
	fetch(makeurl(username) + '/events').then(events => {
		let pushevents = events.filter(e => e.type === 'PushEvent');
		let commits = pushevents[0].payload.commits;
		//gets latest commit, because previous commits may be by different contributors
		log(commits[commits.length - 1].author.email);
	}).catch(e => log("Error."))
}
// run
findemail('ddyy345');