import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles/modalCategory.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdate } from '../../store/slices/update.slice';

const ModalCategory = ({category, setCategory,
    createCategory, updateCategory, categories}) => {

    const [errorCategory, setErrorCategory] = useState();
    const { handleSubmit, register, reset } = useForm();
    const updateSlice = useSelector(store => store.updateSlice);
    const dispatch = useDispatch();

    useEffect(() => {
      if (updateSlice?.name) {
        reset({
            name: updateSlice.name,
            image: updateSlice.image,
        });
        setCategory(true);
      }
    }, [updateSlice]);

    useEffect(() => {
      if (categories?.message) {
        setErrorCategory(categories.message[0]);
      } else {
        reset({
            name: '',
            image: '',
        });
        setErrorCategory();
        setCategory(false);
      }
    }, [categories]);

    const submit = data => {
        if (updateSlice) {
            updateCategory('/categories', data, updateSlice.id);
            dispatch(setUpdate(null));
        } else {
            createCategory('/categories', data);
        }
    }

    const handleClose = () => {
        reset({
            name: '',
            image: '',
        });
        dispatch(setUpdate(null));
        setErrorCategory();
        setCategory(false);
    }

  return (
    <div className={`modalcategory ${category ? 'active' : ''}`}>
        <h2 className='modalcategory__error'>{errorCategory}</h2>
        <form className='modalcategory__form' onSubmit={handleSubmit(submit)}>
            <button className='modalcategory__close' type='button'
                onClick={handleClose}>
                <ion-icon name="close-sharp"></ion-icon>
            </button>
            <div className='modalcategory__field'>
                <label htmlFor="name">Name</label>
                <input {...register('name')} id='name' type="text" />
            </div>
            <div className='modalcategory__field'>
                <label htmlFor="image">Image</label>
                <input {...register('image')} id='image' type="text" />
            </div>
            <button className='modalcategory__btn'>Send</button>
        </form>
    </div>
  )
}

export default ModalCategory;