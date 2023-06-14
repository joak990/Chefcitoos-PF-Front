import React, { useState } from "react";

function Modalpassword({ onClose }) {
  const [form, setForm] = useState({
    password:""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!form.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      } else if (form.password.length > 20) {
        newErrors.password = "La contraseña debe tener como máximo 20 caracteres";
      }
  

   

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Lógica para cambiar la contraseña aquí
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-96 sm:max-w-sm sm:mx-auto">
        <h2 className="text-2xl font-bold mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password-input" className="block text-lg font-bold mb-1">
              Contraseña nueva:
            </label>
            <input
              id="password-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className="px-2 py-1 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-500 mr-4"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-orange-500 px-4 py-2 rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modalpassword;