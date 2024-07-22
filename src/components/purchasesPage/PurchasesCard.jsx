import React from 'react';
import './styles/purchasesCard.css';

const PurchasesCard = ({prod}) => {

  return (
    <div className='purchasescard'>
      <h3 className='purchasescard__title'>{prod.title}</h3>
      <figure className='purchasescard__img'>
        <img src={
          prod.images[0].endsWith(']') ?
          prod.images[0].slice(2, -2) : 
          prod.images[0].startsWith('[') ?
          prod.images[0].slice(2, -1) : 
          prod.images[0]
        } alt="product image" />
      </figure>
      <ul className='purchasescard__list'>
        <li className='purchasescard__item'><span>price</span><span>$ {prod.price}</span></li>
        <li className='purchasescard__item'><span>quantity</span><span>{prod.quantity}</span></li>
        <li className='purchasescard__item'><span>Total</span><span>$ {prod.price * prod.quantity}</span></li>
      </ul>
    </div>
  )
}

export default PurchasesCard;