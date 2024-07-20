import React from 'react';
import './styles/pagination.css';

const Pagination = ({page, setPage, total}) => {

    const handleLess = (num) => {
        if (page > num) {
            setPage(page - num);
        } else {
            setPage(total);
        }
        scroll(0, 0);
    }

    const handlePlus = (num) => {
        if (page <= total - num) {
            setPage(page + num);
        } else {
            setPage(1);
        }
        scroll(0, 0);
    }

  return (
    <div className='pagination'>
        <button onClick={() => {handleLess(1)}}>{'<'}</button>
        <p>{page} / {total}</p>
        <button onClick={() => {handlePlus(1)}}>{'>'}</button>
    </div>
  )
}

export default Pagination;