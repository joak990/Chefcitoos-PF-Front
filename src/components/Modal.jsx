import React from 'react'
import ReactDOM from 'react-dom';

const Modal = ({showModal, handleShowModal}) => {
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
            onClick={handleShowModal}
          ></div>
  
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Selecciona los ingredientes
                  </h3>
                  <div className="mt-4">
     
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
              <button
                type="button"
                className="bg-orange-600 w-24 h-8 text-white rounded-xl font-bold"
                onClick={handleShowModal}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>, 
      document.getElementById('modal')
      );
}

export default Modal
