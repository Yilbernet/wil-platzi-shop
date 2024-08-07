import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles/modalCreate.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdate } from '../../store/slices/update.slice';

const ModalCreate = ({form, setForm, createProduct,
    updateProduct, products}) => {

    const [errorCreate, setErrorCreate] = useState();
    const { handleSubmit, register, reset } = useForm();
    const updateSlice = useSelector(store => store.updateSlice);
    const areaText = useRef();
    const dispatch = useDispatch();

    const format = (image) => {
        if (image) {
            return image.endsWith(']') &&
            image.startsWith('[') ?
            image.slice(2, -2) : 
            image.endsWith(']') ?
            image.slice(1, -2) : 
            image.startsWith('[') ?
            image.slice(2, -1) : 
            image.endsWith('"') ?
            image.slice(1, -1) :
            image;
        }
    }

    useEffect(() => {
        if (updateSlice) {
            reset({
                title: updateSlice.title,
                price: updateSlice.price,
                categoryId: updateSlice.category.id,
                image1: format(updateSlice.images[0]),
                image2: format(updateSlice.images[1]),
                image3: format(updateSlice.images[2]),
            });
            areaText.current.value = updateSlice.description;
            setForm(true);
        }
    }, [updateSlice]);

    useEffect(() => {
        if (products?.message) {
            setErrorCreate(products.message[0]);
        } else {
            reset({
                title: '',
                price: '',
                categoryId: '',
                image1: '',
                image2: '',
                image3: '',
            });
            areaText.current.value = '';
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
        const description = areaText.current.value.trim();
        if (updateSlice) {
            updateProduct('/products', {
                title: data.title,
                price: data.price,
                description: description,
                categoryId: data.categoryId,
                images: images,
            }, updateSlice.id);
            dispatch(setUpdate(null));
        } else {
            createProduct('/products', {
                title: data.title,
                price: data.price,
                description: description,
                categoryId: data.categoryId,
                images: images,
            });
        }
    }

    const handleClose = () => {
        reset({
            title: '',
            price: '',
            categoryId: '',
            image1: '',
            image2: '',
            image3: '',
        });
        areaText.current.value = '';
        dispatch(setUpdate(null));
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
                <textarea ref={areaText} type="text" id="description">
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