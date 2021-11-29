import React, {useEffect, useCallback} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

const defaultFormState = {
    code        : '',
    schemeName        : '',
    iconUrl         : 'assets/images/avatars/profile.jpg',
    maxQuantity     : 0,
    categoryCode    : '',
    points          : '',
    description     : ''
};

function SchemeDialog(props)
{
    const dispatch = useDispatch();
    const schemeDialog = useSelector(({schemeApp}) => schemeApp.schemes.schemeDialog);

    const {form, handleChange, setForm} = useForm(defaultFormState);

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if ( schemeDialog.type === 'edit' && schemeDialog.data )
            {
                setForm({...schemeDialog.data});
            }

            /**
             * Dialog type: 'new'
             */
            if ( schemeDialog.type === 'new' )
            {
                setForm({
                    ...defaultFormState,
                    ...schemeDialog.data,
                    id: FuseUtils.generateRandom()
                });
            }
        },
        [schemeDialog.data, schemeDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if ( schemeDialog.props.open )
        {
            initDialog();
        }

    }, [schemeDialog.props.open, initDialog]);

    function closeComposeDialog()
    {
        schemeDialog.type === 'edit' ? dispatch(Actions.closeEditSchemeDialog()) : dispatch(Actions.closeNewSchemeDialog());
    }

    function canBeSubmitted()
    {
        return (
            form.schemeName.length > 0
        );
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        if ( schemeDialog.type === 'new' )
        {
            dispatch(Actions.addScheme(form));
        }
        else
        {
            dispatch(Actions.updateScheme(form));
        }
        closeComposeDialog();
    }

    function handleRemove()
    {
        dispatch(Actions.removeScheme(form.id));
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...schemeDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {schemeDialog.type === 'new' ? 'New Scheme' : 'Edit Scheme'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    <Avatar className="w-96 h-96" alt="scheme avatar" src={form.avatar}/>
                    {schemeDialog.type === 'edit' && (
                        <Typography variant="h6" color="inherit" className="pt-8">
                            {form.name}
                        </Typography>
                    )}
                </div>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Scheme Code"
                            autoFocus
                            id="code"
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Scheme Name"
                            id="schemeName"
                            name="schemeName"
                            value={form.schemeName}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">star</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Icon Url"
                            id="iconUrl"
                            name="iconUrl"
                            value={form.iconUrl}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">category</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Category"
                            id="categoryCode"
                            name="categoryCode"
                            value={form.cateoryCode}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">max qty</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Max Quantity"
                            id="maxQuantity"
                            name="maxQuantity"
                            value={form.maxQuantity}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">points</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Points"
                            id="points"
                            name="points"
                            value={form.points}
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
                            label="Description"
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                </DialogContent>

                {schemeDialog.type === 'new' ? (
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

export default SchemeDialog;
