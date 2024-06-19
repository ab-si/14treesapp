import React, { useState } from 'react';
import { Autocomplete, Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { organizationTypes } from './organizationType';

const AddOrganization = ({ open, handleClose, createOrganization }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius:'10px',
        p: 4,
    };

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createOrganization(formData);
        handleClose();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <form onSubmit={handleSubmit}>
                        <Grid container rowSpacing={2} columnSpacing={1} >
                            <Grid item xs={12}>
                                <TextField name="name" label="Name" value={formData.name} onChange={handleChange} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                name="type"
                                disablePortal
                                options={organizationTypes}
                                value={formData.type ? organizationTypes.find((option) => option.id === formData.type): undefined}
                                onChange={(event, value) => { if (value !== null) setFormData(prevState => ({ ...prevState, 'type': value.id }))}}
                                getOptionLabel={(option) => (option.label)}
                                renderInput={(params) => <TextField {...params} margin="dense" label="Type" />}
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', }}>
                                <Button type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AddOrganization