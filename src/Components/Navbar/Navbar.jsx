import { useContext } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { CartContext } from '../../store/cart-context';

import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/commerce.png';

import useStyles from './Navbar-styles';

const Navbar = ({ totalItems }) => {
    const { cart } = useContext(CartContext);
    const location = useLocation();

    const classes = useStyles();

    if(location.pathname === '/') {

    }
    
    return (
        <>
            <AppBar position="fixed" className={ classes.appBar } color="inherit">
                <Toolbar>
                    <Typography component={Link} to='/' variant="h6" className={ classes.title } color="inherit">
                        <img  src={ logo } alt="Commerce" height="25px" className={ classes.image } />
                        Commerce
                    </Typography>
                    <div className={ classes.grow } />
                    { location.pathname === '/' && (
                         <div className={ classes.button }>
                            <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={ cart.total_items } color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    ) }
                </Toolbar>
            </AppBar>  
        </>
    )
}

export default Navbar;
