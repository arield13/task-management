import React, { useState } from 'react';

interface ListMenuProps {
    id: string;
    removeList: () => void
}
const ListMenu = ({id, removeList}: ListMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = (id: string) => {
    setMenuVisible((prev) => !prev);
  };

  const handleCopyList = () => {
    // Logic to copy the list
    console.log('Copying list...');
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* <button onClick={toggleMenu}>Menu</button> */}
      <button className="menu-list-btn btn" onClick={()=> { toggleMenu(id)} }>...</button>
      {menuVisible && (
        <div className='main-menu-dropdownlist'>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <button className='menu-dropdownlist-btn' onClick={removeList}>Remove List</button>
            </li>
            <li>
              <button className='menu-dropdownlist-btn'onClick={handleCopyList}>Copy List</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListMenu;
