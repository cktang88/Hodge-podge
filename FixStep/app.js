var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    port = 8000;

var server = require('http').Server(app);

//dynamically loads all pages from /views
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


//dynamically loads all static files in /public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

var t = 30;
var url = 'https://www.youtube.com/watch';
url += '?v=WsptdUFthWI&autoplay=1&t=';

app.get('/', function(req, res) {
    console.log(url);
    res.render('index', {
        url: url,
        time: t
    });
});

app.listen(port, function() {
    console.log("Server started on port " + port + ", listening.");
});
