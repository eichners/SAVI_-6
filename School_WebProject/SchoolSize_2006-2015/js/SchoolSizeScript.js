// FINAL PROJECT SCHOOL SIZE CHANGES: 2006 - 2015 MAP
// BASED ON CLASS 12
// EXAMPLE WTIH ANNOTATION
// D3.js PIE CHART and LEAFLET and BOOTSTRAP
// This script shows a simple leaflet map and simple d3 chart with some interactions


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

// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function

$.getJSON( "geojson/EnrollmentChange_06-15.geojson", function( data ) {
    var dataset = data;
    // draw the dataset on the map
    plotDataset(dataset);
    //creates a dropdown in the sidebar that we can use to fire map events and update the D3 chart
    createDropdown(dataset);
});

// function to plot the dataset passed to it
// earlier error: on homework map: school building data did not show up because I'd removed the addTo(map)
function plotDataset(dataset) {
    leaflet_geoJSON = L.geoJson(dataset, {
        style: mapStyle,
        //onEachFeature: mapOnEachFeature
    }).addTo(map);

    // create layer controls
    //createLayerControls(); 
}


//LEGEND FOR TIME BASED INFO
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    // this is an html legend instead of leaflet generated through functions
    // circles for legend are svg elements
        div.innerHTML += 
            '<b>Brooklyn School District 13: Public and Charter Schools</b><br />' +
            '<svg class="left" width="22" height="18"><circle cx="10" cy="9" r="8" class="legendSvg1"/></svg><span>Public School Enrollment: Growth</span><br />' +
            '<svg class="left" width="22" height="18"><circle cx="10" cy="9" r="8" class="legendSvg2"/></svg><span>Public School Enrollment: Decline</span><br />' +
            '<svg class="left" width="22" height="18"><circle cx="10" cy="9" r="8" class="legendSvg3"/></svg><span>Charter School Enrollment: Growth</span><br />' + 
            
            '<b>Larger</b> dots represent growth or decline in school enrollment.<br />' + 
            '<span>appearing or disappearing dots represent schools opening or closing</span><br /><br/>' + 
            '<b>Data Sources</b> <br/>' + 
            'Annual school enrollment reports: <a href=\"http://schools.nyc.gov/Accountability/data/default.htm\">NYC DOE</a></span><br />'+ 
            'General school information: <a href=\"http://insideschools.org/\">Inside Schools.org</a></span><br />';

;
    return div;
};

legend.addTo(map);

//creating links to data and time controls 
// don't draw yet, just set up functions and load data later
function drawTimeControlLegend(filterMin, filterMax) {
    // create time strings
    var maxDateDay = filterMax.getDate();
    var maxDateMonth = filterMax.getMonth() + 1;
    var maxDateYear = filterMax.getFullYear();  
    var filterMaxDay = filterMax.getDate();
    var filterMaxMonth = filterMax.getMonth() + 1;
    var filterMaxYear = filterMax.getFullYear();    
    var filterMinDay = filterMin.getDate();
    var filterMinMonth = filterMin.getMonth() + 1;
    var filterMinYear = filterMin.getFullYear();    
    var maxDateString = maxDateMonth + "/" + maxDateDay + "/" + maxDateYear;
    var rangeString = "<b>" + filterMinMonth + "/" + filterMinDay + "/" + filterMinYear + "</b> through <b>" + filterMaxMonth + "/" + filterMaxDay + "/" + filterMaxYear + "</b>";
        
    var legend_data = L.control({position: 'bottomleft'});

    legend_data.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legendmap');
        
            div.innerHTML += 
                '<b>Time Controls</b><br />' +
                '<span>School enrollment 2006-2016 <b>' + maxDateString + '</b><br />' +
                'Date Range of SSO Reports Shown:<br />' + rangeString + '</span><br /><br />' +         
                // set time slider here, replace code below     
                '<span><a onclick=\"setDates(1)\" href=\"javascript:void(0);\">Latest Week of Data</a><br />' +             
                '<a onclick=\"setDates(2)\" href=\"javascript:void(0);\">Latest Month of Data</a><br />' +              
                '<a onclick=\"setDates(3)\" href=\"javascript:void(0);\">All Data Available</a><br /></span>';
                // see that "setDates" above is a function from below with drawDots, refreshes map and sets view
                // <a> this is like one time slider with three functions/options
        return div;
    };

    legend_data.addTo(map);

}


// create control for geocoding: address look up tool: find it on leaflet library plug-in : then to Geocoding (JD's favorite: leaflet Control Geocoder)
// create before ....
// you can set a bounding box so that searches don't bring up addresses outside of scope of map
// options to chagne placement, or change actual geocoder

// L.Control.geocoder().addTo(map);


// // create a layer groups to catch the new markers
// var dotsGroup = L.featureGroup();

// // set dataset as global variable and empty
// var dataset;

