let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to data from JSON url
d3.json(queryUrl).then(function (data) {
  // get data from features and send it to createfeatures function
  createFeatures(data.features);
});

// this function sets the size of the marker based on magnitude
function markerSize(magnitude) {
  return magnitude * 2000;
};

// this function sets the color of the marker based on depth
function markerColor(depth) {
  if (depth < 10) return "#00FF00";
  else if (depth < 30) return "greenyellow";
  else if (depth < 50) return "yellow";
  else if (depth < 70) return "orange";
  else if (depth < 90) return "orangered";
  else return "#FF0000";
};

function createFeatures(earthquakeData) {

  // this function is run for all features on the features array
  // it displays a popup with the location, date/time, magnitude, and depth of the earthquake when the user clicks on the marker
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // this function is run for all features on the features array
  // it sets markers for earthquakes on the map based on latitude and longitude and size of marker is based on magnitude and the color is based on the depth
  function pointToLayer(feature, latlng) {
    return L.circle(latlng, {
      radius: markerSize(feature.properties.mag),
      fillColor: markerColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.7,
      color: "black",
      stroke: true,
      weight: 0.5
    });
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object
  let earthquakes = L.geoJSON(earthquakeData, {
    // generates a popup with details for each earthquake from the features array
    onEachFeature: onEachFeature,
    // sets color and size of markers
    pointToLayer: pointToLayer
  });

  // earthquakes layer is passed to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Create a baseMaps object
  let baseMaps = {
    "Street Map": street
  };

  // Create an overlay object to hold our overlay
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create the map, set the streetmap and earthquakes layers to display on load
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // create a legend displaying color keys for depth of earthquakes
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];

    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>";

    for (let i = 0; i < depth.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        markerColor(depth[i] + 1) +
        '"></i> ' +
        depth[i] +
        (depth[i + 1] ? "&ndash;" + depth[i + 1] + "<br>" : "+");
    }
    return div;
  };
  legend.addTo(myMap);
};
