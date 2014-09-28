var express = require('express');
var app = express();

app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

metacrawlers = [
    'facebook',
    'facebot',
    'twitterbot'
];

indexcrawlers = [
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

function renderMetaReport(req, res) {
    var query = new Parse.Query('report');
    query.include('category');
    var callback = {
        success: function (result) {
            res.render('report_meta', {
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
    if (isCrawled(req, metacrawlers)) {
        renderMetaReport(req, res);
        return;
    }
    res.render('index', '');
});

app.get('/:section', function (req, res) {
    res.render('index', '');
});

app.get('/', function (req, res) {
    if (isCrawled(req, indexcrawlers)) {
        renderStaticIndex(req, res);
        return;
    }
    res.render('index', '');
});


app.listen();