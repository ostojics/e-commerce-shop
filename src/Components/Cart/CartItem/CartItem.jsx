import { useContext } from 'react';
import { CartContext } from '../../../store/cart-context';

import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './CartItem-styles';

const CartItem = ({ item }) => {
    const { updateCartQuantityHandler, handleRemoveFromCart } = useContext(CartContext);

    const { name, quantity, id, media: { source }, line_total: { formatted_with_symbol } } = item;

    const classes = useStyles();

    return (
        <Card>
            <CardMedia image={ source } alt={ name } className={ classes.media } />
             <CardContent className={ classes.cardContent }>
                 <Typography variant="h4">
                     { name }
                 </Typography>
                 <Typography variant="h5">
                     { formatted_with_symbol }
                 </Typography>
             </CardContent>
             <CardActions className={ classes.cardActions }>
                <div className={ classes.buttons }>
                    <Button type="button" onClick={ () => updateCartQuantityHandler(id, quantity - 1) } size="small">-</Button>
                    <Typography>{ quantity }</Typography>
                    <Button type="button" onClick={ () => updateCartQuantityHandler(id, quantity + 1) } size="small">+</Button>
                </div>
                <Button variant="contained" onClick={ () => handleRemoveFromCart(id) } type="button" color="secondary">Remove</Button>
             </CardActions>
        </Card>
    )
}

export default CartItem
