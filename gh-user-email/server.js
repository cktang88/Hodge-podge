//Find Github user email. Zero dependencies.
'use strict';
const fetch = (domain, path) => new Promise((resolve, reject) => {
  // adapted from https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
  const options = {
    hostname: domain,
    path: path,
    headers: {'User-Agent': 'asdf'}
  }
  const request = require('https').get(options, (response) => {
    // handle http errors
    if (response.statusCode != 200)
      reject(new Error('Failed to load page, status code: ' + response.statusCode));
    const body = []; // temporary data holder
    response.on('data', chunk => body.push(chunk)); //concat chunks
    response.on('end', () => resolve(JSON.parse(body.join('')))); // return parsed json
  });
  // handle connection errors of the request
  request.on('error', err => reject(err))
});
(username => {
  const gh = 'api.github.com';
  const log = console.log;
  // option1: try to get from /users/[username] page directly, most likely to fail
  fetch(gh, '/users')
    .then(user => log(user.email))
    .catch(err => log(err))
  // option2: go to /users/[username]/events page to get events, then get commits, then get email
  fetch(gh, '/users/' + username + '/events')
    .then(events => {
      const pushevents = events.filter(e => e.type === 'PushEvent');
      const commits = pushevents[0].payload.commits;
      //gets latest commit, because previous commits may be by different contributors
      log(commits[commits.length - 1].author.email);
    })
    .catch(err => log(err))
})('jlevy');