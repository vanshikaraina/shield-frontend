import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/sensitiveIssues.css';

// Fix marker icons (Leaflet uses default image paths that don't load in modern bundlers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const emojiIcon = new L.DivIcon({
  className: 'custom-emoji-icon',
  html: '📍',
  iconSize: [40, 40],
  iconAnchor: [15, 30],
});

const policeIcon = new L.DivIcon({
  className: 'custom-emoji-icon',
  html: '👮‍♂️',
  iconSize: [40, 40],
  iconAnchor: [15, 30],
});

const LocationSelector = ({ setCoords }) => {
  useMapEvents({
    click(e) {
      setCoords([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const SensitiveIssues = () => {
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState([28.6139, 77.2090]); // Default: Delhi 
  const [policeStations, setPoliceStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationRequested, setLocationRequested] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords([latitude, longitude]);
          setLocationRequested(true);
        },
        (error) => {
          setError('Unable to retrieve your location. Please allow location access.');
          console.warn('Geolocation failed or permission denied:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      console.warn('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (coords && locationRequested) {
      setLoading(true);
      setError(null);
      const query = `
        [out:json];
        node["amenity"="police"](around:15000,${coords[0]},${coords[1]});
        out;
      `;
      axios
        .get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then((res) => {
          const data = res.data.elements.map((el) => ({
            lat: el.lat,
            lon: el.lon,
            name: el.tags.name || 'Police Station',
          }));
          setPoliceStations(data);
        })
        .catch((err) => {
          setError('Error fetching police stations, please try again later.');
          console.error('Error fetching police stations', err);
        })
        .finally(() => setLoading(false));
    }
  }, [coords, locationRequested]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coords || coords.length !== 2) {
      console.error("Location (coordinates) is invalid");
      setError("Please provide a valid location.");
      return;
    }

    const data = {
      name: isAnonymous ? 'Anonymous' : name,
      issueType,
      description,
      location: coords,
    };

    try {

      console.log('Sending data:', data);
      
  const response = await axios.post('http://localhost:5000/api/sensitive', data);
  console.log('Sensitive Issue Submitted:', response.data);
  alert('Sensitive issue submitted successfully!');
} catch (error) {
  // If error is related to the response
  if (error.response) {
    console.error('Response error:', error.response.data);  // Logs the response body (e.g., error message from the backend)
    console.error('Response status:', error.response.status);  // Logs the status code (e.g., 500)
    console.error('Response headers:', error.response.headers);  // Logs the response headers for debugging
  }
  // If error is related to the request
  else if (error.request) {
    console.error('Request error:', error.request);  // Logs the request made to the server
  }
  // If there's an issue setting up the request
  else {
    console.error('Error setting up request:', error.message);  // Logs other error types
  }

  setError('Error submitting the issue. Please try again later.');
}

  };

  return (
    <div className="sensitive-issues-section">
      <h2>Report a Sensitive Issue</h2>
      <p>Select issue type, describe it, and click on the map to pin your location. Nearby police stations will appear.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Submit Anonymously
          </label>
        </div>

        {!isAnonymous && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required={!isAnonymous}
            />
          </div>
        )}

        <div>
          <label>Issue Type:</label>
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
            <option value="">--Select an issue--</option>
            <option value="harassment">Harassment</option>
            <option value="drug-related">Drug-related Activity</option>
            <option value="domestic-abuse">Domestic Abuse Help</option>
            <option value="vandalism">Vandalism</option>
          </select>
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            required
          />
        </div>

        <div>
          <button type="button" onClick={getLocation} className="get-location-btn">
            Get My Location
          </button>
        </div>

        <div>
          <label>Click on the map to select your location:</label>
          <MapContainer
            key={coords.join(',')} // <- Fix applied here
            center={coords}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector setCoords={setCoords} />
            <Marker position={coords} icon={emojiIcon}>
              <Popup>Your Selected Location</Popup>
            </Marker>

            {policeStations.length > 0 && !loading && policeStations.map((station, i) => (
              <Marker key={i} position={[station.lat, station.lon]} icon={policeIcon}>
                <Popup>{station.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {loading && <p>Loading nearby police stations...</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="sensitive-btn">Submit Sensitive Issue</button>
      </form>
    </div>
  );
};

export default SensitiveIssues;




/*
import React from 'react';
import '../styles/sensitiveIssues.css';

const SensitiveIssues = () => {
  return (
    <div className="sensitive-issues-section">
      <h2>For Sensitive Issues</h2>
      <p>
        Some issues may require extra privacy and confidentiality. 
        You can report them here safely and securely.
      </p>
      <button className="sensitive-btn">
        <a href="/sensitive-issues">Submit Sensitive Issue</a>
      </button>
    </div>
  );
};

export default SensitiveIssues;
 */