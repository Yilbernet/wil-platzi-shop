import React from 'react';
import './styles/prodCard.css';
import { useDispatch } from 'react-redux';
import { addCart, updCart } from '../../store/slices/cart.slice';

const ProdCard = ({prod}) => {

    const dispatch = useDispatch();

    const handleAddCart = () => {
        if (prod.quantity) {
            dispatch(updCart({
                id: prod.id,
                quantity: 1,
            }));
        } else {
            prod.quantity = 1;
            dispatch(addCart(prod));
        }
    }

  return (
    <div className='prodcard'>
        <figure className='prodcard__img'>
            <img
                src={
                    prod.images[0].endsWith(']') ?
                    prod.images[0].slice(2, -2) : 
                    prod.images[0].startsWith('[') ?
                    prod.images[0].slice(2, -1) : 
                    prod.images[0]
                }
                alt="product image"
            />
        </figure>
        <h3 className='prodcard__title'>{prod.title}</h3>
        <ul className='prodcard__list'>
            <li className='prodcard__item'><span>Category: </span><span>{prod.category.name}</span></li>
            <li className='prodcard__item'><span>Price: </span><span>$ {prod.price}</span></li>
        </ul>
        <div className='prodcard__buttons'>
            <button>View detail</button>
            <button onClick={handleAddCart}>Add to cart</button>
        </div>
    </div>
  )
}

export default ProdCard;