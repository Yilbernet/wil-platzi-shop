import React, { useEffect, useState } from 'react';
import useCrud from '../hooks/useCrud';
import EditProd from '../components/editStorePage/EditProd';
import './styles/editStorePage.css';
import ModalCreate from '../components/editStorePage/ModalCreate';

const EditStorePage = () => {

    const [form, setForm] = useState(false);
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
        <div className='editstore__container'>
            {
                Array.isArray(products) &&
                products.map(prod => (
                    <EditProd
                        key={prod.id}
                        prod={prod}
                        deleteProduct={deleteProduct}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default EditStorePage;