var express = require('express');
var app = express();

require('cloud/cities')(app);

app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

crawlers = [
    'facebook',
    'facebot',
    'twitterbot',
    'googlebot',
    'bingbot'
];


function isCrawled(request, crawlers) {
    var userAgent = request.get('user-agent').toLowerCase();
    for (var i = 0; i < crawlers.length; i++) {
        var bot = crawlers[i];
        if (userAgent.indexOf(bot) >= 0) {
            console.log("is getting crawled by " + bot);
            return true;
        }
    }
    return false;
};

app.isCrawled = function(request) {
    return isCrawled(request, crawlers);
};

function renderStaticReport(req, res) {
    var query = new Parse.Query('report');
    query.include('category');
    var callback = {
        success: function (result) {
            res.render('static_report', {
                report: JSON.stringify(result),
                category: JSON.stringify(result.get('category')),
                host: req.host
            });
        },
        error: function (error) {
            console.error(JSON.stringify(error));
        }
    };
    query.get(req.params.id, callback);
};


function renderStaticIndex(request, response) {
    var query = new Parse.Query('report');
    query.descending('createdAt');
    var callback = {
        success: function (result) {
            console.log(result);
            var param = {
                reports: JSON.stringify(result),
                host: request.host
            };
            response.render('static_index', param);
        }
    }
    query.find(callback);
};


app.get('/report/:id', function (req, res) {
    if (isCrawled(req, crawlers)) {
        renderStaticReport(req, res);
        return;
    }
    res.render('index', '');
});

app.get('/:section', function (req, res) {
    res.render('index', '');
});

app.get('/', function (req, res) {
    if (isCrawled(req, crawlers)) {
        renderStaticIndex(req, res);
        return;
    }
    res.render('index');
});

app.listen();