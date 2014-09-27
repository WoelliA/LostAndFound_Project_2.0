var express = require('express');
var app = express();

app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

function renderReport_facebook(req, res) {
    var query = new Parse.Query('report');
    query.include('category');
    var callback = {
        success: function (result) {
            res.render('report_facebook', {
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

crawlers = [
    'facebook',
    'facebot',
    'googlebot',
    'bingbot'
];

function isCrawled(request) {
    var userAgent = request.get('user-agent');
    for (var i = 0; i < crawlers.length; i++) {
        var bot = crawlers[i];
        if (userAgent.indexOf(bot) >= 0) {
            return true;
        }
    }
    return false;
};

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/report/:id', function (req, res) {
    var userAgent = req.headers['user-agent'];
    if (isCrawled(req)) {
        renderReport_facebook(req, res);
        return;
    }
    res.render('index', '');
    //res.render('index');
});

app.get('/:section', function (req, res) {
    res.render('index', '');
});

app.get('/', function (req, res) {
    res.render('index', '');
});

// This line is required to make Express respond to http requests.
app.listen();