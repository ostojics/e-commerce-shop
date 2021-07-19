import { createContext, useState, useEffect } from "react";

import { commerce } from '../lib/commerce';

export const ProductsContext = createContext();

const ProductsContextProvider = props => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const contextValue = {
        products,
    }

    return (
        <ProductsContext.Provider value={ contextValue }>
            { props.children }
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider;