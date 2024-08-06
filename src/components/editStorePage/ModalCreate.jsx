import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles/modalCreate.css';

const ModalCreate = ({form, setForm, createProduct,
    updateProduct, products}) => {

    const [errorCreate, setErrorCreate] = useState();
    const { handleSubmit, register, reset } = useForm();

    useEffect(() => {
        if (products?.message) {
            setErrorCreate(products.message[0]);
        } else {
            reset({
                title: '',
                price: '',
                description: '',
                categoryId: '',
                image1: '',
                image2: '',
                image3: '',
            });
            setForm(false);
        }
    }, [products]);

    const submit = data => {
        const images = [];
        for (let i = 0; i < 3; i++) {
            if (data[`image${i+1}`]) {
                images.push(data[`image${i+1}`]);
            }
        }
        createProduct('/products', {
            title: data.title,
            price: data.price,
            description: data.description,
            categoryId: data.categoryId,
            images: images,
        });
    }

    const handleClose = () => {
        setForm(false);
    }

  return (
    <div className={`modalcreate ${form ? 'active' : ''}`}>
        <h2 className='modalcreate__error'>{errorCreate}</h2>
        <form className='modalcreate__form' onSubmit={handleSubmit(submit)}>
            <button className='modalcreate__close'
                type='button' onClick={handleClose}>
                <ion-icon name="close-sharp"></ion-icon>
            </button>
            <div className='modalcreate__field'>
                <label htmlFor="title">Title</label>
                <input {...register('title')} id='title' type="text" />
            </div>
            <div className='modalcreate__field'>
                <label htmlFor="price">Price</label>
                <input {...register('price')} id='price' type="text" />
            </div>
            <div className='modalcreate__field'>
                <label htmlFor="description">Description</label>
                <textarea {...register('description')} name="text" id="description">
                </textarea>
            </div>
            <div className='modalcreate__field'>
                <label htmlFor="categoryId">Category</label>
                <input {...register('categoryId')} id='categoryId' type="text" />
            </div>
            <div className='modalcreate__field'>
                <label htmlFor="image1">Image1</label>
                <input {...register('image1')} id='image1' type="text" />
            </div>
            <div className='modalcreate__field'>
                <label htmlFor="image2">Image2</label>
                <input {...register('image2')} id='image2' type="text" />
            </div>
            <div className='modalcreate__field'>
                <label htmlFor="image3">Image3</label>
                <input {...register('image3')} id='image3' type="text" />
            </div>
            <button className='modalcreate__btn'>Send</button>
        </form>
    </div>
  )
}

export default ModalCreate;