import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as RootActions from 'app/store/actions'
import * as Constants from 'app/constants'
const defaultFormState = {

    pointExpiryDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
};

function PointExpiryDialog(props) {
    const dispatch = useDispatch();
    const pointExpiryDialog = useSelector(({ PointExpiryApp }) => PointExpiryApp.PointExpiry.pointExpiryDialog);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const file = useSelector(({ fuse }) => fuse.file.file);


    const initDialog = useCallback(
        () => {
            if (pointExpiryDialog.type === 'edit' && pointExpiryDialog.data) {
                setForm({ ...pointExpiryDialog.data });
            }
            if (pointExpiryDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...pointExpiryDialog.data,
                    id: FuseUtils.generateRandom()
                });
            }
        },
        [pointExpiryDialog.data, pointExpiryDialog.type, setForm],
    );

    useEffect(() => {

        if (pointExpiryDialog.props.open) {
            initDialog();
        }

    }, [pointExpiryDialog.props.open, initDialog]);

    useEffect(() => {
        console.log(file)
        if (file != null) {
            setForm({
                ...form,
                imageURL: file.filePath
                , fileName: file.fileName
            });
        }

    }, [file]);

    function closeComposeDialog() {
        pointExpiryDialog.type === 'edit' ? dispatch(Actions.closeEditPointExpiryDialog()) : dispatch(Actions.closeNewPointExpiryDialog());
    }

    function canBeSubmitted() {
        return (
            form.pointExpiryDate != null
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(form);
        dispatch(Actions.addPointExpiry(form));
        closeComposeDialog();

    }

    function handleRemove() {
        dispatch(Actions.removePointExpiry(form.id));
        closeComposeDialog();
    }

    function setFile(e) {
        let image = new FormData();
        var element = e.target.files[0];
        image.append('file', element);
        image.append('type', 'banner');
        dispatch(RootActions.uploadFile(image));
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...pointExpiryDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {pointExpiryDialog.type === 'new' ? 'New PointExpiry' : 'Edit PointExpiry'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {pointExpiryDialog.type === 'edit' && (
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
                            id="pointExpiry"
                            label="Next Expiry Date"
                            name="pointExpiryDate"
                            type="date"
                            defaultValue={moment(form.endDate).format('YYYY-MM-DD')}
                            onChange={handleChange}
                            error={form.endDateError != undefined && form.endDateError != ''}
                            helperText={form.endDateError}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />
                    </div>
                </DialogContent>

                {pointExpiryDialog.type === 'new' ? (
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

export default PointExpiryDialog;
