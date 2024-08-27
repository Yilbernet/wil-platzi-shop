import React, { useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import ProdCard from '../homePage/ProdCard';
import './styles/clothesPlace.css';
import { Link } from 'react-router-dom';

const ClothesPlace = () => {

    const [products, getProducts] = useCrud();

    const category = 1;

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
    <div className='clothesplace'>
        <Link to={`/category/${category}`}>
          <h2 className='clothesplace__title'>Clothes</h2>
        </Link>
        <div className='clothesplace__container'>
            {
                products?.filter(prodFilters).map(prod => (
                    <ProdCard
                        key={prod.id}
                        prod={prod}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ClothesPlace;