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
    usernameError: '',
    mobileNo: '',
    mobileNoError: '',
    email: '',
    emailError: '',
    firstName: '',
    firstNameError: '',
    lastName: '',
    displayName: '',
    hierarchyCode: '',
    roles: [],
    rolesError: '',
    isError: false
};

function UserDialog(props) {
    const dispatch = useDispatch();
    const userDialog = useSelector(({ usersApp }) => usersApp.user.userDialog);
    const usernameExists = useSelector(({ usersApp }) => usersApp.user.isUsernameExists);

    const file = useSelector(({ fuse }) => fuse.file.file);

    const userRoles = useSelector(({ usersApp }) => usersApp.user.userRoles);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [isNew, setIsNew] = useState(true);


    const initDialog = useCallback(
        () => {
            console.log('==============userDialog======================');
            console.log(userDialog);
            console.log('====================================');
            if (userDialog.type === 'edit' && userDialog.data) {

                setForm({ ...userDialog.data });
            }

            if (userDialog.type === 'new') {
                setIsNew(true);
                setForm({
                    ...defaultFormState,
                    ...userDialog.data,
                    //  id: FuseUtils.generateRandom()
                })
                    ;
            } else {
                setIsNew(false);
            }
        },
        [userDialog.data, userDialog.type, setForm],
    );
    function setFile(e) {
        console.log(e.target.files[0])
        let image = new FormData();
        var element = e.target.files[0];
        image.append('file', element);
        image.append('type', 'UserImages');
        dispatch(RootActions.uploadFile(image));
    }


    useEffect(() => {
        dispatch(Actions.getUserRolesSelectOptions());
    }, [])




    useEffect(() => {
        if (userDialog.props.open) {
            initDialog();
        }

    }, [userDialog.props.open, userRoles, initDialog]);


    useEffect(() => {
        console.log('useeffect of File');

        console.log(file);
        if (file != null) {
            setForm({
                ...form,
                iconUrl: file.filePath,
                iconFileName: file.fileName
            });
        }
    }, [file]);


    function closeComposeDialog() {
        userDialog.type === 'edit' ? dispatch(Actions.closeEditUserDialog()) : dispatch(Actions.closeNewUserDialog());
    }

    function canBeSubmitted() {
        return (!usernameExists && (form.roles.length > 0 && form.username))
    }

    function handleSubmit(event) {
        event.preventDefault();
        validate();
        if (!form.isError) {

            if (userDialog.type === 'new') {
                dispatch(Actions.addUser(form));
            }
            else {
                dispatch(Actions.updateUser(form));
            }
            closeComposeDialog();
        }
    }

    function validate() {
        var isErrorValidate = false;
        var usernameErrorValidate = '';
        var mobileNoErrorValidate = '';
        var emailErrorValidate = '';
        var firstNameErrorValidate = '';
        var rolesErrorValidate = '';

        if (usernameExists) {
            usernameErrorValidate = 'Username is taken.';
            mobileNoErrorValidate = 'Mobile no is already taken.'
            isErrorValidate = true;

        }

        if (form.username.length < 5) {
            usernameErrorValidate = 'Username Should be minimum 5 charachters long';
            isErrorValidate = true;
        }
        if (form.mobileNo.length < 10) {
            mobileNoErrorValidate = 'Please enter a 10 digit mobile number';
            isErrorValidate = true;
        }

        if (form.email.length < 5) {
            emailErrorValidate = 'Please enter valid email';
            isErrorValidate = true;
        }
        if (form.firstName.length < 3) {
            firstNameErrorValidate = 'Please enter at least 3 charechters first name';
            isErrorValidate = true;
        }
        if (form.roles == []) {
            rolesErrorValidate = 'Please select role';
            isErrorValidate = true;
        }
        setForm({
            ...form,
            usernameError: usernameErrorValidate,
            mobileNoError: mobileNoErrorValidate,
            firstNameError: firstNameErrorValidate,
            rolesError: rolesErrorValidate,
            emailError: emailErrorValidate,
            isError: isErrorValidate
        })
    }


    function handleRemove() {
        dispatch(Actions.removeUser(form.id));
        closeComposeDialog();
    }
    function handleRoleChange(event) {
        console.log(event.target.value)
        setForm({ ...form, roles: [{ roleCode: event.target.value }] });


    }


    function handleCheckboxChangeChange(event) {
        console.log(event.target.name)
        setForm({ ...form, [event.target.name]: !event.target.checked });


    }
    let options;
    if (userRoles != null) {
        options = JSON.parse(userRoles).map(Roles => (
            <MenuItem value={Roles.code} key={Roles.code}>{Roles.displayName}</MenuItem>
        ))
    } else {
        options = <MenuItem value="0"><em>No Roles Created</em></MenuItem>
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...userDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {userDialog.type === 'new' ? 'New User' : 'Edit User'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {userDialog.type === 'edit' && (
                        <Typography variant="h6" color="inherit" className="pt-8">
                            {form.username}
                        </Typography>
                    )}
                </div>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{ root: "p-24" }}>

                    {isNew &&
                        <div>
                            <div className="flex" >
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">chevron_right</Icon>
                                </div>
                                <TextField
                                    className="mb-24"
                                    label="User Name"
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    onBlur={(e) => { dispatch(Actions.isUsernameExists(e.target.value)); validate() }}
                                    error={usernameExists}
                                    helperText={usernameExists ? 'Username already taken!' : null}
                                    onChange={handleChange}
                                    error={form.usernameError != undefined && form.usernameError != ''}
                                    helperText={form.usernameError}
                                    variant="outlined"
                                    fullWidth
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                               <FormControl className="flex w-full MuiFormControl-fullWidth mb-24" variant="outlined">
                                    <InputLabel htmlFor="roleCode">Roles</InputLabel>
                                    <Select
                                        error={form.usernameError != undefined && form.usernameError != ''}
                                        helperText={form.usernameError}
                                        onChange={handleRoleChange}
                                        input={
                                            <OutlinedInput
                                                labelWidth={("Role".length * 9)}
                                                name="roleCode"
                                                id="roleCode" />
                                        }
                                    >
                                        {options}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    }


                    <div className="flex" >
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="First Name"
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            error={form.firstNameError != undefined && form.firstNameError != ''}
                            helperText={form.firstNameError}
                            onBlur={validate}
                            variant="outlined"
                            fullWidth
                        />
                              &nbsp;&nbsp;&nbsp;&nbsp;
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
                    <div className="flex" >
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>


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
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className="mb-24"
                            label="Hierachy Code"
                            id="hierarchyCode"
                            name="hierarchyCode"
                            value={form.hierarchyCode}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Mobile No."
                            id="mobileNo"
                            name="mobileNo"
                            value={form.mobileNo}
                            onChange={handleChange}
                            error={form.mobileNoError != undefined && form.mobileNoError != ''}
                            helperText={form.mobileNoError}
                            onBlur={(e) => { dispatch(Actions.isUsernameExists(e.target.value)); validate() }}
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: "10" }}
                        />
                         &nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            className="mb-24"
                            label="Email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            error={form.emailError != undefined && form.emailError != ''}
                            helperText={form.emailError}
                            onBlur={validate}
                            variant="outlined"
                            fullWidth
                            type={"email"}
                        />


                    </div>


                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chevron_right</Icon>
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!(form.isDisabled)}
                                    onChange={handleCheckboxChangeChange}
                                    name="isDisabled"
                                    color="primary"
                                />
                            }
                            label="Is Active"
                        />


                    </div>


                </DialogContent>

                {userDialog.type === 'new' ? (
                    <DialogActions className="justify-between p-8">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                type="submit"
                                disabled={!canBeSubmitted()}
                            >
                                Add
                            </Button>
                        </div>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between p-8">
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
                            <IconButton
                                onClick={handleRemove}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </form>
        </Dialog>
    );
}

export default UserDialog;
