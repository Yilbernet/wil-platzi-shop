import React, { useRef } from 'react';
import './styles/filterName.css';
let inputValue;

const FilterName = ({setTitle}) => {

    const textInput = useRef();

    const handleChange = () => {
        setTitle(textInput.current.value
            .trim()
            .toLowerCase()
            .split(' ')
        );
    }

    inputValue = textInput.current;

  return (
    <div className='filtername'>
        <input
            className='filtername__input'
            ref={textInput}
            onChange={handleChange}
            type="search"
            placeholder='search product name'
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="filtername__icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
    </div>
  )
}

export const resetName = () => {
    inputValue.value = '';
}

export default FilterName;