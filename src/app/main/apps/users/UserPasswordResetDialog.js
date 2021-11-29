import React, { useEffect, useCallback, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
    Select,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Avatar,
    OutlinedInput,
    InputLabel,
    FormControl,
    MenuItem,
    Checkbox
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as RootActions from 'app/store/actions'
import * as Constants from 'app/constants'
const defaultFormState = {
    username: '',
    password: '',
    confirmPassword: '',
};

function UserPasswordResetDialog(props) {
    const dispatch = useDispatch();
    const resetPasswordDialog = useSelector(({ usersApp }) => usersApp.user.resetPasswordDialog);
    const { form, handleChange, setForm } = useForm(defaultFormState);

    const initDialog = useCallback(
        () => {
            console.log('==============resetPasswordDialog======================');
            console.log(resetPasswordDialog);
            console.log('====================================');
            if (resetPasswordDialog != null) {
                setForm({ ...resetPasswordDialog.data });
            }
        },
        [resetPasswordDialog.data, setForm],
    );


    useEffect(() => {
        if (resetPasswordDialog.props.open) {
            initDialog();
        }

    }, [resetPasswordDialog.props.open, initDialog]);



    function closeComposeDialog() {
        dispatch(Actions.closeResetPasswordDialog())
    }

    function canBeSubmitted() {
        return (
            (form.password == form.confirmPassword)
            //form.userName.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();


        dispatch(Actions.resetPassword(form));

        closeComposeDialog();
    }
    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...resetPasswordDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        Reset Password
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    <Typography variant="h6" color="inherit" className="pt-8">
                        {form.displayName}
                    </Typography>
                </div>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{ root: "p-24" }}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">user</Icon>
                        </div>
                        <TextField
                            disabled={true}
                            className="mb-24"
                            label="User Name"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">password</Icon>
                        </div>
                        <TextField
                            type="password"
                            className="mb-24"
                            label="Password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">password</Icon>
                        </div>
                        <TextField
                            type="password"
                            className="mb-24"
                            label="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                </DialogContent>


                <DialogActions className="justify-between p-8">
                    <div className="px-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            type="submit"
                            disabled={!canBeSubmitted()}
                        >
                            Submit
                            </Button>
                    </div>
                </DialogActions>

            </form>
        </Dialog>
    );
}

export default UserPasswordResetDialog;
