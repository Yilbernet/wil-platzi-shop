import React, { useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import ProdCard from '../homePage/ProdCard';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import './styles/shoesPlace.css';

const ShoesPlace = () => {

    const [products, getProducts] = useCrud();

    const category = 4;

    useEffect(() => {
      getProducts(`/products/?categoryId=${category}`);
    }, []);

    const prodFilters = (prod) => {
      return prod.images[0].includes('https://') &&
              (prod.images[0].includes('.png') ||
              prod.images[0].includes('.jpg') ||
              prod.images[0].includes('.gif') ||
              prod.images[0].includes('.webp') ||
              prod.images[0].includes('.jpeg'));
    }

  return (
    <div className='shoesplace'>
      <Link to={`/category/${category}`}>
        <h2 className='shoesplace__title'>Shoes</h2>
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
            products.filter(prodFilters).map(prod => (
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

export default ShoesPlace;