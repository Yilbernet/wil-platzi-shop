import React from 'react';

const MenuButton = ({setMenu}) => {

    const handleMenu = (event) => {
      event.stopPropagation();
      setMenu(true);
    }

  return (
    <button onClick={handleMenu}>
      <ion-icon name="filter-sharp"></ion-icon>
    </button>
  )
}

export default MenuButton;