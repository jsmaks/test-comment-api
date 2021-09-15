import './ButtonOnMore.css';
import React from 'react';

export default function ButtonOnMore({ nextPage, checkLastPage }) {
  return (
    <div>
      { checkLastPage &&
        <button className="btn buttton-onMore" onClick={nextPage}>
          Загрузить еще
        </button>
        
      }
    </div>
  );
}
