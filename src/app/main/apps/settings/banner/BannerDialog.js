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
    bannerName: '',
    startDate: new Date(),
    endDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
    imageURL: '',
    fileName: '',
    externalURL: '',
    isError: false,
    endDateError: ''
};

function BannerDialog(props) {
    const dispatch = useDispatch();
    const bannerDialog = useSelector(({ BannerApp }) => BannerApp.Banner.bannerDialog);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const file = useSelector(({ fuse }) => fuse.file.file);


    const initDialog = useCallback(
        () => {
            if (bannerDialog.type === 'edit' && bannerDialog.data) {
                setForm({ ...bannerDialog.data });
            }
            if (bannerDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...bannerDialog.data,
                    id: FuseUtils.generateRandom()
                });
            }
        },
        [bannerDialog.data, bannerDialog.type, setForm],
    );

    useEffect(() => {

        if (bannerDialog.props.open) {
            initDialog();
        }

    }, [bannerDialog.props.open, initDialog]);

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
        bannerDialog.type === 'edit' ? dispatch(Actions.closeEditBannerDialog()) : dispatch(Actions.closeNewBannerDialog());
    }

    function canBeSubmitted() {
        return (
            form.bannerName.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        setForm({ ...form, endDateError: '' });
        if (new Date(form.startDate) > new Date(form.endDate)) {
            setForm({ ...form, endDateError: 'Please add a date greater than or equals to start date' })
        }
        else {
            if (bannerDialog.type === 'new') {
                dispatch(Actions.addBanner(form));
            }
            else {
                dispatch(Actions.updateBanner(form));
            }
            closeComposeDialog();
        }
    }

    function handleRemove() {
        dispatch(Actions.removeBanner(form.id));
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
            {...bannerDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {bannerDialog.type === 'new' ? 'New Banner' : 'Edit Banner'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {bannerDialog.type === 'edit' && (
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
                            label="Banner Name"
                            id="bannerName"
                            name="bannerName"
                            value={form.bannerName}
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
                            label="External URL"
                            id="externalURL"
                            name="externalURL"
                            value={form.externalURL}
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
                            id="startDate"
                            label="Start Date"
                            name="startDate"
                            type="date"
                            defaultValue={moment(form.startDate).format('YYYY-MM-DD')}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </div>
                    <br></br>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">description</Icon>
                        </div>
                        <TextField
                            id="endDate"
                            label="End Date"
                            name="endDate"
                            type="date"
                            defaultValue={moment(form.endDate).format('YYYY-MM-DD')}
                            onChange={handleChange}
                            error={form.endDateError != undefined && form.endDateError != ''}
                            helperText={form.endDateError}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </div>
                    <br></br>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">description</Icon>
                        </div>
                        <input
                            accept="image/*"
                            className="hidden"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={setFile}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                        {form.imageURL &&

                            <div className={"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"}>
                                <img className="max-w-none w-auto h-full" src={form.imageURL} alt="BANNER" />
                            </div>
                        }
                    </div>
                </DialogContent>

                {bannerDialog.type === 'new' ? (
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

export default BannerDialog;
