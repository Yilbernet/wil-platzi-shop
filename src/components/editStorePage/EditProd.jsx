import React, { useState } from 'react';
import './styles/editProd.css';
import Confirmation from './Confirmation';
import { setUpdate } from '../../store/slices/update.slice';
import { useDispatch } from 'react-redux';

const EditProd = ({prod, deleteProduct}) => {

  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setUpdate(prod));
  }

  const handleDelete = () => {
    setConfirm(true);
  }

  return (
    <div className='editprod'>
        <h3 className='editprod__title'>{prod.title}</h3>
        <figure className='editprod__img'>
            <img src={
                prod.images[0].endsWith(']') ?
                prod.images[0].slice(2, -2) : 
                prod.images[0].startsWith('[') ?
                prod.images[0].slice(2, -1) : 
                prod.images[0]
            } alt="product image" />
        </figure>
        <button className='EditProd__btn' onClick={handleEdit}>
          Edit
        </button>
        <button className='EditProd__btn' onClick={handleDelete}>
          Delete
        </button>
        <Confirmation
          confirm={confirm}
          setConfirm={setConfirm}
          deleteProduct={deleteProduct}
          prod={prod}
        />
    </div>
  )
}

export default EditProd;