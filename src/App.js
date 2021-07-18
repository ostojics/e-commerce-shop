import { useState, useEffect } from 'react';

import { commerce } from './lib/commerce';

import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        const cartData = await commerce.cart.retrieve();

        setCart(cartData);
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    return (
        <div>
            <Navbar totalItems={ cart.total_items }/>
           {/*  <Products products={ products } onAddToCart={ handleAddToCart } /> */}
            <Cart cart={ cart } />
        </div>
    )
}

export default App
