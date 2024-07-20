import React, { useState } from 'react';
import './styles/modeButton.css';
const body = document.querySelector('body');

const ModeButton = () => {

    const [power, setPower] = useState();

    const handleSwitch = () => {
        setPower(!power);
        body.classList.toggle('dark');
    }

  return (
    <div className='modebutton'>
        <ion-icon name="moon-outline"></ion-icon>
        <div onClick={handleSwitch} className={`modebutton__border ${power ? 'active' : ''}`}>
            <div className='modebutton__switch'></div>
        </div>
        <ion-icon name="sunny-outline"></ion-icon>
    </div>
  )
}

export default ModeButton;