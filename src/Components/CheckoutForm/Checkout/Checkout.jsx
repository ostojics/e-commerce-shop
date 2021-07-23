import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CartContext } from '../../../store/cart-context';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core";

import useStyles from './Checkout-styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
    const { cart, fetchToken, order, errorMessage } = useContext(CartContext); 
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await fetchToken();

                setCheckoutToken(token);
           } catch(error) {
               
           }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep(prevStep => prevStep + 1);
    const backStep = () => setActiveStep(prevStep => prevStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    let Confirmation = () => order.customer ? (
            <>
                <div>
                    <Typography variant='h5'>Thank you for your purchase, { order.customer.firstname } { order.customer.lastname }! </Typography>
                    <Divider className={ classes.divider }/>
                    <Typography variant='subtitle2'>Order ref: { order.customer_reference }</Typography>
                </div>
                <br />
                <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
            </>
    ) : (
        <div className={ classes.spinner }>
            <CircularProgress />
        </div>
    )

    if(errorMessage) {
        Confirmation = (
            <>
                <Typography variant='h5'>Error: { errorMessage }</Typography>
                <br />
                <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
            </>
        )
    }

    const addressForm = (
        checkoutToken ?  <AddressForm  checkoutToken={ checkoutToken } next={ next } /> : <CircularProgress />
    )

    const Form = () => activeStep === 0 
    ? (
        addressForm
    ) : (
        <PaymentForm shippingData={ shippingData } checkoutToken={ checkoutToken } backStep={ backStep } nextStep={ nextStep } />
    )

    return (
        <>  
            <CssBaseline />
            <div className={ classes.toolbar } />
            <main className={ classes.layout }>
                <Paper className={ classes.paper }>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={ classes.stepper }>
                        { steps.map(step => (
                            <Step key={ step }>
                                <StepLabel>{ step }</StepLabel>
                            </Step>
                        )) }
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
