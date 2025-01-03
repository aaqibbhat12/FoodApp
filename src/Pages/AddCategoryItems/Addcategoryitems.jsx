import React, { useState } from 'react';
import styles from '../../Pages/AddCategoryItems/Addcategoryitems.module.css';
import Vector from '../../assets/Images/Vector (18).png';
import axios from 'axios';
import BASE_URI from '../../uri.config';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddCustomizatonModal from '../../Components/Modals/AddCustomization/AddCustomizationModals/AddCustomizatonModal';

const Addcategoryitems = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate(); // For navigation
  const [imageFile, setImageFile] = useState(null); // Hold the actual image file
  const [images, setImages] = useState([]); // Hold the preview URL for the image
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customizationId, setCustomizationId] = useState(null); // State for customization ID

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImageFile(file); // Store the actual file
      setImages([URL.createObjectURL(file)]); // Generate a preview URL
    }
  };

  // Common function to handle API calls
  const handleApiCall = async () => {
    if (!itemName || !itemPrice || !categoryType || !imageFile) {
      toast.error('Please Fill All The Fields and Add an Image!');
      return;
    }

    // Create FormData to send image file to the backend
    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('description', itemDescription);
    formData.append('price', itemPrice);
    formData.append('type', categoryType);
    formData.append('thumbnail', imageFile); // Attach the actual file

    try {
      const response = await axios.post(`${BASE_URI}/api/items/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token
          'Content-Type': 'multipart/form-data', // Ensure correct header for file uploads
        },
      });

      const { id: createdId } = response.data.data;
      setCustomizationId(createdId);

      return true; // Indicate success
    } catch (error) {
      console.error('Error adding item:', error.response?.data?.message);
      toast.error(error.response?.data?.message || 'Failed to add item.');
      return false; // Indicate failure
    }
  };

  // Handle "Add Customization" button click
  const handleAddCustomization = async () => {
    const isSuccessful = await handleApiCall();
    if (isSuccessful) {
      setIsModalOpen(true);
    }
  };

  // Handle "Add Item" button click
  const handleAddItem = async () => {
    const isSuccessful = await handleApiCall();
    if (isSuccessful) {
      toast.success('Item Added Successfully!');
      navigate('/addcategory'); // Navigate to addcategory
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCustomizationId(null); // Reset the customization ID when the modal is closed
  };

  return (
    <>
      <AddCustomizatonModal 
        id={customizationId} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
      <div className={styles.container}>
        <div className={styles.toptextdiv}>Add Menu 1 Category 1 Items</div>
        <div className={styles.secondiv}>
          <div className={styles.leftdiv}>
            <div className={styles.itemName}>
              <label htmlFor="name">Item Name <span>*</span></label><br />
              <input
                type="text"
                placeholder="Enter Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className={styles.itemName}>
              <label htmlFor="name">Item Image <span>*</span></label><br />
              <input
                type="text"
                placeholder="Select an Image"
                readOnly
              />
              <img
                src={Vector}
                alt="Vector"
                className={styles.image}
                onClick={() => document.getElementById('fileInput').click()}
              />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
            <div className={styles.imagesdiv}>
              {images.length > 0 && <img src={images[0]} alt="Uploaded" />}
            </div>
            <div className={styles.button}>
              <button onClick={handleAddCustomization}>Add Customization</button>
            </div>
          </div>
          <div className={styles.rightdiv}>
            <div className={styles.itemName}>
              <label htmlFor="price">Item Price <span>*</span></label><br />
              <input
                type="text"
                placeholder="Enter Price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>
            <div className={styles.itemDescription}>
              <label htmlFor="description">Item Description</label><br />
              <textarea
                id="description"
                placeholder="Enter Description For Item"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.selectiondiv}>
              <label htmlFor="categoryType">Category Type <span>*</span></label><br />
              <select
                id="categoryType"
                className={styles.customselect}
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                <option value="non-veg">Non-Veg</option>
                <option value="veg">Veg</option>
              </select>
            </div>
            <div className={styles.addItem}>
              <button onClick={handleAddItem}>Add Item</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addcategoryitems;
