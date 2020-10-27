
// Create the createMap function
function createMap(airportStations){

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = { "Light Map" : lightmap};

  // Create an overlayMaps object to hold the airportStations layer
  var overlayMaps =  { "Airports": airportStations};

  // Create the map object with options
  var map = L.map("map-id", 
    {center: [40.73, -74.0059],
    zoom: 12,
    layers:[lightmap, airportStations]});

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(map);
}


// Create the createMarkers function
function createMarkers(response){

  // Pull the "stations" property off of response.data
  var stations = response.data;
  // Initialize an array to hold airport markers
  var airportMakers = [];

  // Loop through the stations array
  for (var index = 0; index < stations.length; index++){
    var station = stations[index];

    // For each station, create a marker and bind a popup with the station's name
    var airpoMakers  = L.marker([station.lat, station.lon])
      .bindPopup("<h3>" + station.airport + "</h3> <h3>" + station.city + "</h3> <h3> Flights: " + station.vuelos + "</h3> <h3> Miles: " + station.miles + "</h3> <h3> Number of destinations: " + station.num_dest + "</h3>");

    // Add the marker to the airportMarkers array
    airportMakers.push(airpoMakers);
  }
  // Create a layer group made from the airport markers array, pass it into the createMap function
  createMap(L.layerGroup(airportMakers));
}

// Perform an API call to get station information. Call createMarkers when complete
//d3.json("http://localhost:5000/airportsmap", createMarkers)
d3.json("http://40.125.68.71:5000/airportsmap", createMarkers)