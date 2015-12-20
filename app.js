var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var routeBuilder = require("./GydoRouteBuilder/RouteBuilding/RouteBuilder");
var routeParameters = require("./GydoRouteBuilder/RouteParameters/RouteParameters");
var routeCoordinate = require("./GydoRouteBuilder/RouteParameters/RouteCoordinate");
app.use(bodyParser.json());

app.post('/routeParameters', function(req,res, next){
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
            res.send({errorMessgae : err.message});
        } else {
            res.send(route);
        }
    });
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
   console.log('Example app listening at http://%s:%s', host, port);
});