
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';

import { Switch, Route } from 'react-router-dom';

const App = () => {

    return (
        <div>
            <Navbar />
            <Switch>
                 <Route exact path='/'>
                     <Products />
                 </Route>
                 <Route path='/cart'>
                    <Cart />
                 </Route>
            </Switch>
        </div>
    )
}

export default App
