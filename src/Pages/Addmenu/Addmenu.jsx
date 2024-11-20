import React from 'react'
import styles from '../../Pages/Addmenu/Addmenu.module.css'

const Addmenu = () => {
  return (
    <div className={styles.container}>
     <div className={styles.textdiv}>
      Add Your Menu
     </div>
     <div className={styles.secondContainerdiv}>
        <div className={styles.topdiv}>
          <div className={styles.leftdiv}>
            <label htmlFor="name">Menu Name</label><br />
            <input type="text" placeholder='Enter Menu Name' />
          </div>
          <div className={styles.rightdiv}>
            <div className={styles.button}>
              <button>Add Menu</button>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.addedMenustext}>
          Added Menu's
        </div>
        <div className={styles.addedMenus}>
         <div className={styles.menuName}>Menu Name</div>
         <div className={styles.categoriesAdded}>Categories Added</div>
         <div className={styles.addCategory}>Add Category</div>
        </div>
        <div className={styles.menusdata}>
          <p>Menu 1</p>
          <span>1</span>
          <button>Add Category</button>
        </div>
        <div className={styles.menusdata}>
          <p>Menu 1</p>
          <span>1</span>
          <button>Add Category</button>
        </div>
        <div className={styles.menusdata}>
          <p>Menu 1</p>
          <span>1</span>
          <button>Add Category</button>
        </div>
     </div>
      </div>
  )
}

export default Addmenu