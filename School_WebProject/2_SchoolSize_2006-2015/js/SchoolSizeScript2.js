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

    addSchoolSizeData();
});
  
}

function addSchoolSizeData() {
// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
// geojson/D13Enrollment06-15_AccurateLoc.geojson
$.getJSON( "geojson/D13_Enrollment_06-15_2.geojson", function( data ) {
    var schools = data;
      console.log(data);
    // draw the dataset on the map
    // plotDataset(dataset);
    // //creates a dropdown in the sidebar that we can use to fire map events and update the D3 chart
    // createDropdown(dataset);
    // addToMap();

// can I use a feature collection, + array of years to create a set of markers for each year? var featureCollection = properties[2006, 2007 2009, 2010, 2011, 2012, 2013, 2014, 2015]
// (Feature.properties.Growth\/dec*10)
    var schoolPointToLayer = function (features, latlng) {

        var growthDecline = features.properties.GrowthDecline;
        var publicCharter = features.properties.DBN 

        console.log(growthDecline);
   
        var schoolMarker = L.circleMarker(latlng, {
            // radius: feature.properties.Growthdecline;
            weight: 1,
            color:'black',
            fillColor: markerColor(publicCharter, growthDecline),
            fillOpacity: 0.5,
            radius: markerRadius(growthDecline)
    });
        return schoolMarker;
    }
// find top range of G/D and set if/else stuff here for radius
    function markerRadius (d) {
    return d > 600 ?  60 :
           d > 500  ? 50 :
           d > 400  ? 40 :
           d > 300  ? 30 :
           d > 200  ? 20 :
           d > 100  ? 10 :
           d >   0  ? 1 :
           d > -100 ? 10 :
           d > -200 ? 20 :
           d > -300 ? 30 :
           d > -400 ? 40 :
           d > -500 ? 50 :
           d > -600 ? 60 :
                      70 ;

    }

    function markerColor (d, f) {
      return d.substring(0,1) === "8" && f > 0 ? '#FF0000' :

           d.substring(0,1) === "8" && f <= -1 ? '#d95f0e' :
           d.substring(0,1) === "1" && f >= 0 ? '#fe9929' :
                    '#ffffd4';
}
//  }

    var schoolClick = function (Feature, layer) {
          /////// var popupText attemtps to make popup ignore 0 value properties and instead show first year with data for enrollment

       var enrollment = (feature.properties);

        if (d._2006 == 0) {
          d._2007;
        } else if (d._2006 != 0) {
          'Enrollment 2006: ' + d._2006 + '<br />';
        } else if (d._2007 == 0) {
          d._2008;
        } else if (d._2007) {
          'Enrollment 2007: ' + d._2007 + '<br />';
        } else if (d._2008 == 0) {
          d._2009;
        } else if (d._2008 != 0) {
          'Enrollment 2008: ' + d._2008 + '<br />';
        } else if (d._2009 == 0) {
          d._2010;
        } else if (d._2009 != 0) {
          'Enrollment 2009: ' + d._2009 + '<br />';
        } else if (d._2010 == 0) {
          d._2011;
        } else if (d._2010 != 0) {
          'Enrollment 2010: ' + d._2010 + '<br />';
        } else if (d._2011 == 0) {
          d._2012;
        } else if (d._2011 != 0) {
          'Enrollment 2011: ' + d._2011 + '<br />';
        } else if (d._2012 == 0) {
          d._2013;
        } else if (d._2012 != 0) {
          'Enrollment 2012: ' + d._2012 + '<br />';
        } else if (d._2013 == 0) {
          d._2014;
        } else if (d._2013 != 0) {
          'Enrollment 2013: ' + d._2013 + '<br />';
        } else if (d._2014 == 0) {
          '<br />';
        } else (d._2014 != 0) 
          'Enrollment 2014: ' + d._2014 + '<br />';
        }
      

        var popupContent = '<b>' + Feature.properties.School + '</B>'
            + '<b>' + enrollment + '</b>' + 
            '<b>Enrollment 2015: </b>' + Feature.properties._2015;

      var popupOptions = {
        minWidth: 50,
        maxWidth: 150, // make sure popup window doesn't get too big
        autoPanPadding: new L.Point(5, 60) // this makes sure the popup pushes down from the top (with space) of map rather than being hidden
 
        layer.bindPopup(popupContent, popupOptions)
    };
        // popupText += (Feature.properties._2006) ? '' + Feature.properties._2006 : '';
        // popupText += (Feature.properties._2015) ? '' + Feature.properties._2015 : '';
        // popupText += (Feature.properties.GrowthDecline) ? '' + Feature.properties.GrowthDecline : '';

        //  + "<br />" +
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
