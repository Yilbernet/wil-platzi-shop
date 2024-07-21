import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const root = document.querySelector('#root');
import './styles/navBar.css';
import { useDispatch, useSelector } from 'react-redux';
import CartProd from '../cartPage/CartProd';
import { setCart } from '../../store/slices/cart.slice';

const NavBar = () => {

  const records = JSON.parse(localStorage.getItem('purchases')) || [];
  const [purchases, setPurchases] = useState(records);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [pay, setPay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartSlice = useSelector(store => store.cartSlice);

  useEffect(() => {
    if (cartSlice.length) {
      setTimeout(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2500);
      }, 500);
    }
  }, [cartSlice]);

  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);
  
  const handleModal = (event) => {
    const email = localStorage.getItem('email_token');
    event.nativeEvent.stopImmediatePropagation();
    if (email?.includes('@')) {
      setModal(!modal);
    } else {
      navigate('/login');
    }
  }

  const handleStop = (event) => {
    event.nativeEvent.stopImmediatePropagation();
  }

  root.addEventListener('click', () => {
    setModal(false);
  });

  const handleReset = () => {
    dispatch(setCart([]));
  }

  const handleBuy = () => {
    setTimeout(() => {
      setPay(true);
      setTimeout(() => {
        setPay(false);
      }, 2500);
    }, 500);
    setPurchases([...purchases, ...cartSlice.map(
      prod => { return {...prod, date: new Date()} }
    )]);
    dispatch(setCart([]));
  }

  const count = cartSlice.reduce(
    (cv, prod) => cv += prod.quantity, 0
  );

  const total = cartSlice.reduce(
    (cv, prod) => cv += prod.quantity * prod.price, 0
  );

  return (
    <div className='navbar'>
      <div className='navbar__navbar'>
          <h1 className='navbar__title'><Link to='/'>Platzi-Shop</Link></h1>
          <ul className='navbar__list'>
            <li className='navbar__item'>
              <Link to='/login'>
                <ion-icon name="person-sharp"></ion-icon>
              </Link>
            </li>
            <li className='navbar__item'>
              <Link to='/purchases'>
                <ion-icon name="receipt"></ion-icon>
              </Link>
            </li>
            <li className='navbar__item'>
              <button className='navbar__toggle' onClick={handleModal}>
                <ion-icon name="cart"></ion-icon>
                <span className='navbar__count'>{count}</span>
              </button>
            </li>
          </ul>
      </div>
      <div className={`navbar__modal ${modal ? 'active' : ''}`}
            onClick={handleStop}>
        <div className='navbar__buttons'>
          <button onClick={handleReset}>Reset cart</button>
          <button onClick={handleModal}>
            <ion-icon name="close-sharp"></ion-icon>
          </button>
        </div>
        <div className='navbar__products'>
          {
            cartSlice.map(prod => (
              <CartProd
                key={prod.id}
                prod={prod}
              />
            ))
          }
        </div>
        <div className='navbar__totals'>
          <ul>
            <li><span>Products: </span><span>{count}</span></li>
            <li><span>Total: </span><span>$ {total}</span></li>
          </ul>
          <button className='navbar__buy' onClick={handleBuy}>
            Buy
          </button>
        </div>
      </div>
      {/* <picture>
          <source media="(min-width: 900px)" srcset="grande.png"/>
          <source media="(min-width: 550px)" srcset="media.png"/>
          <source srcset="peque.png"/>
          <img src="predeterminado.png" alt="" />
      </picture> */}
      <p className={`navbar__alert ${alert ? 'active' : ''}`}>
        The cart has been modified successfully ✔
      </p>
      <p className={`navbar__pay ${pay ? 'active' : ''}`}>
        Thank you for you buy! go back soon! ✔
      </p>
    </div>
  )
}

export default NavBar;