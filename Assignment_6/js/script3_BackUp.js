// SCRIPT #3 FOR ASSIGNMENT 6: DISTRICT 13 SCHOOLS #1: FIRST ATTEMPT WITH STRIPPED DOWN CONTENT

var map = L.map('map').setView([40.65,-73.93], 13);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add these tiles to our map
map.addLayer(CartoDBTiles);

//3 LAYERS TO ADD:
// set data layer as global variable so we can use it in the layer control below
var d13MaskGeoJSON;
var d13PolygonGeoJSON;
var SchoolDemographicsGeoJSON;


// LAYER 1:
// NYC BOROUGH BOUNDARIES: 
// earlier, when these layers were showing up, the styles were applied to both layers 
// in trying to work though that, nothing shows now. Anyway;
// this layer should be NYBB with  District 13 CARVED OUT OF SHAPE 

adddNYBB();

function adddNYBB() {
    //add borough boundary and district 13 mask polygons
$.getJSON( "geojson/D13Mask_2NYCBB.geojson", function( data ) {
    var district13Mask = data;
    console.log(data)
 
  var NYBBStyleFunction = function (feature, geometry){
    var BorosStyle = {
        weight: 1,
        opacity: .5,
        color:'black',
        fillOpacity: 0.0,
        fillColor: "white",
    };
    return BorosStyle;
}
        var d13BoroNames = function (feature, layer) {
            // let's bind some feature properties to a pop up 
            // bindLabel is not part of leaflet -- need another library
            layer.bindPopup(feature.properties.BoroName);
        };

    // create Leaflet layer using L.geojson; don't add to the map just yet
    d13MaskGeoJSON = L.geoJson(district13Mask, {
        style: NYBBStyleFunction, //, call back the FUNCTION district13Style, not style name
        onEachFeature: d13BoroNames
    });

 addd13Polygon ();
});
};



// LAYER #2: 
function addd13Polygon () {
// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
$.getJSON( "geojson/D13_polygon.geojson", function( data ) {
    var d13Polygon = data;

    //how do you use console.log? not always working.
    console.log(data)
// should I be creating this style with a function or just by defining variable d13Style?
    var d13Style = function (feature, latlng) {

    var style = {
        weight: 1,
        color:'Black',
        fillColor: 'White',
        fillOpacity: 0.0

    };
    return style;
};

//Label plugin. Still figuring out how to use this
    //    var d13label = function (feature, district)
//         var d13Label = function (feature, layer) {
//             // let's bind some feature properties to a pop up
//             layer.bindPopup(feature.properties.District);
//         };
// }).bindLabel('My label', {
//     noHide: true,
//     direction: 'auto'
// });
    // var d13Style = {
    //     weight: 2,
    //     opacity: .5,
    //     color:'black',
    //     fillOpacity: .2,
    //     fillColor: "#666666",
    // };
    //return d13Style;       

    // create Leaflet layer using L.geojson; don't add to the map just yet
    d13PolygonGeoJSON = L.geoJson(d13Polygon, {
        style: d13Style,

    });
    addSchoolDemographics(); 
    });
}

// LAYER #3
// DISTRICT 13 SCHOOL LOCATIONS: this layer has data to list and use with D3.js


function addSchoolDemographics () {

    $.getJSON( "geojson/SchoolDemographicsWGS84.geojson", function( data ) {
        var schoolShape = data;
        console.log(data);

        // school shapes
        var schoolStyleFunction = function (feature, geometry){

            var value = feature.properties.charter; 
            var fillColor = 'white';
            var fillOpacity = .5;

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
            fillOpacity: fillOpacity,
            fillColor: fillColor
        };

            return style;
      }

        var schoolClick = function (feature, layer) {
            // let's bind some feature properties to a pop up
            layer.bindPopup(feature.properties.School +  "<br>" + feature.properties.charter);
            console.log(feature.properties.charter)
        }
        // create Leaflet layer using L.geojson; the stuff below is calling back the functions from above (Style and onEachFeature)
        SchoolDemographicsGeoJSON = L.geoJson(schoolShape, {
            style: schoolStyleFunction,
            onEachFeature: schoolClick
         //   }).addTo(map);
    });


// now lets add the data to the map in the order that we want it to appear

        // neighborhoods on the bottom
        d13MaskGeoJSON.addTo(map);

        // subway lines next
        d13PolygonGeoJSON.addTo(map);

        // finally, the Pawn Shop dots
        SchoolDemographicsGeoJSON.addTo(map);


        // now create the layer controls!
        createLayerControls(); 

    });
}

function createLayerControls(){

    // add in layer controls
    // var baseMaps = {
    //     "CartoDB": CartoDBTiles,
    //     "OSM Mapnik": OSMMapnikTiles,
    //     "Mapquest Aerial": MapQuestAerialTiles
    // };

    var overlayMaps = {
        "NYC Borough Boundaries": d13MaskGeoJSON,
        "Brooklyn School District 13": d13PolygonGeoJSON,
        "District 13 Public Schools": SchoolDemographicsGeoJSON
    };
    
    // add control
    L.control.layers(overlayMaps).addTo(map);

}




// // function to create a list in the right hand column with links that will launch the pop-ups on the map
// function createListForClick(dataset) {
//     // use d3 to select the div and then iterate over the dataset appending a list element with a link for clicking and firing
//     // first we'll create an unordered list ul elelemnt inside the <div id='list'></div>. The result will be <div id='list'><ul></ul></div>
//     // all below d3. before ; are chained d3 functions 
//     var ULs = d3.select("#list")
//                 .append("ul");


//     // now that we have a selection and something appended to the selection, let's create all of the list elements (li) with the dataset we have 
    
//     ULs.selectAll("li")
//         .data(dataset.features)
//         .enter()
//         .append("li")
//         .html(function(d) { 
//             return '<a href="#">' + d.properties.ACS_13_5YR_B07201_GEOdisplay_label + '</a>'; 
//         })
//         .on('click', function(d, i) {
//             console.log(d.properties.location);
//             console.log(i);
//             var leafletId = 'acsLayerID' + i;
//             map._layers[leafletId].fire('click');
//         });

   // createLayerControls();  *********** uncomment later
// }
