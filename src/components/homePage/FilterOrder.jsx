import React, { useRef } from 'react';
import './styles/filterOrder.css';
let selectValue;

const FilterOrder = ({setOrder}) => {

    const selectChange = useRef();

    const handleChange = () => {
        setOrder(selectChange.current.value);
    }

    selectValue = selectChange.current;

  return (
    <div className='filterorder'>
      <h3>Order by</h3>
      <select ref={selectChange} onChange={handleChange}>
          <option value={0}>Title ( a - z )</option>
          <option value={1}>Title ( z - a )</option>
          <option value={2}>Price ( min - max )</option>
          <option value={3}>Price ( max - min )</option>
      </select>
    </div>
  )
}

export const resetOrder = () => {
  selectValue.value = 0;
}

export default FilterOrder;