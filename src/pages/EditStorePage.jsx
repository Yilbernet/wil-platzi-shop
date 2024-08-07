import React, { useEffect, useState } from 'react';
import useCrud from '../hooks/useCrud';
import EditProd from '../components/editStorePage/EditProd';
import './styles/editStorePage.css';
import ModalCreate from '../components/editStorePage/ModalCreate';
import Pagination from '../components/homePage/Pagination';
import EditCategory from '../components/editStorePage/EditCategory';
import ModalCategory from '../components/editStorePage/ModalCategory';

const EditStorePage = () => {

    const [form, setForm] = useState(false);
    const [category, setCategory] = useState(false);
    const [page, setPage] = useState(1);
    const [products, getProducts, createProduct,
        deleteProduct, updateProduct] = useCrud();
    const [categories, getCategories, createCategory,
        deleteCategory, updateCategory] = useCrud();

    useEffect(() => {
        getProducts('/products');
        getCategories('/categories');
    }, []);

    const typeP = Object.prototype.toString.call(products)
                 .replace(']','').split(' ')[1];
    if (typeP==='Object' && !form) {
        getProducts('/products');
    }
    const typeC = Object.prototype.toString.call(categories)
                 .replace(']','').split(' ')[1];
    if (typeC==='Object' && !category) {
        getCategories('/categories');
    }

    const handleForm = () => {
        setForm(true);
    }

    const handleCategory = () => {
        setCategory(true);
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
        <div className='editstore__buttons'>
            <button className='editstore__create' onClick={handleForm}>
                Create product
            </button>
            <button className='editstore__category' onClick={handleCategory}>
                Create category
            </button>
        </div>
        <ModalCreate
            form={form}
            setForm={setForm}
            createProduct={createProduct}
            updateProduct={updateProduct}
            products={products}
        />
        <ModalCategory
            category={category}
            setCategory={setCategory}
            createCategory={createCategory}
            updateCategory={updateCategory}
            categories={categories}
        />
        <div className='editstore__categories'>
            {
                Array.isArray(categories) &&
                categories?.map(cate => (
                    <EditCategory
                        key={cate.id}
                        cate={cate}
                        deleteCategory={deleteCategory}
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