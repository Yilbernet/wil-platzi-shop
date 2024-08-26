import React from 'react';

const MenuButton = ({setMenu}) => {

    const handleMenu = (event) => {
      event.stopPropagation();
      setMenu(menu => !menu);
    }

  return (
    <button onClick={handleMenu}>
      <ion-icon name="filter-sharp"></ion-icon>
    </button>
  )
}

export default MenuButton;