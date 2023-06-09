export const updateLocalStorage = (state) => {
    // Update local storage con el shopping cart recibido
    localStorage.setItem("shoppingCart", JSON.stringify(state));
}

export const calculateAmounts = (shoppingCart) => {
    const subtotal = shoppingCart.creations.reduce( (prev, curr) => prev + (curr.quantity * curr.price), 0) + shoppingCart.products.reduce( (prev, curr) => prev + (curr.quantity * curr.price), 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    return {
        subtotal,
        total,
        iva
    }
}