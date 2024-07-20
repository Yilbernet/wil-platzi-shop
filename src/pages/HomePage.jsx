import React, { useEffect, useState } from 'react';
import useCrud from '../hooks/useCrud';
import ProdCard from '../components/homePage/ProdCard';
import './styles/homePage.css';
import FilterName, { resetName } from '../components/homePage/FilterName';
import FilterCategory, { resetCategory } from '../components/homePage/FilterCategory';
import FilterPrice, { resetPrice } from '../components/homePage/FilterPrice';
import FilterOrder, { resetOrder } from '../components/homePage/FilterOrder';
import ModeButton from '../components/homePage/ModeButton';
import MenuButton from '../components/homePage/MenuButton';
import Pagination from '../components/homePage/Pagination';

const HomePage = () => {

    const [products, getProducts] = useCrud();
    const [title, setTitle] = useState(['']);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState({
        min: 0,
        max: Infinity,
    });
    const [order, setOrder] = useState(0);
    const [menu, setMenu] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getProducts('/products');
    }, []);

    useEffect(() => {
        setPage(1);
    }, [title, category, price]);

    // console.log(products);

    const prodFilters = (prod) => {
        const perImage = !prod.images[0].includes('/any') &&
                         !prod.images[0].includes('google') &&
                         !prod.images[0].includes('pixabay') &&
                         !prod.images[0].includes('example') &&
                         !prod.images[0].includes('adidas') &&
                         !prod.images[0].includes('/640/480') &&
                         !prod.images[0].includes('1.png') &&
                         !prod.images[0].includes('hihi.jpg') &&
                         !prod.images[0].includes('/api');
        const perTitle = title.every(text =>
            prod.title.toLowerCase().includes(text)
        );
        const perCategory = category === '' ?
            true : prod.category.name === category;
        const perPrice = prod.price <= +price.max &&
                         prod.price >= +price.min;
        return perImage && perTitle &&
               perCategory && perPrice;
    }

    const prodSort = (a, b) => {
        const pricePlus = a.price - b.price;
        const priceless = b.price - a.price;
        const titlePlus = a.title.localeCompare(b.title);
        const titleLess = b.title.localeCompare(a.title);
        const orders = [titlePlus, titleLess,
                        pricePlus, priceless];
        return orders[order];
    }

    const quantity = 8;
    const total = Math.ceil(
        products?.filter(prodFilters).length / quantity
    );
    const prodPages = () => {
        const end = quantity * page;
        const start = end - quantity;
        return products?.filter(prodFilters)
        .sort(prodSort).slice(start, end);
    }

    const handleMenu = () => {
        setMenu(false);
    }

    const handleReset = () => {
        resetName();
        setTitle(['']);
        resetCategory();
        setCategory('');
        resetPrice();
        setPrice({
            min: 0,
            max: Infinity,
        });
        resetOrder();
        setOrder(0);
    }

    const handleStop = (event) => {
        event.stopPropagation();
    }

  return (
    <div className='homepage' onClick={handleMenu}>
        <div
            onClick={handleStop}
            className={`homepage__filters ${menu ? 'active' : ''}`}
        >
            <button className='homepage__filters-close' onClick={handleMenu}>
                <ion-icon name="close-sharp"></ion-icon>
            </button>
            <button className='homepage__filters-reset' onClick={handleReset}>
                Reset filters
            </button>
            <FilterCategory
                setCategory={setCategory}
            />
            <FilterPrice
                setPrice={setPrice}
            />
            <FilterOrder
                setOrder={setOrder}
            />
        </div>
        <div className='homepage__menu'>
            <MenuButton
                setMenu={setMenu}
            />
            <FilterName
                setTitle={setTitle}
            />
            <ModeButton/>
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

export default HomePage;