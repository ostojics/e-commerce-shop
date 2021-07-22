import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../lib/commerce';

import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState([]);
    const [countryCode, setCountryCode] = useState(null);
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
    const options = shippingOptions.map((shippingOption) => ({ id: shippingOption.id, label: `${shippingOption.description} - ${shippingOption.price.formatted_with_symbol}` }));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        console.log(countryCode);
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }  

    const fetchShippingOptions = async (checkoutTokenId, country, region=null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setShippingOptions(options);
        console.log(options);
        setShippingOption(options[0].id);
    } 

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if(shippingCountry) {
            fetchSubdivisions(shippingCountry);
        }

    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
        }
    }, [shippingSubdivision])

    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
           <FormProvider { ...methods }>
                <form onSubmit={ methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption })) }> 
                    <Grid container spacing={3}>
                        <FormInput fieldName={ 'firstName' } label={ 'First Name' } />
                        <FormInput fieldName={ 'lastName' } label={ 'Last Name' } />
                        <FormInput fieldName={ 'address1' } label={ 'Address' } />
                        <FormInput fieldName={ 'email' } label={ 'Email' } />
                        <FormInput fieldName={ 'city' } label={ 'City' } />
                        <FormInput fieldName={ 'zip' } label={ 'ZIP / Postal code' } />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={ (event) => setShippingCountry(event.target.value) }>
                                { countries.map(({ id, label }) => (
                                    <MenuItem key={id} value={id}>
                                       { label }
                                    </MenuItem>
                                )) }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={ (event) => setShippingSubdivision(event.target.value) }>
                                { subdivisions.map(({ id, label }) => (
                                    <MenuItem key={id} value={id}>
                                       { label }
                                    </MenuItem>
                                )) }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={ (event) => setShippingOption(event.target.value) }>
                                { options.map(({ id, label }) => (
                                    <MenuItem key={id} value={id}>
                                       { label }
                                    </MenuItem>
                                )) }
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                        <Button type='submit' variant='contained' color='primary'>Next</Button>
                    </div>
                </form>
           </FormProvider>
        </>
    )
}

export default AddressForm;
