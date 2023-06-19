import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import validationForm from "../AdminUser/validationForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getProducts } from "../Redux/actions";
import {uploadFile} from "../firebase-config-img";

const ModalProducts = ({ onClose, productSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (productSelected.id) {
      setForm({
        name: productSelected.name,
        image: productSelected.image,
        type_product: productSelected.type_product,
        price: productSelected.price,
        customizable: productSelected.customizable,
        description: productSelected.description,
        elements: productSelected.elements,
        purchased_amount: productSelected.purchased_amount,
        isDeleted: productSelected.isDeleted,
      });
      setSelectedImage(productSelected.image)
    }
  }, [productSelected]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    image: "",
    type_product: "",
    price: "",
    customizable: false,
    description: "",
    elements: "",
    purchased_amount: "",
    isDeleted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    type_product: "",
    price: "",
    customizable: "",
    description: "",
    elements: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    if (property === "type_product") {
      setForm({ ...form, [property]: event.target.selectedOptions[0].value });
    } else if (property === "customizable") {
      setForm({ ...form, [property]: !form.customizable });
    } else if (property === "image") {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setForm({ ...form, [property]: file });
    } else {
      setForm({ ...form, [property]: value });
    }
    validationForm({ ...form, [property]: value }, setErrors, errors, property);
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (form.type_product === "") {
      setErrors({
        ...errors,
        type_product: "El tipo de producto es requerido",
      });
    } else {
      setErrors({ ...errors, type_product: "" });
    }
    
    if (!form.image) {
      setErrors({ ...errors, image: "La imagen es requerida" });
    } else {
      setErrors({ ...errors, image: "" });
    }

    if (!productSelected.id || productSelected.image != form.image) {
      const imageURL = await uploadFile(form.image);
      console.log(imageURL);
      form.image = imageURL;
    }
    
    const errosEmpty = Object.values(errors).every((value) => value === "");
    if (errosEmpty && form.image != "" && form.type_product != "") {
      console.log(form);
      const url = productSelected.id ? `${process.env.REACT_APP_API_URL}products/modify/${productSelected.id}` : `${process.env.REACT_APP_API_URL}products`;
      const method = productSelected.id ? "put" : "post";

      axios({
        method,
        url,
        data: form
      }).then((response) => {
          onClose();
          dispatch(getProducts());
          Swal.fire({
            title: "Producto guardado satisfactoriamente",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
            },
          });
        })
        .catch((error) => {
          Swal.fire({
            title:
              "Error: algo salió mal al guardar el producto. " + error.message,
            icon: "error",
            buttonsStyling: false,
            customClass: {
              confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
            },
          });
        });
    }
  };

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
              {productSelected.id ? "Editar Producto: " + productSelected.name :  "Crear Nuevo Producto"}
            </h3>
            <button
              className="bg-gray-400 rounded-full flex justify-center self-center w-6 mr-2"
              onClick={onClose}
            >
              <FontAwesomeIcon className="p-1 text-white" icon={faClose} />
            </button>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="bg-white px-5 pb-4 ">
              <div className="flex lg:flex-row md:flex-row flex-col justify-center items-start">
                {/* Modal body */}
                <div className="mx-auto mt-4 lg:w-1/2 md:w-1/2 mr-4 w-full">
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Nombre:
                    </label>
                    <input
                      className="text-sm shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Nombre"
                      value={form.name}
                      name="name"
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Precio:
                    </label>
                    <input
                      className="text-sm shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      id="price"
                      type="number"
                      placeholder="Precio"
                      value={form.price}
                      name="price"
                      onChange={handleChange}
                    />
                    {errors.price && (
                      <p className="text-red-600 text-sm">{errors.price}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="type_product"
                    >
                      Tipo de producto:
                    </label>
                    <select
                      className="text-sm shadow border border-gray-300 text-gray-700 rounded focus:shadow-outline w-full p-2.5"
                      id="type_product"
                      value={form.type_product}
                      name="type_product"
                      onChange={handleChange}
                    >
                      <option key="0" value="">
                        Seleccionar opción
                      </option>
                      <option value="hamburguesa">Hamburguesa</option>
                      <option value="perro_caliente">Perro Caliente</option>
                      <option value="burrito">Burrito</option>
                      <option value="sandwich">Sandwich</option>
                      <option value="bebidas">Bebidas</option>
                      <option value="otros_platos">Otros Platos</option>
                    </select>
                    {errors.type_product && (
                      <p className="text-red-600 text-sm">
                        {errors.type_product}
                      </p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="elements"
                    >
                      Elementos que componen el producto:
                    </label>
                    <textarea
                      className="text-sm shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      id="elements"
                      placeholder="Escribe tu mensaje"
                      rows={3}
                      value={form.elements}
                      name="elements"
                      onChange={handleChange}
                    ></textarea>
                    {errors.elements && (
                      <p className="text-red-600 text-sm">{errors.elements}</p>
                    )}
                  </div>
                  <div className="mb-2 flex flex-row">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 mr-2"
                      htmlFor="customizable"
                    >
                      Personalizable:
                    </label>
                    <input
                      id="customizable"
                      name="customizable"
                      type="checkbox"
                      value={form.customizable}
                      checked={form.customizable}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-600 border border-gray-300 shadow rounded focus:shadow-outline"
                    />
                  </div>
                </div>
                <div className="mx-auto mt-4 lg:w-1/2 md:w-1/2 w-full">
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Descripción:
                    </label>
                    <textarea
                      className="text-sm shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      id="message"
                      placeholder="Escribe tu mensaje"
                      rows={4}
                      value={form.description}
                      name="description"
                      onChange={handleChange}
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-600 text-sm">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="file_input"
                    >
                      Cargar imagen:
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                      id="file_input"
                      type="file"
                      name="image"
                      // value={form.image}
                      onChange={handleChange}
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      PNG o JPG
                    </p>
                    {errors.image && (
                      <p className="text-red-600 text-sm">{errors.image}</p>
                    )}
                    {selectedImage && (
                      <div className="w-48 mt-3">
                        <img src={selectedImage} alt="Preview" id="imageUpload" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex flex-row justify-end border-t border-gray-200">
              <button
                type="submit"
                className="bg-orange-600 w-24 h-8 text-white rounded-xl font-bold"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modalProducts")
  );
};

export default ModalProducts;
