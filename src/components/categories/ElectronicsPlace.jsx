import React, { useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import ProdCard from '../homePage/ProdCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './styles/electronicsPlace.css';

const ElectronicsPlace = () => {

    const [products, getProducts] = useCrud();

    useEffect(() => {
      getProducts('/products/?categoryId=2');
    }, []);

  return (
    <div className='electronicsplace'>
        <h2 className='electronicsplace__title'>Electronics</h2>
        <Splide options={ {
                type: 'loop',
                autoplay: true,
                interval: 5000,
                perPage: 2,
                perMove: 1,
                direction: 'ttb',
                height   : '900px',
                padding: '10px',
                gap: '10px',
            } } >
            {
                products?.map(prod => (
                    <SplideSlide key={prod.id}>
                        <ProdCard
                            prod={prod}
                        />
                    </SplideSlide>
                ))
            }
        </Splide>
    </div>
  )
}

export default ElectronicsPlace;