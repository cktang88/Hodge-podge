const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs')

var makeurl = function (name) {
    var s = 'https://api.github.com/users/' + name;
    return s;
}
var fetch = function (_url, callback) {
    var options = {
        url: _url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
        }
    }
    request(options, function (err, res, body) {
        if (err) {
            console.log(err);
            return callback(null);
        }
        // some websites send 200 codes to bots to fool bots
        if (res.statusCode !== 200) {
            console.log('res status code: ', res.statusCode);
            console.log(body);
            return callback(null);
        }
        return callback(body);
    });
}
//find user email
var findemail = function (username) {

    // option1: try to get from /users/[username] page directly, most likely to fail
    fetch(makeurl(username), function (body) {
        var user = JSON.parse(body);
        if (user.email) {
            console.log(user.email);
            return;
        }
        //default
        console.log('Email for \'' + username + '\' could not be found via option #1.');
    });

    // option2: go to /users/[username]/events page to get events, then get commits, then get email
    fetch(makeurl(username) + '/events', function(body){
        var events = JSON.parse(body);
        var pushevents = [];
        console.log(events.length + ' events found.');
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            if (e.type === 'PushEvent')
                pushevents.push(e);
        }
        console.log(pushevents.length);
        /*
        fs.writeFile('data/data.json', events, function (err) {
            if (err)
                console.log(err);
            else
                console.log('successfully written to file.');
        });
        */
        //console.log(events);
    });
}

function main() {
    findemail('sindresorhus');
}
main()