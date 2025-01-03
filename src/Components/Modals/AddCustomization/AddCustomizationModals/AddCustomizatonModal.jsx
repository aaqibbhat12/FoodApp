import React, { useEffect, useState } from 'react';
import styles from '../AddCustomizationModals/AddCustomizationModal.module.css';
import PriceModal from '../PriceModal/PriceModal';
import OptionsModal from '../OptionsModal/OptionsModal';
import { toast } from 'react-toastify';
import axios from 'axios';
import BASE_URI from '../../../../uri.config';
import edit from '../../../../assets/Images/edit.png';

const AddCustomizatonModal = ({ id, isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isOptionalModalOpen, setIsOptionalModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [customizations, setCustomizations] = useState([
    { name: 'Size', isNew: false, title_id: null, options: [] },
    { name: 'Toppings', isNew: false, title_id: null, options: [] },
    { name: 'Custom', isNew: false, title_id: null, options: [] },
    { name: 'Quantity', isNew: false, title_id: null, options: [] },
  ]);

  const [editOptionData, setEditOptionData] = useState({
    optionId: null,
    optionName: '',
    optionPrice: '',
  });

  const openModal = (optionTitle, isNew, titleId) => {
    setSelectedOption(optionTitle);
    if (isNew) {
      setIsOptionalModalOpen(true); // Open Optional Modal for "Add" button
    } else {
      setIsPriceModalOpen(true); // Open Price Modal for "+"
    }
  };

  const openEditModal = (optionId, optionName, optionPrice) => {
    setEditOptionData({ optionId, optionName, optionPrice });
    setIsOptionalModalOpen(true); // Reuse OptionsModal for editing
  };

  const closePriceModal = () => {
    setIsPriceModalOpen(false);
    setSelectedOption('');
    fetchCustomizations(); // Refetch the data to update UI
  };

  const closeOptionalModal = () => {
    setIsOptionalModalOpen(false);
    setSelectedOption('');
    fetchCustomizations(); // Refetch the data to update UI
    setEditOptionData({ optionId: null, optionName: '', optionPrice: '' });
  };

  const fetchCustomizations = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found!');
        return;
      }

      const response = await axios.get(
        `${BASE_URI}/api/items/customisation/getItemCustomisations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const apiCustomizations = response.data?.data || [];
      const updatedCustomizations = customizations.map((option) => {
        const apiCustomization = apiCustomizations.find(
          (apiItem) => apiItem.title === option.name
        );
        return {
          ...option,
          isNew: !!apiCustomization,
          title_id: apiCustomization ? apiCustomization.title_id : null,
          options: apiCustomization ? apiCustomization.options : [], // Populate options
        };
      });

      setCustomizations(updatedCustomizations);
      console.log('Fetched Customizations:', apiCustomizations);
    } catch (error) {
      console.error('Error fetching customizations:', error);
    }
  };

  useEffect(() => {
    fetchCustomizations();
  }, [id]);

  return (
    <>
      <PriceModal
        isOpen={isPriceModalOpen}
        onClose={closePriceModal}
        id={id}
        title={selectedOption}
      />
      <OptionsModal
        isOpen={isOptionalModalOpen}
        onClose={closeOptionalModal}
        id={id}
        titleId={
          customizations.find((option) => option.name === selectedOption)?.title_id
        }
        editOptionData={editOptionData} // Pass edit data to OptionsModal
      />

      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.Addoptions}>
            <div className={styles.addoptionsdiv}>
              Add Options
              <div className={styles.cross} onClick={onClose}>X</div>
            </div>
          </div>

          <div className={styles.customtitles}>
            {customizations.map((option) => (
              <div
                key={option.name}
                className={`${styles.title} ${option.isNew ? styles.newItem : ''}`}
              >
                {option.name}
                <span
                  onClick={() => openModal(option.name, option.isNew, option.title_id)}
                  className={styles.addButton}
                >
                  {option.isNew ? 'Add' : '+'}
                </span>

                {option.options.length > 0 && (
                  <div className={styles.optionsList}>
                    {option.options.map((opt) => (
                      <div key={opt.id} className={styles.optionItem}>
                        <span>
                          {opt.option_name}: {opt.additional_price}
                        </span>
                        <button>
                          <img
                            src={edit}
                            alt="Edit"
                            className={styles.editImage}
                            onClick={() => openEditModal(opt.id, opt.option_name, opt.additional_price)}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomizatonModal;
