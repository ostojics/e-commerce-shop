import { createContext, useState, useEffect } from 'react';

import { commerce } from '../lib/commerce';

export const CartContext = createContext();

const CartContextProvider = props => {
    const [cart, setCart] = useState({});

    const fetchCart = async () => {
        const cartData = await commerce.cart.retrieve();

        setCart(cartData);
    }

    const addToCartHandler = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    const updateCartQuantityHandler = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const emptyCartHandler = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    const fetchToken = async () => {
        const { id } = await commerce.cart.retrieve();
        const token = await commerce.checkout.generateToken(id, { type: 'cart' });

        return token;
    }

    useEffect(() => {
        fetchCart();
    }, [])

    const contextValue = {
        cart,
        fetchToken,
        addToCartHandler,
        updateCartQuantityHandler,
        handleRemoveFromCart,
        emptyCartHandler,
    }

    return (
        <CartContext.Provider value={ contextValue }>
            { props.children }
        </CartContext.Provider>
    )
}

export default CartContextProvider;