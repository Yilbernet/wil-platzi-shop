import React from 'react';
import { useForm } from 'react-hook-form';
import './styles/filterPrice.css';
let outReset;

const FilterPrice = ({setPrice}) => {

    const { handleSubmit, register, reset } = useForm();

    const submit = data => {
        setPrice({
            min: data.min || 0,
            max: data.max || Infinity,
        });
    }

    outReset = reset;

  return (
    <form className='filterprice' onSubmit={handleSubmit(submit)}>
        <h3 className='filterprice__title'>Filter price</h3>
        <div className='filterprice__field'>
            <label htmlFor="min">Min</label>
            <input {...register('min')} id='min' type="text" />
        </div>
        <div className='filterprice__field'>
            <label htmlFor="max">Max</label>
            <input {...register('max')} id='max' type="text" />
        </div>
        <button className='filterprice__btn'>Send</button>
    </form>
  )
}

export const resetPrice = () => {
    outReset({
        min: '',
        max: '',
    });
}

export default FilterPrice;