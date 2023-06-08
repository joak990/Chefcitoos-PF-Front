import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import image from "../img/hamburguesa.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getComponents } from "../Redux/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalShoppingCart = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full md:w-6/6 lg:w-4/5 xl:w-3/4 2xl:w-3/5">
          <div className="border-b border-b-gray-200 flex justify-between">
            <h3
              className="text-lg leading-6 font-medium text-gray-900 p-4"
              id="modal-title"
            >
              Tu orden
            </h3>
            <button
              className="bg-gray-400 rounded-full flex justify-center self-center w-6 mr-2"
              onClick={onClose}
            >
              <FontAwesomeIcon className="p-1 text-white" icon={faClose} />
            </button>
          </div>
          <div className="bg-white px-5 pb-4 ">
            <div className="flex flex-col items-center">
              {/* Modal body */}
              <ul className="flex-col items-center mt-[6px] w-[100%]">
                {/* div card */}
                <div className="flex flex-col mb-3 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-2">
                  <div className="flex px-2 flex-row items-end justify-between w-full">
                    <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                      <img
                        src={image}
                        className="h-[70px] md:h-auto rounded-lg w-[70px]"
                        alt="product name"
                      />
                      <div className="max-w-[300px] flex-col px-3">
                        <h5 className="font-semibold text-md uppercase">
                          Spaghetti reree erte ert wetertert
                        </h5>
                        <h6 className="text-gray-500 text-sm font-semibold">
                          $20000
                        </h6>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 text-black px-3 py-0.5 mr-2 rounded-lg hover:text-orange-600"
                        onClick=""
                      >
                        -
                      </button>
                      <input
                        className="w-12 text-center border border-gray-300 rounded-md"
                        type="text"
                        value={1}
                      />
                      <button
                        className="bg-gray-200 text-black px-3 py-0.5 ml-2 rounded-lg hover:text-orange-600"
                        onClick=""
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col items-end">
                      <button
                        className="bg-gray-200 rounded-lg flex justify-center self-end"
                        onClick=""
                      >
                        <FontAwesomeIcon
                          className="p-2 text-gray-500 text-xs hover:text-orange-600"
                          icon={faTrash}
                        />
                      </button>
                      <h5 className="font-semibold text-lg">$24.100</h5>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-3 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-2">
                  <div className="flex px-2 flex-row items-end justify-between w-full">
                    <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                      <img
                        src={image}
                        className="h-[70px] md:h-auto rounded-lg w-[70px]"
                        alt="product name"
                      />
                      <div className="max-w-[300px] flex-col px-3">
                        <h5 className="font-semibold text-md uppercase">
                          Spaghetti reree erte ert wetertert
                        </h5>
                        <h6 className="text-gray-500 text-sm font-semibold">
                          $20000
                        </h6>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 text-black px-3 py-0.5 mr-2 rounded-lg hover:text-orange-600"
                        onClick=""
                      >
                        -
                      </button>
                      <input
                        className="w-12 text-center border border-gray-300 rounded-md"
                        type="text"
                        value={1}
                      />
                      <button
                        className="bg-gray-200 text-black px-3 py-0.5 ml-2 rounded-lg hover:text-orange-600"
                        onClick=""
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col items-end">
                      <button
                        className="bg-gray-200 rounded-lg flex justify-center self-end"
                        onClick=""
                      >
                        <FontAwesomeIcon
                          className="p-2 text-gray-500 text-xs hover:text-orange-600"
                          icon={faTrash}
                        />
                      </button>
                      <h5 className="font-semibold text-lg">$24.100</h5>
                    </div>
                  </div>
                </div>
              </ul>
              <div className="flex flex-col mt-[6px] w-[60%] gap-5 self-end">
                <div className="flex flex-row items-center justify-between w-full">
                  <h5 className="font-semibold text-black_900" variant="body1">
                    Subtotal
                  </h5>
                  <h5 className="font-medium text-gray_900" variant="body1">
                    $78.300
                  </h5>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <h5 className="font-semibold text-black_900" variant="body1">
                    IVA
                  </h5>
                  <h5 className="font-medium text-gray_900" variant="body1">
                    19%
                  </h5>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <h5 className="font-semibold text-black_900" variant="body1">
                    Voucher
                  </h5>
                  <h5 className="font-medium text-gray_900" variant="body1">
                    $5.0
                  </h5>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <h5 className="font-semibold text-black_900" variant="body1">
                    Total
                  </h5>
                  <h5
                    className="font-bold text-lg text-gray_900"
                    variant="body1"
                  >
                    $76.800
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex flex-row justify-end border-t border-gray-200">
            <button
              type="button"
              className="bg-orange-600 w-24 h-8 text-white rounded-xl font-bold"
              onClick=""
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modalShoppingCart")
  );
};

export default ModalShoppingCart;
