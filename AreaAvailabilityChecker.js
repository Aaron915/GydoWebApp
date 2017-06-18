

var chicagoBounds = {
    lower: 41.6175,
    upper: 42.0819,
    left: -88.0087,
    right: -87.3633
};

var columbusBounds = {
    lower: 39.8671,
    upper: 40.1253,
    left: -83.1672,
    right: -82.8088
};

var austinBouds = {
    lower: 30.1778,
    upper: 30.4062,
    left: -97.9075,
    right: -97.5504
};

var areas = [
    chicagoBounds,
    columbusBounds,
    austinBouds,
];

coordinateIsNearRoute = function(coordinate) {
    var isInArea = false;
    areas.forEach(function (area) {
        if (!isInArea) {
            var latValid = coordinate.longitude > area.left && coordinate.longitude < area.right;
            var lonValid = coordinate.latitude > area.lower && coordinate.latitude < area.upper;
            isInArea = latValid && lonValid;
        }
    });
    return isInArea;
};

module.exports.coordinateIsNearRoute = coordinateIsNearRoute;
