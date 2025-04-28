import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/emergencyResources.css';

const emergencyIcons = {
  police: new L.DivIcon({ className: 'custom-emoji-icon', html: '👮‍♂️', iconSize: [40, 40] }),
  shelter: new L.DivIcon({ className: 'custom-emoji-icon', html: '🏠', iconSize: [40, 40] }),
  hospital: new L.DivIcon({ className: 'custom-emoji-icon', html: '🏥', iconSize: [40, 40] }),
  fire: new L.DivIcon({ className: 'custom-emoji-icon', html: '🔥', iconSize: [40, 40] }),
  womenHelp: new L.DivIcon({ className: 'custom-emoji-icon', html: '🚺', iconSize: [40, 40] }),
};

const LocationSelector = ({ setCoords }) => {
  useMapEvents({
    click(e) {
      setCoords([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const EmergencyResources = () => {
  const [coords, setCoords] = useState([28.6139, 77.2090]); // Default to Delhi
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('police'); // Default filter: police stations

  // Fetch emergency facilities based on location and type
  const fetchFacilities = (location, type) => {
    setLoading(true);
  
    // First, geocode the location to get lat/lon
    axios
      .get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: location,
          format: 'json',
          limit: 1,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          alert('No location found! Please try a different query.');
          setLoading(false);
          return;
        }
  
        const { lat, lon } = response.data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
  
        // Now fetch nearby facilities using Overpass API
        let overpassQuery = `
          [out:json];
          (
            node["amenity"="${mapTypeToAmenity(type)}"](around:30000,${lat},${lon});
            way["amenity"="${mapTypeToAmenity(type)}"](around:30000,${lat},${lon});
            relation["amenity"="${mapTypeToAmenity(type)}"](around:30000,${lat},${lon});
          );
          out center;
        `;
  
        return axios.post('https://overpass-api.de/api/interpreter', overpassQuery, {
          headers: { 'Content-Type': 'text/plain' },
        });
      })
      .then((response) => {
        if (response) {
          // Overpass returns data differently
          const elements = response.data.elements;
          const facilitiesList = elements.map((el) => ({
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
            name: el.tags.name || 'Unknown Facility',
          }));
          setFacilities(facilitiesList);
        }
      })
      .catch((error) => {
        console.error('Error fetching location or facilities:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  // Helper to map your dropdown filter type to OSM amenity tags
  const mapTypeToAmenity = (type) => {
    switch (type) {
      case 'police':
        return 'police';
      case 'hospital':
        return 'hospital';
      case 'fire':
        return 'fire_station';
      case 'shelter':
        return 'shelter'; // You might need to tune this based on OpenStreetMap tags
      case 'womenHelp':
        return 'social_facility'; // Closest mapping, or you can customize
      default:
        return 'police';
    }
  };
  

  const handleLocationSearch = () => {
    if (!searchQuery) {
      alert('Please enter a location');
      return;
    }
    fetchFacilities(searchQuery, selectedFilter);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Fetch location suggestions as the user types
    if (e.target.value.length > 2) {
      axios
        .get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: e.target.value,
            format: 'json',
            addressdetails: 1,
            limit: 10, // Limit to 5 suggestions
          },
        })
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error('Error fetching location suggestions:', error);
        });
    } else {
      setSuggestions([]); // Clear suggestions if input is short
    }
  };

  const handleSuggestionSelect = (location) => {
    setSearchQuery(location.display_name);
    setSuggestions([]); // Clear suggestions
    setCoords([location.lat, location.lon]);
    fetchFacilities(location.display_name, selectedFilter);
  };

  return (
    <div className="emergency-resources-container">
      <h2>Emergency Resources</h2>
      <div className="emergency-resources-section">
        <label>Search Location:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Enter a location or landmark"
        />
        <button onClick={handleLocationSearch}>Search</button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="emergency-resources-section">
        <label>Filter by type:</label>
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="police">Police Stations</option>
          <option value="shelter">Emergency Shelters</option>
          <option value="hospital">Hospitals</option>
          <option value="fire">Fire Stations</option>
          <option value="womenHelp">Women's Help Centers</option>
        </select>
      </div>

      <div className="map-container">
        <MapContainer center={coords} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <LocationSelector setCoords={setCoords} />
          {facilities.map((facility, index) => (
            <Marker
              key={index}
              position={[facility.lat, facility.lon]} // Use lat/lon from the response
              icon={emergencyIcons[selectedFilter]}
            >
              <Popup>
                <strong>{facility.display_name}</strong>
                <br />
                {facility.address ? `${facility.address.road}, ${facility.address.city}` : 'Address not available'}
                <br />
                {/* Add phone number button only if the phone number exists */}
                {facility.phone && (
                  <button onClick={() => window.open(`tel:${facility.phone}`)}>
                    Call Facility
                  </button>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
    </div>
  );
};

export default EmergencyResources;
