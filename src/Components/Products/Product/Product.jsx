import { useContext } from 'react';

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './Product-styles';

import { CartContext } from '../../../store/cart-context';

const Product = ({ product }) => {
    const { id, name, description, price: { formatted }, media: { source } } = product;

    const { addToCartHandler } = useContext(CartContext);

    console.log(product);

    const classes = useStyles();

    return (
        <Card className={ classes.root }>
            <CardMedia className={ classes.media } image={ source } title={ name } />
            <CardContent>
                <div className={ classes.cardContent }>
                    <Typography variant="h5" gutterBottom>
                        { name }
                    </Typography>
                    <Typography variant="h5">
                        { formatted }
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: description }} variant="body2" color="textSecondary" />
                <CardActions disableSpacing className={ classes.cardActions }>
                    <IconButton aria-label="Add to Cart" onClick={ () => addToCartHandler(id, 1) }>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Product
