import React, { useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import { Link } from 'react-router-dom';
import ProdCard from '../homePage/ProdCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import './styles/miscellaneousPlace.css';

const MiscellaneousPlace = () => {

    const [products, getProducts] = useCrud();

    const category = 5;

    useEffect(() => {
      getProducts(`/products/?categoryId=${category}`);
    }, []);

  return (
    <div className='miscellaneousplace'>
      <Link to={`/category/${category}`}>
        <h2 className='miscellaneousplace__title'>Miscellaneous</h2>
      </Link>
      {
        Array.isArray(products) &&
        <Splide options={ {
            type: 'loop',
            autoplay: true,
            interval: 5000,
            perPage: 4,
            perMove: 1,
            breakpoints: {
              1200: {
                perPage: 3,
              },
              910: {
                perPage: 2,
              },
              650: {
                perPage: 1,
                pagination: false,
              },
            },
            gap: '30px',
            padding: '30px',
          } } >
          {
            products.map(prod => (
              <SplideSlide key={prod.id}>
                  <ProdCard
                      prod={prod}
                  />
              </SplideSlide>
            ))
          }
        </Splide>
      }
    </div>
  )
}

export default MiscellaneousPlace;