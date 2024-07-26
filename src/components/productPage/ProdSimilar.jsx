import React, { useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Intersection } from "@splidejs/splide-extension-intersection";
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
    return prod.id!==product.id;
  }

  return (
    <div className='prodsimilar'>
      <h2 className='prodsimilar__title'>Discover similar products</h2>
      <Splide
        options={ {
          type: 'loop',
          autoplay: true,
          interval: 5000,
          perPage: 4,
          breakpoints: {
            1200: {
              perPage: 3,
            },
            910: {
              perPage: 2,
            },
            650: {
              perPage: 1,
            },
          },
          gap: '30px',
          padding: '30px',
        } }
        extensions={{ Intersection }}
      >
        {
          products?.filter(prodFilter).map(prod => (
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

export default ProdSimilar;