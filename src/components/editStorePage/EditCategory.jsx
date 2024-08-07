import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './styles/editCategory.css';
import Confirmation from './Confirmation';
import { setUpdate } from '../../store/slices/update.slice';

const EditCategory = ({cate, deleteCategory}) => {

    const [confirm, setConfirm] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setUpdate(cate));
    }

    const handleDelete = () => {
        setConfirm(true);
    }

  return (
    <div className='editcate'>
        <h3 className='editcate__name'>{cate.name}</h3>
        <figure className='editcate__img'>
            <img src={
                cate.image.endsWith(']') ?
                cate.image.slice(2, -2) : 
                cate.image.startsWith('[') ?
                cate.image.slice(2, -1) : 
                cate.image
            } alt="category image" />
        </figure>
        <button className='editcate__btn' onClick={handleEdit}>
          Edit
        </button>
        <button className='editcate__btn' onClick={handleDelete}>
          Delete
        </button>
        <Confirmation
          confirm={confirm}
          setConfirm={setConfirm}
          deleteProduct={deleteCategory}
          prod={cate}
          path='/categories'
        />
    </div>
  )
}

export default EditCategory;