//Find Github user email. Zero dependencies.
'use strict';
const fetch = (hostname, path) => new Promise((resolve, reject) => {
    const options = { hostname, path, headers: { 'User-Agent': '' } }
    const request = require('https').get(options, response => {
        if (response.statusCode != 200)
            reject(new Error('Failed to load page, status code: ' + response.statusCode));
        const body = []; // temporary data holder
        response.on('data', c => body.push(c)); //concat chunks
        response.on('end', () => resolve(JSON.parse(body.join('')))); // return parsed json
    });
    // handle connection errors of the request
    request.on('error', reject)
});
(async () => {
    const username = 'achrysaetos';
    const gh = 'api.github.com';
    const log = console.log;
    const emailCnts = {}
    const addEmail = e => emailCnts[e] ? emailCnts[e] += 1 : emailCnts[e] = 1
    const extract = ({ author, committer }) => {
        author && addEmail(author.email);
        committer && addEmail(committer.email);
    }
    // option1: try to get from /users/[username] page directly, most likely to fail
    log((await fetch(gh, `/users/${username}`)).email)

    // option2: go to /users/[username]/events page to get events, then get commits, then get email
    const events = await fetch(gh, `/users/${username}/events`)
    const pushevents = events.filter(e => e.type === 'PushEvent');
    pushevents[0] ? extract(pushevents[0].payload.commits.pop()) : log('no push events found') // get email from latest commit of latest push

    // option3: see repo commits
    const repos = (await fetch(gh, `/users/${username}/repos`)).slice(0, 3) // get first 3 repos
    await Promise.all(repos.map(async ({ name }) => {
        console.log(`/repos/${username}/${name}/commits`)
        const data = await fetch(gh, `/repos/${username}/${name}/commits`)
        data.forEach(({ commit }) => commit && extract(commit))
    }))
    log(Object.keys(emailCnts).sort((a,b) => emailCnts[b] - emailCnts[a]).map(k => k + ": " + emailCnts[k]))
})();
