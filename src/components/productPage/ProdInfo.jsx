import React, { useState } from 'react';
import './styles/prodInfo.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, updCart } from '../../store/slices/cart.slice';

const ProdInfo = ({product}) => {

  const [count, setCount] = useState(1);
  const cartSlice = useSelector(store => store.cartSlice);
  const email = localStorage.getItem('email_token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLess = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const handlePlus = () => {
    setCount(count + 1);
  }

  const handleAddCart = () => {
    if (email?.includes('@')) {
        if (cartSlice.find(item => item.id===product.id)) {
            dispatch(updCart({
                id: product.id,
                quantity: count,
            }));
        } else {
            dispatch(addCart({
                item: product,
                quantity: count,
            }));
        }
    } else {
        navigate('/login');
    }
}

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
          <button onClick={handleLess}>-</button>
          <span>{count}</span>
          <button onClick={handlePlus}>+</button>
        </div>
      </div>
      <button className='prodinfo__btn' onClick={handleAddCart}>
        Add to cart
      </button>
    </article>
  )
}

export default ProdInfo;