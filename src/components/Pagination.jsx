import React, { useState } from 'react'

export const Pagination = ({page, setPage, maxPage}) => {
    const [input, setInput] = useState(1);
  
    const nextPage = () => {
      setInput (parseInt(input) + 1);
      setPage (parseInt(page) + 1);
      window.scrollTo(0, 0);
    };
  
    const previousPage = () => {
      setInput (parseInt(input) - 1);
      setPage (parseInt(page) - 1);
      window.scrollTo(0, 0);
    };

    const firstPage = () => {
      setInput (1);
      setPage ( 1);
      window.scrollTo(0, 0);
    };

    const lastPage = () => {
      setInput (maxPage);
      setPage (maxPage);
      window.scrollTo(0, 0);
    };
  
    const onKeyDown = e => {
      if (e.keyCode == 13) {
        setPage (parseInt (e.target.value));
        if (
          parseInt (e.target.value < 1) ||
          parseInt (e.target.value) > Math.ceil (maxPage) ||
          isNaN (parseInt (e.target.value))
        ) {
          setPage (1);
          setInput (1);
          window.scrollTo(0, 0);
        } else {
          setPage (parseInt (e.target.value));
          window.scrollTo(0, 0);
        }
      }
    };
  
    const onChange = e => {
      setInput (e.target.value);
    };
  
    return (
      <div className="">
        <button disabled={page === 1 || page < 1} onClick={firstPage}>
          Prim
        </button>
        <button disabled={page === 1 || page < 1} onClick={previousPage}>
          Prev
        </button>
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          name="page"
          autoComplete="off"
          value={input}
        />
        <p> of {maxPage} {maxPage === 1 ? "page" : "pages"}</p>
        <button
          disabled={page === maxPage || page > maxPage}
          onClick={nextPage}
        >
          Next
        </button>
        <button
          disabled={page === maxPage || page > maxPage}
          onClick={lastPage}
        >
          Last
        </button>
      </div>
    );
  };
