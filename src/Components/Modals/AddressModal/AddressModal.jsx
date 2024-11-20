import React, { useState, useEffect, useCallback } from 'react';
import { Map, Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../../Modals/AddressModal/AddressModal.module.css';

const AddressModal = () => {
  const [location, setLocation] = useState({ lat: 34.0837, lng: 74.7973 });
  const [address, setAddress] = useState({
    pincode: '',
    city: '',
    state: '',
    area: ''
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapboxToken = 'pk.eyJ1IjoiYWFxaWJiaGF0dCIsImEiOiJjbTNmb3cyczEwNnY1MmpxdzMwMGQ1a3k4In0.L3miKHSml4H6ejRnrepf_w';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        () => {
          console.error('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      if (data.features[0]) {
        const addressData = data.features[0].context;
        setAddress({
          pincode: addressData.find((comp) => comp.id.includes('postcode'))?.text || '',
          city: addressData.find((comp) => comp.id.includes('locality'))?.text || '',
          state: addressData.find((comp) => comp.id.includes('region'))?.text || '',
          area: addressData.find((comp) => comp.id.includes('neighborhood'))?.text || ''
        });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const onMapClick = useCallback((e) => {
    const newLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
    setLocation(newLocation);
    fetchAddress(newLocation.lat, newLocation.lng);
    setSelectedPlace(newLocation);  // Set selected place to show popup for this location
  }, []);

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <Map
          initialViewState={{
            longitude: location.lng,
            latitude: location.lat,
            zoom: 13
          }}
          style={{ width: '100%', height: '400px', borderRadius: '10px' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onClick={onMapClick}
          mapboxAccessToken={mapboxToken}
        >
          <Marker longitude={location.lng} latitude={location.lat} />

          {selectedPlace && (
            <Popup
              longitude={selectedPlace.lng}
              latitude={selectedPlace.lat}
              onClose={() => setSelectedPlace(null)}
            >
              <div>
                <h6>Selected Location</h6>
                <p>Latitude: {selectedPlace.lat}</p>
                <p>Longitude: {selectedPlace.lng}</p>
              </div>
            </Popup>
          )}
          
          <NavigationControl position="top-left" />
        </Map>

        <div className={styles.inputsdiv}>
          <div className={styles.streetdiv}>
            <label htmlFor="street">Street Name</label><br />
            <input type="text" id="street" placeholder="Enter Street Name" />
          </div>
          <div className={styles.landmarkdiv}>
            <label htmlFor="landmark">Landmark</label><br />
            <input type="text" id="landmark" placeholder="Enter Landmark" />
          </div>
          <div className={styles.areadiv}>
            <label htmlFor="area">Area</label><br />
            <input type="text" id="area" placeholder="Enter Area Name" value={address.area} readOnly />
          </div>
          <div className={styles.pincodediv}>
            <label htmlFor="pincode">Pincode</label><br />
            <input type="text" id="pincode" placeholder="Enter Pincode" value={address.pincode} readOnly />
          </div>
          <div className={styles.citydiv}>
            <label htmlFor="city">City / Town</label><br />
            <input type="text" id="city" placeholder="Enter City / Town Name" value={address.city} readOnly />
          </div>
          <div className={styles.statediv}>
            <label htmlFor="state">State</label><br />
            <input type="text" id="state" placeholder="Enter State Name" value={address.state} readOnly />
          </div>
        </div>

        <div className={styles.buttondiv}>
          <button onClick={() => console.log(location)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
