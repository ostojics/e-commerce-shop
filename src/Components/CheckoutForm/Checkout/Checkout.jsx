import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../store/cart-context';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";

import useStyles from './Checkout-styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
    const { fetchToken } = useContext(CartContext); 
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
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
    }, []);

    const Confirmation = () => {
        <div>
            Confirmation
        </div>
    }

    const addressForm = (
        checkoutToken ?  <AddressForm  checkoutToken={ checkoutToken } /> : <CircularProgress />
    )

    const Form = () => activeStep === 0 
    ? (
        addressForm
    ) : (
        <PaymentForm />
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
