import { useState, useEffect } from 'react';

import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../lib/commerce';

import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken }) => {
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

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if(shippingCountry) {
            fetchSubdivisions(shippingCountry);
        }

    }, [shippingCountry]);

    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
           <FormProvider { ...methods }>
                <form onSubmit=''> 
                    <Grid container spacing={3}>
                        <FormInput required fieldName={ 'firstName' } label={ 'First Name' } />
                        <FormInput required fieldName={ 'lastName' } label={ 'Last Name' } />
                        <FormInput required fieldName={ 'address' } label={ 'Address' } />
                        <FormInput required fieldName={ 'email' } label={ 'Email' } />
                        <FormInput required fieldName={ 'city' } label={ 'City' } />
                        <FormInput required fieldName={ 'zip' } label={ 'ZIP / Postal code' } />
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
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={''} fullWidth onChange=''>
                                <MenuItem key={''} value={''}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
           </FormProvider>
        </>
    )
}

export default AddressForm;
