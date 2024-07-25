import React, { useEffect } from 'react';
import useCrud from '../hooks/useCrud';
import { useParams } from 'react-router-dom';
import ProdSlider from '../components/productPage/ProdSlider';
import ProdInfo from '../components/productPage/ProdInfo';
import ProdSimilar from '../components/productPage/ProdSimilar';
import './styles/productPage.css';

const ProductPage = () => {

    const { id } = useParams();

    const [ product, getProduct ] = useCrud();

    useEffect(() => {
        const path = `/products/${id}`;
        getProduct(path);
    }, [id]);

  return (
    <div className='productpage'>
        <ProdSlider
            product={product}
        />
        <ProdInfo
            product={product}
        />
        <ProdSimilar
            product={product}
        />
    </div>
  )
}

export default ProductPage;