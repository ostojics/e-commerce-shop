import { Grid } from '@material-ui/core';

import useStyles from './Products.styles';

import Product from './Product/Product';

const products = [
    {
        id: 1,
        name: 'Shoes',
        description: 'Running shoes',
        price: '$150',
        image: 'https://www.brooksrunning.com/dw/image/v2/aaev_prd/on/demandware.static/-/Sites-BrooksCatalog/default/dw501fef3d/images/ProductImages/110324/110324_434_l_WR.jpg?sw=900'
    },
    {
        id: 2,
        name: 'Macbook',
        description: 'Apple Macbook',
        price: '$500',
        image: 'https://macola.rs/wp-content/uploads/2020/11/macbook_pro_13in_silver_pdp_image_position-1_m1_chip__usen_7_2.jpg'
    }
]

const Products = () => {
    const classes = useStyles();

    return (
        <main className={ classes.content }>
            <div className={ classes.toolbar }/>
            <Grid container justify="center" spacing={4}>
                { products.map((product) => (
                    <Grid item key={ product.id } xs={12} sm={6} md={4} lg={3}>
                        <Product product={ product }/>
                    </Grid>
                )) }
            </Grid>
        </main>
    )
}

export default Products;