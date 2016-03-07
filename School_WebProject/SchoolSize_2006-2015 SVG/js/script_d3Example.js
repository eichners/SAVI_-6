// Script for D3 example; class 11
// ANNOTATED
// Width and height of canvas
// put this at top for ease of changes to overall canvas size for svg
var w = 1000;
var h = 800;

// Define map projection -- one can set specific projecctions in d3 -- find on the wiki page where there are
// lots of visual guides to which is best for where, etc.
// .translate is where do I want to center the map 
var projection = d3.geo.albersUsa()
                       .translate([w/2, h/2]) // where to center
                       .scale([1000]); // scale of map can be looked up on d3 site

// below are variables in JS being set up for use later
// Define path generator -- creates the big d path number and draws them.
var path = d3.geo.path()
                 .projection(projection);
                 
// Define quantize scale to sort data values into buckets of color; data to be passed in later
// domain goes in, range comes out
// whatever goes into this (domain) will put out (range) one of the 5 colors below:
var color = d3.scale.quantize()
                    .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
                    //Colors taken from colorbrewer.js, included in the D3 download

// Create SVG element/ container variable?
var svg = d3.select("#map")
            .append("svg") // container
            .attr("width", w)
            .attr("height", h);

// Load in agriculture data first so it can be available to become choropleth definers
d3.json( "geojson/D13Enrollment06-15.geojson", function( data ) {
// above: takes data and sticks it into variable called data: (function(data))
    // Set input domain for color scale
    color.domain([  // this is what will go into color, values and high and low unknown at this point
      // d3 to figure out: data comes out of csv just above on line 33
        d3.min(data, function(d) { return d.value; }), // looks for and returns smallest data in value column ("value" is name of column of the fields in csv)
        d3.max(data, function(d) { return d.value; }) //  looks for and returns largest
        // this puts domain into color scale, color variable returns range
    ]);

    // Load in GeoJSON data: opens and loads state data into variable called json
    d3.json("geojson/D13Enrollment06-15.geojson", function(json) {

        // Merge the ag. data and GeoJSON
        // Loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {
    
            var dataSchool = data[i].school;              //Grab state name
            var dataValue = parseFloat(data[i].value);  //Grab data value, and convert from string to float
    // parseFloat converts strngs to numbers, float refers to real numbers/ decimals rather than integers
    // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
            
                var jsonSchool = json.features[j].properties.school;
    // set new variable to compare below
                if (dataSchool == jsonSchool) {
              
                    // Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;
                    // console.log(dataValue);
                    //console.log(json.features[j]properties.value;
                    // Stop looking through the JSON
                    break;
                    
                }
            }       
        }

// function drawDots(dataset) 
//   console.log(dataset);
// drawing paths 
        // Bind data and create one path per GeoJSON feature
        // var paths = svg.selectAll("path")
        //    .data(json.features) // this instructs to look at all features not just json as a whole
        //    .enter()
        //    .append("path")
        //    .attr("d", path) // this is path function set earlier with projection set
        //    .style("fill", function(d) {
        //         // Get data value
        //         var value = d.properties.GrowthDecline;
        //         // gets value from aboave and use it to set color
        //         if (value) {
        //             // If value exists…
        //             return color(value);
        //         } else {
        //             // If value is undefined…
        //             return "#ccc";
        //         }
        //    });

        //Load in cities data

            // svg is continuously called from top
        // use order of code to stack layers. can not be manipulated later
      var circles =  svg.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
                   // sets center x value of circle with projection details and use it to draw json stuff
                   // returns a new x and y coordinate; we only need the x for now which is why the [0] is there 
                   // that selects first coordinate of  lon/lat pair
                   // log here to see if numbers returned are within svg canvas size
               })
               .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
                   //returns y value
               })
               .attr("r", function(d) {
                    return Math.sqrt(parseInt(d.GrowthDecline) * 0.00004);
                    // math to make size of population based city dots are reasonable
                    // use square root to manage outliers like NYC -- radius for NYC would be enormous and others tiny
               })
               // set these styles explicity rather than in css just so they can be fiddled/experimented with easily
               .style("fill", "grey") // setting style with style function: .style
               .style("stroke", "white")
               .style("opacity", 0.75); 
    
    });
}); // why isn't this linking/pairing to brackets at top of document? 


