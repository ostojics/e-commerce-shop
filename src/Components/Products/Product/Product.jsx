import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './Product-styles';

const Product = ({ product }) => {
    const { name, description, price, image } = product;

    const classes = useStyles();

    return (
        <Card className={ classes.root }>
            <CardMedia className={ classes.media } image={ image } title={ name } />
            <CardContent>
                <div className={ classes.cardContent }>
                    <Typography variant="h5" gutterBottom>
                        { name }
                    </Typography>
                    <Typography variant="h5">
                        { price }
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">
                    { description }
                </Typography>
                <CardActions disableSpacing className={ classes.cardActions }>
                    <IconButton aria-label="Add to Cart">
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Product
