// THIS IS THE HOMEWORK ASSIGNMENT -- SECOND ATTEMPT WITHOUT MULTIPLE LAYERS, ETC. 
//AND IT SHOULD INCLUDE API AND D3 EXAMPLES

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
    var dataset = data;
    // draw the dataset on the map
    plotDataset(dataset);
    //create the sidebar with links to fire polygons on the map
    createListForClick(dataset);
    console.log(data)
});

// function to plot the dataset passed to it
function plotDataset(dataset) {
    SchoolDemographicsGeoJSON = L.geoJson(dataset, {
        style: schoolStyle,
        onEachFeature: schoolsOnEachFeature
    }).addTo(map);

    // create layer controls
    createLayerControls(); 
}

// function that sets the style of the geojson layer
var schoolStyle = function (feature, geometry) {

 var value = feature.properties.charter; 
            var fillColor = 'white';
            var fillOpacity = .5;
            var weight = 1;
            var color = 'Black';

            if (value ==="charter") {
                fillColor = "#61aa32";
                fillOpacity = 1.0;
            } 
            else {
            fillColor = "#4289b4";
            fillOpacity = 1.0;
            }
            var style = {
            weight: 1,
            opacity: 0.3,
            color: "#4289b4",
            wieght: 1,
            color: 'Black',
            fillOpacity: fillOpacity,
            fillColor: fillColor
        };

            return style;
      }



// empty L.popup so we can fire it outside of the map
var popup = new L.Popup();

// set up a counter so we can assign an ID to each layer
var count = 0;

// on each feature function that loops through the dataset, binds popups, and creates a count
var schooolsOnEachFeature = function(features){
    // *** schoolsOnEachFeature is not defined. Where do I define this? function declared above, parameters defined in next line
    // *** parameters to feed into function should be dataset -- features
    var schoolInfo = feature.properties

    // bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
// *** where do I list the features I want to list in popup window? "School"  "school typ" "charter"  "15Total En"
// *** also want to list percent of each demographic represented by DOE data collection
// *** what should var schoolInfo = ?
    layer.on("click", function (e) {
        var bounds = layer.getBounds();
        var schoolInfo = schoolStyle;
        popup.setLatLng(bounds.getCenter());
        popup.setContent(popupContent);
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




// LEGEND
// create a container for the legend and set the location

var legend = L.control({position: 'bottomright'});

// using a function, create a div element for the legend and return that div
legend.onAdd = function (map) {

    // a method in Leaflet for creating new divs and setting classes
// *** where is this array coming from? are we creating it or should I be referring to something created earlier? 
// Is it the two categories from the if/else statement for color styling above?
    var div = L.DomUtil.create('div', 'legend'),
    // can I define schoolType with the schoolStyle above? that assigns color through if charter color =, else color = 
        schoolType = ["charter", "public"];
            labels = ['<strong>School Types</strong>'],
        console.log (schoolType)

        for (var i = 0; i < schoolType.length; i++) {

            div.innerHTML +=
            labels.push(
                '<i style="background:' + fillColor(schoolStyle[i]) + '"></i> ' + (schoolStyle[i] ? schoolStyle[i] : '+'));

      }
        div.innerHTML = labels.join('<br>');

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
    // **** data entered in class example is from a CSV. Can I use data from geoJson file? 
    // **** what does the <a href="#"> refer to? #
    ULs.selectAll("li")
        .data(dataset.features)
        .enter()
        .append("li")
        .html(function(d) { 
            return '<a href="#">' + d.properties.features + '</a>'; 
        })
        .on('click', function(d, i) {
            console.log(d.properties.properties.features);
            console.log(i);
            var leafletId = 'acsLayerID' + i;
            map._layers[leafletId].fire('click');
        });
}





// // THIS IS API STUFF BELOW 

// // lets add data from the API now
// // set a global variable to use in the D3 scale below
// // use jQuery geoJSON to grab data from API
// $.getJSON( "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$$app_token=rQIMJbYqnCnhVM9XNPHE9tj0g&borough=BROOKLYN&complaint_type=Noise&status=Open", function( data ) {
//     var dataset = data;
//     // draw the dataset on the map
//     plotAPIData(dataset);

// });

// // create a leaflet layer group to add your API dots to so we can add these to the map
// var apiLayerGroup = L.layerGroup();

// // since these data are not geoJson, we have to build our dots from the data by hand
// function plotAPIData(dataset) {
//     // set up D3 ordinal scle for coloring the dots just once
//     var ordinalScale = setUpD3Scale(dataset);
//     //console.log(ordinalScale("Noise, Barking Dog (NR5)"));


//     // loop through each object in the dataset and create a circle marker for each one using a jQuery for each loop
//     $.each(dataset, function( index, value ) {

//         // check to see if lat or lon is undefined or null
//         if ((typeof value.latitude !== "undefined" || typeof value.longitude !== "undefined") || (value.latitude && value.longitude)) {
//             // create a leaflet lat lon object to use in L.circleMarker
//             var latlng = L.latLng(value.latitude, value.longitude);
     
//             var apiMarker = L.circleMarker(latlng, {
//                 stroke: false,
//                 fillColor: ordinalScale(value.descriptor),
//                 fillOpacity: 1,
//                 radius: 5
//             });

//             // bind a simple popup so we know what the noise complaint is
//             apiMarker.bindPopup(value.descriptor);

//             // add dots to the layer group
//             apiLayerGroup.addLayer(apiMarker);

//         }

//     });

//     apiLayerGroup.addTo(map);

// }

// function setUpD3Scale(dataset) {
//     //console.log(dataset);
//     // create unique list of descriptors
//     // first we need to create an array of descriptors
//     var descriptors = [];

//     // loop through descriptors and add to descriptor array
//     $.each(dataset, function( index, value ) {
//         descriptors.push(value.descriptor);
//     });

//     // use underscore to create a unique array
//     var descriptorsUnique = _.uniq(descriptors);

//     // create a D3 ordinal scale based on that unique array as a domain
//     var ordinalScale = d3.scale.category20()
//         .domain(descriptorsUnique);

//     return ordinalScale;

// }









