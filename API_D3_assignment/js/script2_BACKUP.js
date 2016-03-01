//trying a stripped down version to see if I can get data to load at all


var map = L.map('map')
    map.fitBounds([
    [40.671082, -73.939301],
    [40.707790, -73.999456]
]);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add these tiles to our map
map.addLayer(CartoDBTiles);

// set data layer as global variable so we can use it in the layer control below
var SchoolDemographicsGeoJSON;

// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
$.getJSON( "geojson/SchoolDemographicsWGS84.geojson", function( data ) {
    var dataset = data; // d3
    // draw the dataset on the map
    plotDataset(dataset);
    //create the sidebar with links to fire polygons on the map
    createListForClick(dataset);
});
// function to plot the dataset passed to it -- does this mean I can now access data with d when using d3?
function plotDataset(dataset) {
    SchoolDemographicsGeoJSON = L.geoJson(dataset, {
	style: schoolStyle,
    onEachFeature: schoolsOnEachFeature

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

            }

            return style;
        }
// ** should this parameter be d? or should it be schoolType? 
 function schoolColor(schoolType) {

 	if (schoolType ==="charter") {
    console.log(schoolType)
         fillColor = "#61aa32";
         } 
         else {
         fillColor = "#4289b4";
         }
         return fillColor;
     }


// empty L.popup so we can fire it outside of the map
var popup = new L.Popup();

// set up a counter so we can assign an ID to each layer
var count = 0;

// on each feature function that loops through the dataset, binds popups, and creates a count
var schoolsOnEachFeature = function(feature, layer){
    // layer refers to leaflet functino below
    // *** schoolsOnEachFeature is not defined. Where do I define this? function declared above, parameters defined in next line
    // *** parameters to feed into function should be dataset -- features
    var schoolType = (feature.properties.charter);
console.log(feature.properties)
    // bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
// *** where do I list the features I want to list in popup window? "School"  "school typ" "charter"  "15Total En"
// *** also want to list percent of each demographic represented by DOE data collection
// *** what should var schoolInfo = ?
    layer.on("click", function (e) {
        var bounds = layer.getBounds();
        var popContent = feature.properties.School + "<br>" + feature.properties.schoolType;
        console.log(feature.properties)
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
        "CartoDB Basemap": CartoDBTiles,
    };

    var overlayMaps = {
        "District 13 Schools": SchoolDemographicsGeoJSON,
    };

    // CONTROL
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    
}


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
            return '<a href="#">' + d.properties.charter + '</a>'; 

        })
        .on('click', function(d, i) {
            var leafletId = 'schoolsLayerID' + i;
            map._layers[leafletId].fire('click');
        });
 }


