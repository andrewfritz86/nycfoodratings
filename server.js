var express = require("express");
var mustache = require("mustache");
var fs = require("fs");
var bodyParser = require('body-parser');
var request = require("request");

var app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req,res){
    res.send("sup");
})

app.get('/template', function(req,res){
    var template = fs.readFileSync("./public/template.html", "utf8");
    var html = mustache.render(template, {title: "lol", subheader: "heheh"})
    res.send(html);
})

app.get('/data/:query', function(req,res){

    console.log(req.params.query);
    var boro = req.params.query;
    testing(boro, res);
})

app.post('/demo', function(req,res){
    var postData = req.body.testing;
    console.log(req.body)
    res.redirect('/data/' + postData);
})

function testing(boro, expressResponse){
    request("https://data.cityofnewyork.us/resource/xx67-kt59.json", function(err,res,body){
        var parsed = JSON.parse(body);
        console.log(parsed);
        var template = fs.readFileSync("./public/return.html","utf8");
        var render = mustache.render(template, {name: parsed[0].dba, score: parsed[0].score});
        expressResponse.send(render);
    })
}


    var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log(" app is litening on port " + port)
})