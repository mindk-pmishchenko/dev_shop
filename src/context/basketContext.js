import React from "react";

const initContext = {
    products: {...JSON.parse(localStorage.getItem("savedProducts"))},
    setProducts(newProducts) {
        this.products = newProducts;
    }
};

const BasketContext = React.createContext(initContext);

export default BasketContext;