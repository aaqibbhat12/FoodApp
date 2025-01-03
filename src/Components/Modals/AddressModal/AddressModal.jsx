import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../../Store/Slices/mapDataSlice';
import { Map, Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../../Modals/AddressModal/AddressModal.module.css';
import { useNavigate } from 'react-router-dom';

const AddressModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressFromRedux = useSelector((state) => state.address);

  const [location, setLocation] = useState({ lat: 34.0837, lng: 74.7973 });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const mapboxToken = 'pk.eyJ1IjoiYWFxaWJiaGF0dCIsImEiOiJjbTNmb3cyczEwNnY1MmpxdzMwMGQ1a3k4In0.L3miKHSml4H6ejRnrepf_w';

  useEffect(() => {
    console.log('Address from Redux on Component Load:', addressFromRedux);
  }, [addressFromRedux]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      if (data.features[0]) {
        const addressData = data.features[0].context;
        const updatedAddress = {
          pincode: addressData.find((comp) => comp.id.includes('postcode'))?.text || '',
          city: addressData.find((comp) => comp.id.includes('locality'))?.text || '',
          state: addressData.find((comp) => comp.id.includes('region'))?.text || '',
          area: addressData.find((comp) => comp.id.includes('neighborhood'))?.text || '',
          street: addressData.find((comp) => comp.id.includes('street'))?.text || '',
          landmark:addressData.find((comp) => comp.id.includes('landmark'))?.text || '',
          latitude: lat,
          longitude: lng,
        };
        console.log('Fetched Address Data:', updatedAddress);
        dispatch(setAddress(updatedAddress));
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleChange = (e) => {
    const updatedState = {
      ...addressFromRedux,
      [e.target.id]: e.target.value,
    };
    console.log(`Updated State for ${e.target.id}:`, updatedState);
    dispatch(setAddress(updatedState));
  };

  const onMapClick = useCallback((e) => {
    const newLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
    console.log('Map Clicked Location:', newLocation);
    setLocation(newLocation);
    fetchAddress(newLocation.lat, newLocation.lng);
    setSelectedPlace(newLocation);
  }, []);

  const handleSave = () => {
    console.log('Final Address Data:', addressFromRedux);
    console.log('Final Location:', location);
    setIsModalOpen(false);
    navigate('/registrationform1');
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <Map
          initialViewState={{
            longitude: location.lng,
            latitude: location.lat,
            zoom: 13,
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
            <input
              type="text"
              id="street"
              placeholder="Enter Street Name"
              value={addressFromRedux.street }
              onChange={handleChange}
            />
          </div>
          <div className={styles.landmarkdiv}>
            <label htmlFor="landmark">Landmark</label><br />
            <input
              type="text"
              id="landmark"
              placeholder="Enter Landmark"
              value={addressFromRedux.landmark}
              onChange={handleChange}
            />
          </div>
          <div className={styles.areadiv}>
            <label htmlFor="area">Area</label><br />
            <input
              type="text"
              id="area"
              placeholder="Enter Area Name"
              value={addressFromRedux.area || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.pincodediv}>
            <label htmlFor="pincode">Pincode</label><br />
            <input
              type="text"
              id="pincode"
              placeholder="Enter Pincode"
              value={addressFromRedux.pincode || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.citydiv}>
            <label htmlFor="city">City / Town</label><br />
            <input
              type="text"
              id="city"
              placeholder="Enter City / Town Name"
              value={addressFromRedux.city || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.statediv}>
            <label htmlFor="state">State</label><br />
            <input
              type="text"
              id="state"
              placeholder="Enter State Name"
              value={addressFromRedux.state || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.latitudediv}>
            <label htmlFor="latitude">Latitude</label><br />
            <input
              type="text"
              id="latitude"
              placeholder="Enter Latitude"
              value={addressFromRedux.latitude || location.lat}
              onChange={handleChange}
            />
          </div>
          <div className={styles.longitudediv}>
            <label htmlFor="longitude">Longitude</label><br />
            <input
              type="text"
              id="longitude"
              placeholder="Enter Longitude"
              value={addressFromRedux.longitude || location.lng}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.buttondiv}>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
