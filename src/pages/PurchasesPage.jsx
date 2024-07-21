import React from 'react';
import PurchasesCard from '../components/purchasesPage/PurchasesCard';
import './styles/purchasesPage.css';
import { useSelector } from 'react-redux';

const PurchasesPage = () => {

    const cartSlice = useSelector(store => store.cartSlice);
    const purchases = JSON.parse(localStorage.getItem('purchases'));

    const dates = [];
    for (const prod of purchases) {
        if (!dates.includes(prod.date)) {
            dates.push(prod.date);
        }
    }

    const count = (date) => {
        const prods = purchases.filter(prod => prod.date === date);
        return prods.reduce((cv, prod) => cv += prod.quantity, 0);
    }

    const total = (date) => {
        const prods = purchases.filter(prod => prod.date === date);
        return prods.reduce(
            (cv, prod) => cv += prod.quantity * prod.price, 0
        );
    }

    console.log(cartSlice);

  return (
    <div className='purchasespage'>
        {
            dates.map(date => (
                <div key={date} className='purchase'>
                    <h3 className='purchase__date'>
                        <span>{date.split('T')[0]}</span>
                        <span>{date.split('T')[1].slice(0,8)}</span>
                    </h3>
                    {
                        purchases.filter(prod =>
                            prod.date === date)
                            .map(prod => (
                            <PurchasesCard
                                key={prod.id}
                                prod={prod}
                            />
                        ))
                    }
                    <ul className='purchase__list'>
                        <li className='purchase__item'><span>Total Products: </span><span>{count(date)}</span></li>
                        <li className='purchase__item'><span>Total Price: </span><span>$ {total(date)}</span></li>
                    </ul>
                </div>
            ))
        }
    </div>
  )
}

export default PurchasesPage;