
import ReactDom from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import CartContextProvider from './store/cart-context';
import ProductsContextProvider from './store/products-context';
import CheckoutContextProvider from './store/checkout-context';

const app = (
    <BrowserRouter>
        <CartContextProvider>
            <ProductsContextProvider>
                <App />
            </ProductsContextProvider>
        </CartContextProvider>
    </BrowserRouter>

)

ReactDom.render(
    app, 
    document.getElementById('root')
);