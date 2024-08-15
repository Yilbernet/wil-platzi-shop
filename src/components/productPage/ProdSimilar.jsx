import React, { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import './styles/prodSimilar.css';
import useCrud from '../../hooks/useCrud';
import ProdCard from '../homePage/ProdCard';

const ProdSimilar = ({product}) => {

  const [products, getProducts] = useCrud();
  
  useEffect(() => {
    if (product) {
      const path = `/products/?categoryId=${product.category.id}`;
      getProducts(path);
    }
  }, [product]);

  const prodFilter = (prod) => {
    const perImage = prod.images[0].includes('https://') &&
                      (prod.images[0].includes('.png') ||
                      prod.images[0].includes('.jpg') ||
                      prod.images[0].includes('.gif') ||
                      prod.images[0].includes('.webp') ||
                      prod.images[0].includes('.jpeg'));
    const perSame = prod.id!==product.id;
    return perImage && perSame;
  }

  return (
    <div className='prodsimilar'>
      <h2 className='prodsimilar__title'>Discover similar products</h2>
      {
        products?.filter(prodFilter).length > 0 &&
        <Splide
          options={ {
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
          } }
        >
          {
            products.filter(prodFilter).map(prod => (
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

export default ProdSimilar;