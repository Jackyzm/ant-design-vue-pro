const express = require('express');
const Router = express.Router();
const mockjs = require('mockjs');

const notices = require('./api.notices.json');
const charts = require('./chart');
const userCurrent = require('./api.userCurrent.json');
const projectNotice = require('./getData').getNotice;
const getActivities = require('./getData').getActivities;
const getFakeList = require('./getData').getFakeList;
const getRule = require('./rule').getRule;
const putRule = require('./rule').putRule;
const deleteRule = require('./rule').deleteRule;
const getProfileBasicData = require('./profile').getProfileBasicData;
const getProfileAdvancedData = require('./profile').getProfileAdvancedData;

// post 获取参数 console.log(req.body);
// get 获取参数 console.log(req.query);

Router.get('/notices', function(req, res) {
    return res.json(notices);
});

Router.get('/charts', function(req, res) {
    return res.json(charts);
});

Router.get('/userCurrent', function(req, res) {
    return res.json(userCurrent);
});

Router.get('/tags', function(req, res) {
    const list = mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    })
    return res.json(list);
});

Router.get('/project/notice', function(req, res) {
    return res.json(projectNotice);
});

Router.get('/activities', function(req, res) {
    return res.json(getActivities);
});

Router.post('/form-basic', function(req, res) {
    return res.json({"code":200, "success":true, "data": null});
});

Router.get('/table-list', function(req, res) {
    return res.json(getRule(req.query));
});

Router.put('/table-list-put', function(req, res) {
    return res.json(putRule(req.body));
});

Router.post('/table-list-delete', function(req, res) {
    return res.json(deleteRule(req.body));
});

Router.get('/fake-list', function(req, res) {
    return res.json(getFakeList(req.query));
});

Router.get('/profile/basic', function(req, res) {
    return res.json(getProfileBasicData);
});

Router.get('/profile/advanced', function(req, res) {
    return res.json(getProfileAdvancedData);
});

Router.get('/401', function(req, res) {
    return res.status(401).send('Sorry!');
});

Router.get('/403', function(req, res) {
    return res.status(403).send('Sorry, 403 Forbidden!');
});

Router.get('/404', function(req, res) {
    return res.status(404).send('Sorry, 404 Not found!');
});

Router.get('/500', function(req, res) {
    return res.status(500).send({ error: 'something blew up' });
});

module.exports = Router;
