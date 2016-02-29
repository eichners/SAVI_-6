// This script demonstrates some simple things one can do with leaflet.js


var map = L.map('map').setView([40.71,-73.93], 11);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add these tiles to our map
map.addLayer(CartoDBTiles);


// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
// let's add the subway lines
$.getJSON( "geojson/D13Mask_2NYCBB.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dataset = data;
    // draw the dataset on the map
    L.geoJson(dataset).addTo(map);
});

// let's add neighborhood data
$.getJSON( "geojson/D13_polygon.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dataset = data;
    // draw the dataset on the map
    L.geoJson(dataset).addTo(map);
});

// let's add pawn shops data
$.getJSON( "geojson/SchoolDemographicsWGS84.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dataset = data;
    // draw the dataset on the map
    L.geoJson(dataset).addTo(map);
});


// create global variables we can use for layer controls
var subwayLinesGeoJSON;
var neighborhoodsGeoJSON;
var pawnShopsGeoJSON; 

// start the chain reaction by running the addSubwayLines function
addSubwayLines();

// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map
// because of the asynchronous nature of Javascript, we'll wrap each "getJSON" call in a function, and then call each one in turn. This ensures our layer will work  

function addSubwayLines() {