// // use d3 to open, process and scale csv data
// // extracting data from csv, data is in strings from csv file, so parseIntegers uses jquery with for each loop to go through all items in dataset
// // and make sure volume data is an integer
// // parseInt(d.volume-gallons) does this -- data is stored in d
// // then stick it into antoerh variable inito d.volume_gallons_int: this is a new variable that is an integer version. Not overwriting old field
// d3.csv("geojson/EnrollmentChange_06-15.geojson", function(data) { 
//     dataset = data;
    
//     parseIntegers(dataset);
//     parseDates(dataset);
    
//     dateView = 2;
//     // variable set to decide which view to use -- two options set below
//     // draw dots below with the dateView = 2 passed to it
//     drawDots(dataset, dateView);
    
// });

// Here I'd like to use data from 10 columns covering 10 years for slider 2006 - 20015
// for now I am using the calculated growth or decline column in a static representation

var mapStyle = function (feature,latlng) {

function parseIntegers(dataset) {
    $.each(dataset, function( i, d ) {
        d.enrollmentChange = parseInt(d.Growth/decline);
    });
}


function fillColor(d) {
    return d > 0 ? '#006d2c' :
           d == 0 ? '#edf8e9' :
           d > 0 ? '#31a354' :
                   '#edf8e9';
}

function radius(d) {
    return d * .10;
}


var schoolStyle = function (feature, latlng){

    //console.log(feature.properties.address);
    var schoolMarker = L.circleMarker(latlng, {
        stroke: 1,
        fillColor: fillColor(feature.properties.DBN),
        fillOpacity: 0.7,
        radius: radius(feature.properties.Growth/decline)
    });
    
    return schoolMarker;
    
};


var circleColor = function(feature, layer) {

    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(circleColor),
        fillColor: fillColorPercentage(circleColor)
    };
}
  //  return style;

//****** look between line 250 and 300 on Script.js example to left from early class example, then go to later one

// function that fills polygons with color based on the data
function fillColorPercentage(d) {
    return d > 0 ? '#993404' :
           d < 0  ? '#d95f0e' :
                    '#ffffd4';
}


