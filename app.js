var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var routeBuilder = require("./GydoRouteBuilder/RouteBuilding/RouteBuilder");
var routeParameters = require("./GydoRouteBuilder/RouteParameters/RouteParameters");
var routeCoordinate = require("./GydoRouteBuilder/RouteParameters/RouteCoordinate");
app.use(bodyParser.json());

app.post('/routeParameters', function(req,res, next){
    console.log(req.body);
    var distance = req.body.distance;
    var startCoord = req.body.startCoordinate;
    var secondCoord = req.body.secondCoordinate;
    var endCoord = req.body.endCoordinate;
    var startCoordinate = new routeCoordinate.RouteCoordinate(startCoord.lat, startCoord.lon);
    var secondCoordinate = new routeCoordinate.RouteCoordinate(secondCoord.lat, secondCoord.lon);
    var endCoordinate = new routeCoordinate.RouteCoordinate(endCoord.lat, endCoord.lon);

    var newRouteParameters = new routeParameters.RouteParameters(startCoordinate, secondCoordinate, endCoordinate, distance);
    var newRouteBuilder = new routeBuilder.RouteBuilder(newRouteParameters);
    newRouteBuilder.buildRoute(function(err, route){
        if (err) {

            res.send({
                message : err.message,
                code : err.code
            });
        } else {
            res.send(route);
        }
    });
});

app.post('/coordinate', function(req, res, next){

});


app.use(function(req,res,next){
   var error = new Error("Not Found");
   err.status = 404;
    next(err);
});

app.use(function(err, req, res){
    res.status(err.status || 500);
   res.send(err);
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
   console.log('App listening at http://%s:%s', host, port);
});