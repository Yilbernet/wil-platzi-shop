import React, { useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import ProdCard from '../homePage/ProdCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import './styles/electronicsPlace.css';
import { Link } from 'react-router-dom';

const ElectronicsPlace = () => {

    const [products, getProducts] = useCrud();

    const category = 2;

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
    <div className='electronicsplace'>
        <Link to={`/category/${category}`}>
            <h2 className='electronicsplace__title'>Electronics</h2>
        </Link>
        {
            Array.isArray(products) &&
            <Splide options={ {
                    type: 'loop',
                    autoplay: true,
                    interval: 5000,
                    perPage: 2,
                    perMove: 1,
                    direction: 'ttb',
                    height   : '900px',
                    breakpoints: {
                        599: {
                        perPage: 1,
                        height   : '475px',
                        pagination: false,
                        },
                    },
                    padding: '10px',
                    gap: '10px',
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

export default ElectronicsPlace;