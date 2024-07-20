import React, { useEffect, useRef } from 'react';
import useCrud from '../../hooks/useCrud';
let selectValue;

const FilterCategory = ({setCategory}) => {

    const [categories, getCategories] = useCrud();

    useEffect(() => {
        getCategories('/categories');
    }, []);

    const changeSelect = useRef();

    const handleChange = () => {
        setCategory(changeSelect.current.value);
    }

    selectValue = changeSelect.current;

  return (
    <select ref={changeSelect} onChange={handleChange} >
        <option value="">All categories</option>
        {
            categories?.map(cate => (
                <option
                    key={cate.id}
                    value={cate.name}
                >
                    {cate.name}
                </option>
            ))
        }
    </select>
  )
}

export const resetCategory = () => {
    selectValue.value = '';
}

export default FilterCategory;