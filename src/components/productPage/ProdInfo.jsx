import React, { useState } from 'react';
import './styles/prodInfo.css';

const ProdInfo = ({product}) => {

  const [count, setCount] = useState(1);

  return (
    <article className='prodinfo'>
      <h3 className='prodinfo__title'>{product?.title}</h3>
      <span className='prodinfo__category'>{product?.category.name}</span>
      <p className='prodinfo__description'>{product?.description}</p>
      <div className='prodinfo__container'>
        <ul className='prodinfo__list'>
          <li className='prodinfo__item'>Price</li>
          <li className='prodinfo__item'>$ {product?.price}</li>
        </ul>
        <div className='prodinfo__buttons'>
          <button>-</button>
          <span>{count}</span>
          <button>+</button>
        </div>
      </div>
      <button className='prodinfo__btn'>Add to cart</button>
    </article>
  )
}

export default ProdInfo;