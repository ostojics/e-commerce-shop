import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './Product-styles';

const Product = ({ product, onAddToCart }) => {
    const { id, name, description, price, media } = product;

    console.log(product);

    const classes = useStyles();

    return (
        <Card className={ classes.root }>
            <CardMedia className={ classes.media } image={ media.source } title={ name } />
            <CardContent>
                <div className={ classes.cardContent }>
                    <Typography variant="h5" gutterBottom>
                        { name }
                    </Typography>
                    <Typography variant="h5">
                        { price.formatted }
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: description }} variant="body2" color="textSecondary" />
                <CardActions disableSpacing className={ classes.cardActions }>
                    <IconButton aria-label="Add to Cart" onClick={ () => onAddToCart(id, 1) }>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Product
