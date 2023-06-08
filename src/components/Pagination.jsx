import React, { useState } from "react";
import { pageCreations, pagePublications } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

export const Pagination = ({ page, maxPage, action }) => {
  // const numPageCreations = useSelector(state => state.numPageCreations);

  const [input, setInput] = useState(1);
  const dispatch = useDispatch();

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    dispatch(action(parseInt(page) + 1));
    window.scrollTo(0, 0);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    dispatch(action(parseInt(page) - 1));
    window.scrollTo(0, 0);
  };

  const firstPage = () => {
    setInput(1);
    dispatch(action(1));
    window.scrollTo(0, 0);
  };

  const lastPage = () => {
    setInput(maxPage);
    dispatch(action(maxPage));
    window.scrollTo(0, 0);
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      dispatch(action(parseInt(e.target.value)));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maxPage) ||
        isNaN(parseInt(e.target.value))
      ) {
        dispatch(action(1));
        setInput(1);
        window.scrollTo(0, 0);
      } else {
        dispatch(action(parseInt(e.target.value)));
        window.scrollTo(0, 0);
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex mb-10 mt-5">
      <button
        className="bg-orange-600 text-white mr-2 p-2 rounded-lg"
        disabled={page === 1 || page < 1}
        onClick={firstPage}
      >
        Incio
      </button>
      <button
        className="bg-orange-600 text-white mr-2 p-2 rounded-lg"
        disabled={page === 1 || page < 1}
        onClick={previousPage}
      >
        Atrás
      </button>
      <div className="flex justify-center items-center">
        <input
          className="border border-gray-300 rounded-md text-center px-1 py-2 mr-2 w-12"
          onChange={onChange}
          onKeyDown={onKeyDown}
          name="page"
          autoComplete="off"
          value={input}
        />
        <p className="mr-2">
          {" "}
          of {maxPage} {maxPage === 1 ? "page" : "pages"}
        </p>
      </div>
      <button
        className="bg-orange-600 text-white mr-2 p-2 rounded-lg"
        disabled={page === maxPage || page > maxPage}
        onClick={nextPage}
      >
        Siguiente
      </button>
      <button
        className="bg-orange-600 text-white p-2 rounded-lg"
        disabled={page === maxPage || page > maxPage}
        onClick={lastPage}
      >
        Última
      </button>
    </div>
  );
};
