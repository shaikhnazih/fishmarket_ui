import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography, TextField } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';


const defaultFormState = {
    OldPassword: '',
    Password: '',
    ConfirmPassword: '',
    userName: ''
};


function AboutTab() {

    const { form, handleChange, setForm } = useForm(defaultFormState);

    const dispatch = useDispatch();
    const profilePage = useSelector(({ ProfilePage }) => ProfilePage.profile.profileData);


    function canBeSubmitted() {
        return (
            form.OldPassword.length > 0
            &&
            form.Password.length > 0
            &&
            form.Password == form.ConfirmPassword
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(Actions.updatePassword(form, profilePage.username));
        setForm({ ...defaultFormState });

    }


    return (
        <div className="">
            <br></br>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <div className="flex" style={{ marginTop: "5px" }}>
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label="Old Password"
                        id="OldPassword"
                        name="OldPassword"
                        type="password"
                        value={form.OldPassword}
                        onChange={handleChange}
                        variant="outlined"

                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label="New Password"
                        id="Password"
                        type="password"
                        name="Password"
                        value={form.Password}
                        onChange={handleChange}
                        variant="outlined"

                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label="Confirm New Password"
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        type="password"
                        value={form.ConfirmPassword}
                        onChange={handleChange}
                        variant="outlined"

                    />
                </div>
                <div>
                    <div className="px-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!canBeSubmitted()}
                        >
                            Change Password
                            </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AboutTab;
