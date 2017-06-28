const request = require('request');
const cheerio = require('cheerio');
const assert = require('assert');

let makeurl = name =>'https://api.github.com/users/' + name;
let log = console.log;
let fetch = (_url, callback) => {
	let options = {
		url: _url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
		}
	}
	request(options, (err, res, body) => {
		assert(!err);
		// some websites send 200 codes to bots to fool bots
		if (res.statusCode !== 200) {
			log('res status code: ', res.statusCode);
			log(body);
			return callback(null);
		}
		return callback(body);
	});
}
//find user email
let findemail = username => {
	// option1: try to get from /users/[username] page directly, most likely to fail
	fetch(makeurl(username), body => {
		var email = JSON.parse(body).email;
		log(email ?  email : 'Email for \'' + username + '\' could not be found via option #1.');
	});
	// option2: go to /users/[username]/events page to get events, then get commits, then get email
	fetch(makeurl(username) + '/events', body => {
		let pushevents = JSON.parse(body).filter(e=> e.type === 'PushEvent');
		let commits = pushevents[0].payload.commits;
		//gets latest commit, because previous commits may be by different contributors
		log(commits[commits.length - 1].author.email);
	});
}
// run
findemail('ddyy345');
