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
import SliderBanners from '../components/shared/SliderBanners';
import ClothesPlace from '../components/categories/ClothesPlace';
import ElectronicsPlace from '../components/categories/ElectronicsPlace';
import FurniturePlace from '../components/categories/FurniturePlace';
import ShoesPlace from '../components/categories/ShoesPlace';
import MiscellaneousPlace from '../components/categories/MiscellaneousPlace';

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
    }, [title, category, price, order]);

    // console.log(products);

    const prodFilters = (prod) => {
        const perImage = prod.images[0].includes('https://') &&
                        (prod.images[0].includes('.png') ||
                        prod.images[0].includes('.jpg') ||
                        prod.images[0].includes('.gif') ||
                        prod.images[0].includes('.webp') ||
                        prod.images[0].includes('.jpeg'));
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
        const idPlus = a.id - b.id;
        const pricePlus = a.price - b.price;
        const priceless = b.price - a.price;
        const titlePlus = a.title.localeCompare(b.title);
        const titleLess = b.title.localeCompare(a.title);
        const orders = [idPlus, titlePlus, titleLess,
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
        <SliderBanners/>
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
        <div className='homepage__categories'>
            <ClothesPlace/>
            <ElectronicsPlace/>
            <ShoesPlace/>
            <FurniturePlace/>
            <MiscellaneousPlace/>
        </div>
        {/* <>
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
        </> */}
    </div>
  )
}

export default HomePage;