//trying a stripped down version to see if I can get data to load at all


var map = L.map('map')
    map.fitBounds([
    [40.671082, -73.939301],
    [40.707790, -73.999456]
]);
var OpenMapSurfer_Grayscale = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// var CartoDB_DarkMatterNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//     subdomains: 'abcd',
//     maxZoom: 19
// });
// set a tile layer to be CartoDB tiles 
// var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
//   attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
// });

// add these tiles to our map
map.addLayer(OpenMapSurfer_Grayscale);

// set data layer as global variable so we can use it in the layer control below
var d13PolygonGeoJSON;
var SchoolDemographicsGeoJSON;

add
// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
$.getJSON( "geojson/SchoolDemographicsWGS84.geojson", function( data ) {
    var dataset = data; // d3
    // draw the dataset on the map
    plotDataset(dataset);
    //create the sidebar with links to fire polygons on the map
    createListForClick(dataset);
});
// function to plot the dataset passed to it -
//
function plotDataset(dataset) {
    SchoolDemographicsGeoJSON = L.geoJson(dataset, {
	style: schoolStyle,
    onEachFeature: schoolsOnEachFeature
    // school building data did not show up because I'd removed the .addTo(map) -- still have error showing up related to addTo on line 138:
    // addTo is undefined "cannot read property 'addTo' of undefined"
    }).addTo(map);

    // create layer controls
    createLayerControls(); 
}
// **** I am trying to define colors of charter and public schools as functions so I can use them for legend:
var schoolStyle = function (feature, geometry) {

 var schoolType = feature.properties.charter; 

     var style = {
           weight: 1,
            color:'Black',
            fillOpacity: 1,
            fillColor:schoolColor(schoolType)

            };

            return style;
        }
// ** should this parameter be d? or should it be schoolType? 
 function schoolColor(schoolType) {

 	if (schoolType ==="charter") {
    console.log(schoolType)
         fillColor = "#f69705";
         } 
         else {
         fillColor = "#d83700";
         }
         return fillColor;
     }


// empty L.popup so we can fire it outside of the map
var popup = new L.Popup();

// set up a counter so we can assign an ID to each layer
var count = 0;

// on each feature function that loops through the dataset, binds popups, and creates a count
var schoolsOnEachFeature = function(feature, layer){
    // ...layer) refers to leaflet layer.on function below : that creates or is considered a layer
    // *** parameters to feed into function should be dataset -- features
    var schoolInfo = (feature.properties);
    // changed this from :  var schoolType = (feature.properties.charter); which was loading up
    // bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
    // *** To list percent of each demographic represented by DOE data collection: did not work when Properties category contained a number. when I removed number from json category, it works
    // *** NOw, I want to fix percent number to 1 place after decimal. Not working.
    layer.on("click", function (e) {
        var bounds = layer.getBounds();
        var popContent = feature.properties.School + "<br ><strong>Total Enrollment 2015: </strong>" + feature.properties.TotalEnroll + "<br /><strong>Black: </strong>" + (feature.properties.PerBlack*100).toFixed(1) + "%"
         + "<br>" + "<strong>White: </strong>" +  (feature.properties.PerWhite*100).toFixed(1) + "%"  + "<br>" + "<strong>Asian: </strong>" +  (feature.properties.PerAsian*100).toFixed(1) + "%" + "<br>" + "<strong>Hispanic: </strong>" +  (feature.properties.PerHispanic*100).toFixed(1) + "%";
        popup.setLatLng(bounds.getCenter());
        popup.setContent(popContent);
        map.openPopup(popup);
    });

    // add an ID to each layer so we can fire the popup outside of the map
    layer._leaflet_id = 'schoolsLayerID' + count; 
    count++;

}

function createLayerControls(){
    // add in layer controls
    var baseMaps = {
        "CartoDB Basemap": OpenMapSurfer_Grayscale,
    };

    var overlayMaps = {
        "District 13 Schools": SchoolDemographicsGeoJSON,
    };

    // CONTROL
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    
}
// add in a legend to make sense of it all
// create a container for the legend and set the location

var legend = L.control({position: 'bottomleft'});

// using a function, create a div element for the legend and return that div
legend.onAdd = function (map) {

    // a method in Leaflet for creating new divs and setting classes
    var div = L.DomUtil.create('div', 'legend'),
        colors = [2;
//schoolColor
        div.innerHTML += '<p>Public Schools <br />in Brooklyn, <br />District 13 </p>';

        for (var i = 0; i < schoolColor.length; i++) {
        div.innerHTML +=
        '<i style="background:' + fillColor(amounts) + '<br />' '</i>';

    return div;
};


// add the legend to the map
legend.addTo(map);

// function to create a list in the right hand column with links that will launch the pop-ups on the map
function createListForClick(dataset) {
    // use d3 to select the div and then iterate over the dataset appending a list element with a link for clicking and firing
    // first we'll create an unordered list ul elelemnt inside the <div id='list'></div>. The result will be <div id='list'><ul></ul></div>
    var ULs = d3.select("#list")
                .append("ul");


    // now that we have a selection and something appended to the selection, let's create all of the list elements (li) with the dataset we have 
    // can I use the geojson file for this? example uses a csv
    // I don't understand how to return the category I want
    ULs.selectAll("li")
        .data(dataset.features)
        .enter()
        .append("li")
        .html(function(d) { 
            console.log(d)
            return '<a href="#">' + d.properties.School + '</a>' + "<br>" + d.properties.schoolType + "<br>";

        })
        .on('click', function(d, i) {
            var leafletId = 'schoolsLayerID' + i;
            map._layers[leafletId].fire('click');
        });
 }


