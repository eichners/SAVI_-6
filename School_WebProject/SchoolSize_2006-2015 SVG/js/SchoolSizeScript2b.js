// FINAL PROJECT SCHOOL SIZE CHANGES: 2006 - 2015 MAP
// BASED ON CLASS 12: EXAMPLE WTIH ANNOTATION
// D3.js PIE CHART and LEAFLET and BOOTSTRAP

// Goal: to create map showing growth and decline of public and charter schools over the last ten years
// - separate and show data for charters and public 
// - use different colors for different types, 
// - and different colors for growth or decline. 
// - create slider to show change from 2006 - 2015
// colors: 
// Charters: blue; growth dark blue
// public: red; growth: dark red, decline: orange


// How do I attach styles to one marker that is affected by each of the following properties: school type, year, growth or decline 
// also how do I plot the data for each year....

// start by attaching markers to growth/decline number for each school. make color change for negative numbers to start



// Cartodb map below
// var map = L.map('map').setView([40.65,-73.93], 14);

// // set a tile layer to be CartoDB tiles 
// var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
//   attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
// });


// // add these tiles to our map
// map.addLayer(CartoDBTiles);

//OTHER MAP TILES
var map = L.map('map');
    map.fitBounds([
    [40.685626, -73.956567],
    [40.700211, -73.989289]
]);
var OpenMapSurfer_Grayscale = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
     minZoom: 10,
    maxZoom: 19,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// add these tiles to our map
map.addLayer(OpenMapSurfer_Grayscale);
// set data layer as global variable so we can use it in the layer control below
var leaflet_geoJSON;


var d13PolygonGeoJSON;
var SchoolSizeGeoJSON;

addDistrict13(); 

function addDistrict13() {
// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
$.getJSON( "geojson/D13_polygon.geojson", function( data ) {
    var d13Polygon = data; 

    var d13Style = function (feature, latlng) {

        var style = {
            "weight": 2,
            "color":"#1381ab",
            "fillColor": 'White',
            "fillOpacity": 0.4

        };
        return style;
    };
  
    d13PolygonGeoJSON = L.geoJson(d13Polygon, {
        style: d13Style
    });
    //I'm getting the following error message even though data is loading up fine: 
    // Uncaught TypeError: Cannot read property 'addTo' of undefined (line 58) (error specfics point to the anonymous function on line 58  )
    addSchoolSizeData();
});
  
}

function addSchoolSizeData() {
// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
// geojson/D13Enrollment06-15_AccurateLoc.geojson
$.getJSON( "geojson/D13_Enrollment_06-15.geojson", function( data ) {
    var schools = data;
    // draw the dataset on the map
    plotDataset(dataset);
    // //creates a dropdown in the sidebar that we can use to fire map events and update the D3 chart
    createDropdown(dataset);
    // addToMap();

// can I use a feature collection, + array of years to create a set of markers for each year? var featureCollection = properties[2006, 2007 2009, 2010, 2011, 2012, 2013, 2014, 2015]
// (Feature.properties.Growth\/dec*10)


var dotsGroup = L.featureGroup();

var dataset;



    drawDots(dataset);
});

function ParseIntegers(dataset) {
    $.each(dataset, function(i, d) {
        d.growth_int = parseInt(d.Growth);
        d.decline_int= parseInt(d.Decline);
    });


// ****** START HERE : FIGURE OUT HOW TO PARSE DATES AND SET DATE OBJECTS 
// HOW DO YOU JUST USE YEAR FOR TIME BASIS?






        if (!d.latitude || !d.longitude) {
        } else {

            if (d.Growth >== 0) { 
                dot_color = "#F03B20";
            } else if (d.Decline >== 0) {
                dot_color = "#FEB24C";
            } else (d.Decline === 0) {
                dot_color = "#FFEDA0";
            } 

            var rScale = d3.scale.log()
            .domain([1, d3.max(Growth, function(d) { returnd.})
        }
        }


}


// ***** go to line 178 of map.js from class 13 for d3 dot size process:

function drawDots(dataset) 
// I don't care about date view, so how to get around that? 
console.log(dataset);

    var cf = crossfilter(dataset);
    var byGrowthDecline = cf.dimension(function(d) {return d.})
        var growthDecline = feature.properties.GrowthDecline;
// ****** go to line 245 of map.js from class 13 for d3 dot size process:

// ***** below: this code worked to set markers to location of each school, but not to bind size to growth and decline of enrollment
// ****
  // var schoolPointToLayer = function (Feature, latlng) {
  //       var schoolMarker = L.circle(latlng, 100, {
  //           // radius: feature.properties.Growth/decline;
  //           weight: 1,
  //           color:'black',
  //           fillColor:'red',
  //           fillOpacity: 0.5
  //         // radius: markerRadius
  //   });
  //       return schoolMarker;
  //   }
  // ****** End of block that worked before



    var schoolClick = function (Feature, layer) {
        layer.bindPopup(Feature.properties.school); 
        // this does not seem to work, to add each year of data to popup list
        //     + "<br />" + 
        // "<p>Enrollment 2006: <p>" + features.properties._2006_1);
        // //  + "<br />" +
        // "2007: " + features.properties._2007 + "<br />" +
        // "2008: " + features.properties._2008 + "<br />" + 
        // "2009: " + features.properties._2009 + "<br />" + 
        // "2010: " + features.properties._2010 + "<br />" + 
        // "2011: " + features.properties._2011 + "<br />" + 
        // "2012: " + features.properties._2012 + "<br />" + 
        // "2013: " + features.properties._2013 + "<br />" + 
        // "2014: " + features.properties._2014 + "<br />" + 
        // "2015: " + features.properties._2015 + "<br />"
        //)
        }

// function to plot the dataset passed to it
// earlier error: on homework map: school building data did not show up because I'd removed the addTo(map)
// function plotDataset(dataset) {
    SchoolSizeGeoJSON = L.geoJson(schools, {
        pointToLayer: schoolPointToLayer,
        onEachFeature: schoolClick
  });
//addTo(map);

    // create layer controls
    // createLayerControls(); 

d13PolygonGeoJSON.addTo(map);
SchoolSizeGeoJSON.addTo(map);
});
}
