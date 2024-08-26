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

  return (
    <div className='furnitureplace'>
        <Link to={`/category/${category}`}>
          <h2 className='furnitureplace__title'>Furniture</h2>
        </Link>
        <div className='furnitureplace__container'>
            {
                products?.map(prod => (
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