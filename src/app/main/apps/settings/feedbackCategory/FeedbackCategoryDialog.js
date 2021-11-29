import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
    feedbackCategoryName: '',
    description: ''
};

function FeedbackCategoryDialog(props) {
    const dispatch = useDispatch();
    const feedbackCategoryDialog = useSelector(({ feedbackCategoryApp }) => feedbackCategoryApp.feedbackCategory.feedbackCategoryDialog);

    const { form, handleChange, setForm } = useForm(defaultFormState);

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (feedbackCategoryDialog.type === 'edit' && feedbackCategoryDialog.data) {
                setForm({ ...feedbackCategoryDialog.data });
            }

            /**
             * Dialog type: 'new'
             */
            if (feedbackCategoryDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...feedbackCategoryDialog.data,
                    id: FuseUtils.generateRandom()
                });
            }
        },
        [feedbackCategoryDialog.data, feedbackCategoryDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (feedbackCategoryDialog.props.open) {
            initDialog();
        }

    }, [feedbackCategoryDialog.props.open, initDialog]);

    function closeComposeDialog() {
        feedbackCategoryDialog.type === 'edit' ? dispatch(Actions.closeEditFeedbackCategoryDialog()) : dispatch(Actions.closeNewFeedbackCategoryDialog());
    }

    function canBeSubmitted() {
        return (
            form.feedbackCategoryName.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (feedbackCategoryDialog.type === 'new') {
            dispatch(Actions.addFeedbackCategory(form));
        }
        else {
            dispatch(Actions.updateFeedbackCategory(form));
        }
        closeComposeDialog();
    }

    function handleRemove() {
        dispatch(Actions.removeFeedbackCategory(form.id));
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...feedbackCategoryDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {feedbackCategoryDialog.type === 'new' ? 'New Feedback' : 'Edit Feedback'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {/* <Avatar className="w-96 h-96" alt="feedback avatar" src={form.avatar} /> */}
                    {feedbackCategoryDialog.type === 'edit' && (
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
                            label="Feedback Category Name"
                            id="feedbackCategoryName"
                            name="feedbackCategoryName"
                            value={form.feedbackCategoryName}
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
                            name="feedbackCategoryDescription"
                            value={form.feedbackCategoryDescription}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                </DialogContent>

                {feedbackCategoryDialog.type === 'new' ? (
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

export default FeedbackCategoryDialog;
