import React from 'react';
import { useForm } from 'react-hook-form';
import './styles/modalCategory.css';

const ModalCategory = ({category, setCategory,
    createCategory, updateCategory, categories}) => {

    const { handleSubmit, register, reset } = useForm();

    const submit = data => {
        createCategory('/categories', data);
        reset({
            name: '',
            image: '',
        });
        setCategory(false);
    }

    const handleClose = () => {
        reset({
            name: '',
            image: '',
        });
        setCategory(false);
    }

  return (
    <div className={`modalcategory ${category ? 'active' : ''}`}>
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