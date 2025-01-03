import React, { useState, useEffect } from 'react';
import styles from '../../Pages/AddCategory/Addcategory.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URI from '../../uri.config';
import { useNavigate } from 'react-router-dom';

const Addcategory = () => {
  const [addCategory, setaddCategory] = useState('');
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const navigate = useNavigate();

  // Fetch categories on mount, but don't call after adding a category in the useEffect
  useEffect(() => {
   
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/signup');
      toast.error("You are not logged in. Please login to get access!");
    } 
    else{
      fetchCategories();
    }
  }, [navigate]);

  // Function to add a new category
  const category = async () => {
    if (!addCategory.trim()) {
      toast.error("Category name is required.");
      return;
    }
    if (addCategory.length < 3) {
      toast.error("Category name must be at least 3 characters long.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URI}/api/category`, { categoryName: addCategory }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token
        },
      });
      toast.success("Category added successfully.");
      setaddCategory(''); // Clear input field
      // Refresh the categories list after adding the category
      fetchCategories();
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred while adding the category.";
      toast.error(errorMessage);
    }
  };

  // Function to fetch categories
// Function to fetch categories
const fetchCategories = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URI}/api/category`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token
      },
    });
    // console.log("Fetched categories:", response.data.result);
    setCategories(response.data.result || []); // Correctly set the result
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};


  // Handle navigation to add items with the category id
  const handleAddItems = (id) => {
    navigate(`/addcategoryitems/${id}`); // Navigate to additems page with category ID
  };

  return (
    <div className={styles.container}>
      <div className={styles.textdiv}>Add Menu 1 Category</div>
      <div className={styles.secondContainerdiv}>
        <div className={styles.topdiv}>
          <div className={styles.leftdiv}>
            <label htmlFor="name">Category Name</label><br />
            <input
              type="text"
              placeholder="Enter Category Name"
              value={addCategory}
              onChange={(e) => setaddCategory(e.target.value)}
            />
          </div>
          <div className={styles.rightdiv}>
            <div className={styles.button}>
              <button onClick={category}>Add Category</button>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.addedMenustext}>Added Categories</div>
        <div className={styles.addedMenus}>
          <div className={styles.menuName}>Category Name</div>
          <div className={styles.categoriesAdded}>Items Added</div>
          <div className={styles.addCategory}>Add Items</div>
        </div>
        <div className={styles.mainmenudata}>
        {categories.length > 0 ? (
  categories.map((category) => (
    <div key={category.id} className={styles.menusdata}>
      <span>
      <p>{category.category}</p> 
      </span>
      <span><p>{category.item_count}</p></span>
      <span><button onClick={() => handleAddItems(category.id)}><p>Add Items</p></button></span>
    </div>
  ))
) : (
<div className={styles.noData}>
  <span>.</span>
  <span>.</span>
  <span>.</span>
</div>

)}
        </div>
      </div>
    </div>
  );
};

export default Addcategory;
