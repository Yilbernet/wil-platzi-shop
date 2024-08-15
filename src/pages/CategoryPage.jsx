import React, { useEffect, useState } from 'react';
import useCrud from '../hooks/useCrud';
import { useParams } from 'react-router-dom';
import ProdCard from '../components/homePage/ProdCard';
import Pagination from '../components/homePage/Pagination';

const CategoryPage = () => {

    const [page, setPage] = useState(1);
    const [ products, getProducts ] = useCrud();
    const { id } = useParams();

    useEffect(() => {
      getProducts(`/products/?categoryId=${id}`);
    }, []);

    const quantity = 8;
    const total = Math.ceil(
        products?.length / quantity
    );
    const prodPages = () => {
        const end = quantity * page;
        const start = end - quantity;
        return products?.slice(start, end);
    }

  return (
    <div className='categorypage'>
        <h2 className='categorypage__title'>
            {products?.[0].category.name}
        </h2>
        <div>
            {
                total > 1 &&
                <Pagination
                    page={page}
                    setPage={setPage}
                    total={total}
                />
            }
        </div>
        <div className='homepage__container'>
            {
                prodPages()?.map(prod => (
                    <ProdCard
                        key={prod.id}
                        prod={prod}
                    />
                ))
            }
        </div>
        <div>
            {
                total > 1 &&
                <Pagination
                    page={page}
                    setPage={setPage}
                    total={total}
                />
            }
        </div>
    </div>
  )
}

export default CategoryPage;