// function that sets the fillOpacity of layers -- if % is 0 then make polygons transparent
function fillOpacity(d) {
    return d == 0 ? 0.0 : // nnull values or 0 
                    0.75;
}
}
/*
// empty L.popup so we can fire it outside of the map
var popup = new L.Popup();

// set up a counter so we can assign an ID to each layer
var count = 0;

// on each feature function that loops through the dataset, binds popups, and creates a count
var mapOnEachFeature = function(feature,layer){
    var prettyUIRate = (feature.properties.UnempRate*100).toFixed(1); // to fixed one keeps decimal to one place after.

    // let's bind some feature properties to a pop up with an .on("click", ...) command. We do this so we can fire it both on and off the map
    layer.on("click", function (e) {
        var bounds = layer.getBounds();
        var popupContent = "<h4>"+ feature.properties.NYC_NEIG +"</h4><br /><strong>Total Population:</strong> " + numberWithCommas((feature.properties.Pop).toFixed(0)) + "<br /><strong>Unemployment Rate:</strong> " + prettyUIRate + "%";
        // see bottom of page for function above: function numberWithCommas(x) { etc.... this returns a string so it cannot be used again! maybe that's why it's last
        popup.setLatLng(bounds.getCenter());
        popup.setContent(popupContent);
        map.openPopup(popup);
    });

    // we'll now add an ID to each layer so we can fire the popup outside of the map
    layer._leaflet_id = "mapLayerID" + count; // this is a unique id set so leaflet can count through array of data

    // draw pie for first selected
    if (count == 0) {
        updatePie(feature);
    }
    
    count++;  

}


function createLayerControls(){
    // add in layer controls
    var baseMaps = {
        "CartoDB Basemap": CartoDBTiles,
    };

    var overlayMaps = {
        "Unemployment Rate": leaflet_geoJSON,
    };

    // add control
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    
}

// add in a legend to make sense of it all
// create a container for the legend and set the location

var legend = L.control({position: 'bottomright'});

// using a function, create a div element for the legend and return that div
legend.onAdd = function (map) {

    // a method in Leaflet for creating new divs and setting classes
    var div = L.DomUtil.create('div', 'legend'),
        amounts = [0, 2, 4, 6, 8, 10];

        div.innerHTML += '<p>Percentage Population<br />That Moved to US in<br />the Last Year</p>';

        for (var i = 0; i < amounts.length; i++) {
            div.innerHTML +=
                '<i style="background:' + fillColorPercentage(amounts[i] + 1) + '"></i> ' +
                amounts[i] + (amounts[i + 1] ? '% &ndash;' + amounts[i + 1] + '%<br />' : '% +<br />');
        }

    return div;
};


// add the legend to the map
legend.addTo(map);



// function to create a list in the right hand column with links that will launch the pop-ups on the map
function createDropdown(dataset) {
    // use d3 to select the div and then iterate over the dataset appending a list element with a link for clicking and firing
    // first we'll create an unordered list ul elelemnt inside the <div id='list'></div>. The result will be <div id='list'><ul></ul></div>
    var nighborhood_dropdown = d3.select("#nighborhood_dropdown") // stored as variable here: selecting div from html doc
                .append("select")
                .attr("class", "form-control") // adding class with boot strap styling. without form-control dropdown will be less boot-strappy
                .on("change", change); // bind the on ("change") function ot it. That function is below, two blocks down
// onChange function listens for change from window before firing fucntions above

    // now that we have a selection and something appended to the selection, let's create all of the list elements (li) with the dataset we have 
    
    var options = nighborhood_dropdown.selectAll("option") // creates empty seletion: stored so can be used later: empty selection to fill with data
        .data(dataset.features) // all neighborhoods: load in data to memory
        .enter()  // counts and gets neighborhoods, how many things already named option, etc. bind into d3 selection
        .append("option") // draw/create number of options by neighborhoods/ option for each
        .html(function(d) { // anonymous function with data?
            return d.properties.NYC_NEIG + " " + d.properties.Unemployed;  // puts all from that property into options slot
        });


    function change() {

        // get id of selected and fire click
        var si   = nighborhood_dropdown.property('selectedIndex');
        var leafletId = 'mapLayerID' + si; // leaflet array ids are set above at top of doc?
        map._layers[leafletId].fire('click'); // ids are set for d3 and leaflet so both should be the same

        // get data out of selected and draw pie chart
        var s = options.filter(function (d, i) { return i === si }); //.filter is standard javascript function, go through options and only return one where ids are the same
        console.log(s) // pulls out datum for this pie chart, s is a d3 object or array
        var feature = s.datum(); // s.datum()  extracts whatever is bound to this element (d3 function?)
        // draw pie chart
        updatePie(feature);


    }

}

// stuff above is so that info can be stored and passed into function later, below:
function updatePie(feature) { //passes in one feature from data set 
    // remove any previous content from svg
    d3.select('#d3vis').html(''); // set html(' ') to be empty: id is in new row in html doc. div there has an svg container as placeholder

    // set up dataset
    console.log(feature);
// ARRAY: 4 categories, all with same keys; labels: .... values: .... 
    var d3_dataset = [{"label":"Armed Forces", "value":feature.properties.Armed_Forc}, 
                      {"label":"Employed", "value":feature.properties.Employed}, 
                      {"label":"Unemployed", "value":feature.properties.Unemployed},
                      {"label":"Not In Labor Force", "value":feature.properties.NotInLabor}];



    // set width and height of drawing
    var width = $('.col-sm-6').width(), // use jquery to find out this class is ('.col-sm-6')
        height = width, // 
        radius = width / 2; // sets to half the svg width? 

    // set color scale and range
    var color = d3.scale.ordinal() // tells d3 to pass in the string (label name) to determine color
        .range(["#7b6888", "#6b486b", "#a05d56", "#d0743c",]);

    // set inner and outer radius
    var arc = d3.svg.arc() // set radius for center 
        .outerRadius(radius - 10)
        .innerRadius(50); // if not 0 this will be donut chart

    // set labels
    var labelArc = d3.svg.arc() // how far from edge
        .outerRadius(radius - 100) // setting label to start 100 px from edge of chart
        .innerRadius(radius - 100); // need to set both outer and inner or arc function won't work
        // we told it to anchor text in midle of string, so setting it to -10 makes labels hang off chart

    var pie = d3.layout.pie() // this is a d3 convenience function (d3.layout.whatever)
        .sort(null) // tell it to sort it by some attribute
        .value(function(d) { console.log(d); return d.value; }); // what value do we want to use? 
        // we created function with label and value so we'll pass that through an anonymous functino to pull out that d value

    var svg = d3.select("#d3vis") // selects and creates svg container 
                .append("svg")
                .attr("width", width) // set width and ht
                .attr("height", height) //explicitly sets them to be =
                .append("g")  // ** This is a way to keep drawing at center!! g container: transform property of svg to draw a g container at 00 and move to center of drawing
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); 
                // if you don't do this must figure out a way to draw pie chart in center of container

    var g = svg.selectAll(".arc") // select all class = arc elements
               .data(pie(d3_dataset)) // loading data run through pie function so certain attributes will come out of it 
               .enter() // binding the dataset defined above but also info about how wide, radius, etc. 
               .append("g") // made four of these
               .attr("class", "arc"); // classed them as arcs
               // g containers will be the slices of the pie -- g is the container for each slice  or path
               // this is one way to do this, not the only way
               // g tag will hold text as well

    g.append("path")
        .attr("d", arc) // cerate an attribute d for the path - we created arc function earlier around line 220
        .style("fill", function(d) { 
            console.log(d); // this will show everything that has been bound to d with pie function
        return color(d.data.label); }); // now data is bound to d, setting which data to show needs another step down list : d.data.value ...
        //fill color is determined by layer


    g.append("text")  // .centroid gives centers 
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; }) // moves text around as needed
        .attr("dy", ".35em")
        .text(function(d) { return d.data.label + " (" + numberWithCommas(d.data.value) + ")"; });

}



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



*/


