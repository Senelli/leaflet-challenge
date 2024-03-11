# leaflet-challenge
## Part 1: Created the Earthquake Visualization
- Obtained dataset the USGS which provides earthquake data fpr the past 7 days in JSON format
- Imported and visualize the data by doing the following:
    - Using Leaflet, created a map that plots all the earthquakes from the dataset based on their longitude and latitude.
        - The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.
    - Included popups that provide additional information about the earthquake when its associated marker is clicked.
    - Created a legend that will provide context for the map data.
## Part 2: Gather and Plot More Data (Optional with no extra points earning)
- Plotted a second dataset on the map to illustrate the relationship between tectonic plates and seismic activity using the data on tectonic plates found at https://github.com/fraxen/tectonicplatesLinks 
- Performed the following tasks:
    - Plotted the tectonic plates dataset on the map in addition to the earthquakes.
    - Added other base maps to choose from (topographical map).
    - Separated each dataset into separate overlays so that it can be turned on and off independently.
    - Added layer controls to the map.