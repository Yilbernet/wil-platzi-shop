import React, { useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import ProdCard from '../homePage/ProdCard';
import { Link } from 'react-router-dom';
import './styles/furniturePlace.css';

const FurniturePlace = () => {

    const [products, getProducts] = useCrud();

    const category = 3;

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
    <div className='furnitureplace'>
        <Link to={`/category/${category}`}>
          <h2 className='furnitureplace__title'>Furniture</h2>
        </Link>
        <div className='furnitureplace__container'>
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

export default FurniturePlace;