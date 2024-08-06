import React from 'react';
import './styles/confirmation.css';

const Confirmation = ({confirm, setConfirm, deleteProduct, prod}) => {

    const handleCancel = () => {
        setConfirm(false);
    }

    const handleConfirm = () => {
        deleteProduct(`/products`, prod.id);
        setConfirm(false);
    }

  return (
    <div className={`confirmation ${confirm ? 'active' : '' }`}>
        <div className='confirmation__container'>
            <h3 className='confirmation__title'>Are you sure?</h3>
            <div className='confirmation__buttons'>
                <button className='confirmation__cancel'
                    onClick={handleCancel}>
                    Cancel
                </button>
                <button className='confirmation__accept'
                    onClick={handleConfirm}>
                    Accept
                </button>
            </div>
        </div>
    </div>
  )
}

export default Confirmation;