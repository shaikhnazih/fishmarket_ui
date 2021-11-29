import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
    giftCategoryName: '',
    description: ''
};

function GiftCategoryDialog(props) {
    const dispatch = useDispatch();
    const giftCategoryDialog = useSelector(({ giftsCategoryApp }) => giftsCategoryApp.giftsCategory.giftCategoryDialog);

    const { form, handleChange, setForm } = useForm(defaultFormState);

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (giftCategoryDialog.type === 'edit' && giftCategoryDialog.data) {
                setForm({ ...giftCategoryDialog.data });
            }

            /**
             * Dialog type: 'new'
             */
            if (giftCategoryDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...giftCategoryDialog.data,
                    id: FuseUtils.generateRandom()
                });
            }
        },
        [giftCategoryDialog.data, giftCategoryDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (giftCategoryDialog.props.open) {
            initDialog();
        }

    }, [giftCategoryDialog.props.open, initDialog]);

    function closeComposeDialog() {
        giftCategoryDialog.type === 'edit' ? dispatch(Actions.closeEditGiftCategoryDialog()) : dispatch(Actions.closeNewGiftCategoryDialog());
    }

    function canBeSubmitted() {
        return (
            form.giftCategoryName.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (giftCategoryDialog.type === 'new') {
            dispatch(Actions.addGiftCategory(form));
        }
        else {
            dispatch(Actions.updateGiftCategory(form));
        }
        closeComposeDialog();
    }

    function handleRemove() {
        dispatch(Actions.removeGiftCategory(form.id));
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...giftCategoryDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {giftCategoryDialog.type === 'new' ? 'New Gift Category' : 'Edit Gift'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {/* <Avatar className="w-96 h-96" alt="gift avatar" src={form.avatar} /> */}
                    {giftCategoryDialog.type === 'edit' && (
                        <Typography variant="h6" color="inherit" className="pt-8">
                            {form.name}
                        </Typography>
                    )}
                </div>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{ root: "p-24" }}>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">description</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Gift Category Name"
                            id="giftCategoryName"
                            name="giftCategoryName"
                            value={form.giftCategoryName}
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

                {giftCategoryDialog.type === 'new' ? (
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

export default GiftCategoryDialog;
