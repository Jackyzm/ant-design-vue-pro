const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./api');
const path = require('path');
const app = express();

const rootPath = 'dist';
app.use(express.static(rootPath));
app.use('index.html', function (req, res) {
    res.sendFile(path.resolve(rootPath, 'index.html'))
});

app.use(bodyParser.json());
app.use('/api', userRouter);

app.listen(9000, function () {
    console.log('Node app start at port 9000');
})
