import React, { useEffect, useState } from 'react';
import useCrud from '../hooks/useCrud';
import EditProd from '../components/editStorePage/EditProd';
import './styles/editStorePage.css';
import ModalCreate from '../components/editStorePage/ModalCreate';
import Pagination from '../components/homePage/Pagination';

const EditStorePage = () => {

    const [form, setForm] = useState(false);
    const [page, setPage] = useState(1);
    const [products, getProducts, createProduct, deleteProduct, updateProduct] = useCrud();

    useEffect(() => {
        getProducts('/products');
    }, []);

    const type = Object.prototype.toString.call(products)
                 .replace(']','').split(' ')[1];

    if (type==='Object' && !form) {
        getProducts('/products');
    }

    const handleForm = () => {
        setForm(true);
    }

    const quantity = 8;
    const total = Array.isArray(products) &&
    Math.ceil(products.length / quantity);
    const prodPages = () => {
        const end = quantity * page;
        const start = end - quantity;
        return Array.isArray(products) &&
        products.slice(start, end);
    }

  return (
    <div className='editstore'>
        <button className='editstore__create' onClick={handleForm}>
            Create product
        </button>
        <ModalCreate
            form={form}
            setForm={setForm}
            createProduct={createProduct}
            updateProduct={updateProduct}
            products={products}
        />
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
        <div className='editstore__container'>
            {
                Array.isArray(products) &&
                prodPages()?.map(prod => (
                    <EditProd
                        key={prod.id}
                        prod={prod}
                        deleteProduct={deleteProduct}
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

export default EditStorePage;