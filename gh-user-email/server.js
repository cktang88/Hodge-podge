const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs')

var makeurl = function (name) {
    var s = 'https://api.github.com/users/'+name;
    return s;
}
//find user email
// go to /users/ api page --> get as json
// go find their list of repos/events?
// go get their commit, find email there
var findemail = function (user) {
    var options = {
        url: makeurl(user),
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
        }
    }
    request(options, function (err, res, body) {
        if (err) {
            console.log(err);
            return;
        }
        // some websites send 200 codes to bots to fool bots
        if (res.statusCode !== 200) {
            console.log('res status code: ', res.statusCode);
            console.log(body);
            return;
        }
        var user = JSON.parse(body);
        /*
        fs.writeFile('data/data.json', body, function (err) {
            if (err)
                console.log(err);
            else
                console.log('successfully written to file.');
        });
        */
        console.log(user.email);

    });
}

function main() {
    findemail('GreenLantern101')
}
main()