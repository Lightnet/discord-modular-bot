/*
    Name:
    Link:https://bitbucket.org/Lightnet/
    Created By: Lightnet
    License: Creative Commons Zero [Note there multiple Licenses]
    Please read the readme.txt file for more information.
*/
var express = require('express');
var router = express.Router();
/*
routes.get('/', function (req, res) {
   res.contentType('text/html');
   res.send('Hello World!');
   //res.send('<iframe src="https://discordapp.com/widget?id=&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>');
});
*/
router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});
router.get('/plugins', function (req, res) {
    res.render('plugins', { user: req.user });
});
router.get('/settings', function (req, res) {
    res.render('settings', { user: req.user });
});
router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});
/*
router.get('/test', function(req, res){
    res.render("test",{});
});
*/
module.exports = router;
