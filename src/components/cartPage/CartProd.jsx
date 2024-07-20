import React, { useEffect, useState } from 'react';
import './styles/cartProd.css';
import { useDispatch } from 'react-redux';
import { delCart, updCart } from '../../store/slices/cart.slice';

const CartProd = ({prod}) => {

    const [count, setCount] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
      setCount(prod.quantity);
    }, [prod.quantity]);

    const handleLess = () => {
      if (count > 1) {
        dispatch(updCart({
          id: prod.id,
          quantity: -1,
        }));
      }
    }

    const handlePlus = () => {
      dispatch(updCart({
        id: prod.id,
        quantity: 1,
      }));
    }

    const handleDel = () => {
      dispatch(delCart(prod.id));
    }

  return (
    <article className='cartprod'>
      <h3 className='cartprod__title'>{prod.title}</h3>
      <figure className='cartprod__img'>
        <img src={
          prod.images[0].endsWith(']') ?
          prod.images[0].slice(2, -2) : 
          prod.images[0].startsWith('[') ?
          prod.images[0].slice(2, -1) : 
          prod.images[0]
        } alt="product image" />
      </figure>
      <div className='cartprod__buttons'>
        <button onClick={handleLess}>-</button>
        <span>{count}</span>
        <button onClick={handlePlus}>+</button>
      </div>
      <button className='cartprod__del' onClick={handleDel}>
        <ion-icon name="trash-sharp"></ion-icon>
      </button>
      <ul className='cartprod__list'>
        <li className='cartprod__item'>
          <span>Price: </span>
          <span>$ {prod.price}</span>
        </li>
        <li className='cartprod__item'>
          <span>Total: </span>
          <span>$ {prod.price * count}</span>
        </li>
      </ul>
    </article>
  )
}

export default CartProd;