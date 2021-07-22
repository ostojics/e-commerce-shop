import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../store/cart-context';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";

import useStyles from './Checkout-styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
    const { cart, fetchToken } = useContext(CartContext); 
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

    const Confirmation = () => {
        <div>
            Confirmation
        </div>
    }

    const addressForm = (
        checkoutToken ?  <AddressForm  checkoutToken={ checkoutToken } next={ next } /> : <CircularProgress />
    )

    const Form = () => activeStep === 0 
    ? (
        addressForm
    ) : (
        <PaymentForm checkoutToken={ checkoutToken } backStep={ backStep }/>
    )

    return (
        <>
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
