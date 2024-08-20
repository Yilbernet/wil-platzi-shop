import React, { useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import ProdCard from '../homePage/ProdCard';
import './styles/clothesPlace.css';

const ClothesPlace = () => {

    const [products, getProducts] = useCrud();

    useEffect(() => {
      getProducts('/products/?categoryId=1');
    }, []);

  return (
    <div className='clothesplace'>
        <h2 className='clothesplace__title'>Clothes</h2>
        <div className='clothesplace__container'>
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

export default ClothesPlace;