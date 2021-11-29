import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography, TextField } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';


const defaultFormState = {
    displayName: '',
    username: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: ''
};


function AboutTab() {

    const { form, handleChange, setForm } = useForm(defaultFormState);
    const dispatch = useDispatch();

    const profilePage = useSelector(({ ProfilePage }) => ProfilePage.profile.profileData);

    useEffect(() => {
        console.log(profilePage);
        setForm({
            ...profilePage
        });
    }, [profilePage, setForm]);

    
    function canBeSubmitted() {
        return (
            form.firstName.length > 0
            &&
            form.lastName.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(Actions.updateProfile(form));
    }


    return (
        <div className="">
            <br></br>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label="User Name"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        disabled="true"
                    />
                    &nbsp;&nbsp;
                    <TextField
                        className="mb-24"
                        label="Display Name"
                        id="displayName"
                        name="displayName"
                        value={form.displayName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label="First Name"
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    &nbsp;&nbsp;
                    <TextField
                        className="mb-24"
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label="Mobile"
                        id="mobileNo"
                        name="mobileNo"
                        value={form.mobileNo}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        disabled="true"
                    />
                    &nbsp;&nbsp;
                    <TextField
                        className="mb-24"
                        label="Email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                {/* <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label="Address"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                </div> */}
                <div>
                    <div className="px-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!canBeSubmitted()}
                        >
                            Save
                            </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AboutTab;
