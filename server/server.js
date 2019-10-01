const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./api');
const path = require('path');
const app = express();

//allow custom header and CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
    );

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

const rootPath = './dist';
app.use(express.static(rootPath));
app.use('index.html', function(req, res) {
    res.sendFile(path.resolve(rootPath, 'index.html'));
});

app.use(bodyParser.json());
app.use('/api', userRouter);

app.listen(8080, function() {
    console.log('Node app start at port 8080');
});
