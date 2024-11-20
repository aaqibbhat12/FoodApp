import React from 'react'
import styles from '../../Pages/AddCategory/Addcategory.module.css'

const Addcategory = () => {
  return (
    <div className={styles.container}>
           <div className={styles.container}>
     <div className={styles.textdiv}>
      Add Menu 1 Category
     </div>
     <div className={styles.secondContainerdiv}>
        <div className={styles.topdiv}>
          <div className={styles.leftdiv}>
            <label htmlFor="name">Category Name</label><br />
            <input type="text" placeholder='Enter Category Name' />
          </div>
          <div className={styles.rightdiv}>
            <div className={styles.button}>
              <button>Add Category</button>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.addedMenustext}>
          Added Category's
        </div>
        <div className={styles.addedMenus}>
         <div className={styles.menuName}>Category Name</div>
         <div className={styles.categoriesAdded}>Items Added</div>
         <div className={styles.addCategory}>Add Items</div>
        </div>
        <div className={styles.menusdata}>
          <p>Category 1</p>
          <span>1</span>
          <button>Add Items</button>
        </div>
        <div className={styles.menusdata}>
          <p>Category 1</p>
          <span>1</span>
          <button>Add Items</button>
        </div>
        <div className={styles.menusdata}>
          <p>Category 1</p>
          <span>1</span>
          <button>Add Items</button>
        </div>
     </div>
      </div>
        </div>
  )
}

export default Addcategory