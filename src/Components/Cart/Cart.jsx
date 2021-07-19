import { useContext } from 'react';

import { Container, Typography, Button, Grid, CircularProgress } from "@material-ui/core";

import { Link } from 'react-router-dom';

import useStyles from './Cart-styles';

import { CartContext } from '../../store/cart-context';

import CartItem from './CartItem/CartItem';

const Cart = (props) => {
    const { cart, emptyCartHandler } = useContext(CartContext);

    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your cart,
            <Link to='/' className={ classes.link }>
                start adding more
            </Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={ 3 }>
                { cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={ item }/>
                    </Grid>
                )) }
            </Grid>
            <div className={ classes.cardDetails }>
                    <Typography variant="h4">
                        Subtotal: { cart.subtotal.formatted_with_symbol }
                    </Typography>
                    <div>
                        <Button className={ classes.emptyButton } onClick={ emptyCartHandler } size="large" type="button" variant="contained" color="secondary">
                            Empty Cart
                        </Button>
                        <Button className={ classes.checkoutButton } size="large" type="button" variant="contained" color="primary">
                            Checkout
                        </Button>
                    </div>
            </div>
        </>
    )

    if(!cart.line_items) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <div className={ classes.toolbar } />
            <Typography className={ classes.title } variant="h3" gutterBottom>
                Your Shopping Cart
            </Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>

    )
}

export default Cart
