const regexImage = /\.(jpg|jpeg|png)$/i;

export default function validationForm(form, setErrors, errors, property) {
  //name validation
  if (property === "name") {
    if (!form.name) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        name: "El nombre es requerido",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, name: "" }));
    }
  }

  //price validation
  if (property === "price") {
    if (form.price <= 0) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        price: "El precio es requerido y debe ser mayor a 0",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, price: "" }));
    }
  }

  //type product validation
  if (property === "type_product") {
    if (!form.type_product) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        type_product: "El tipo de producto es requerido",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, type_product: "" }));
    }
  }

  //image validation
  if (property === "image") {
    if (!form.image) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        image: "La imagen es requerida",
      }));
    } else if (!regexImage.test(form.image)) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        image: "Debe ser una imagen valida",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, image: "" }));
    }
  }

  //elements validation
  if (property === "elements") {
    if (!form.elements) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        elements: "Los elementos son requeridos",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, elements: "" }));
    }
  }

  //description validation
  if (property === "description") {
    if (!form.description) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        description: "La descripción es requerida",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, description: "" }));
    }
  }
}
