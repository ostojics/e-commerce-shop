import { useContext } from 'react';

import { Grid } from '@material-ui/core';

import useStyles from './Products.styles';

import Product from './Product/Product';

import { ProductsContext } from '../../store/products-context';

const Products = (props) => {
    const { products } = useContext(ProductsContext);

    const classes = useStyles();

    return (
        <main className={ classes.content }>
            <div className={ classes.toolbar }/>
            <Grid container justifyContent="flex-start" spacing={4}>
                { products.map((product) => (
                    <Grid item key={ product.id } xs={12} sm={6} md={4} lg={3}>
                        <Product product={ product } />
                    </Grid>
                )) }
            </Grid>
        </main>
    )
}

export default Products;