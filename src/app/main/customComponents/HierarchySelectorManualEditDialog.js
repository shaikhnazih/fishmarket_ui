import React, { useState, useEffect, useCallback, useRef } from 'react';
import { OutlinedInput, TextField, Input, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';




var HierarchySelectorManualEditDialog = function (props) {

    const [selectedString, setSelectedString] = useState("");
    function closeComposeDialog() {
        props.closeDialog();
        //        bannerDialog.type === 'edit' ? dispatch(Actions.closeEditBannerDialog()) : dispatch(Actions.closeNewBannerDialog());
    }
    function handleSubmit() {

        props.save(selectedString);

    }
    useEffect(() => {
        setSelectedString(props.data);
    }, [props.dialogProps.open])
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     setForm({ ...form, endDateError: '' });
    //     if (new Date(form.startDate) > new Date(form.endDate)) {
    //         setForm({ ...form, endDateError: 'Please add a date greater than or equals to start date' })
    //     }
    //     else {
    //         if (bannerDialog.type === 'new') {
    //             dispatch(Actions.addBanner(form));
    //         }
    //         else {
    //             dispatch(Actions.updateBanner(form));
    //         }
    //         closeComposeDialog();
    //     }
    // }




    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...props.dialogProps}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {props.title} - {props.all ? 'Exclude' : 'Include'}
                    </Typography>
                </Toolbar>

            </AppBar>
            <DialogContent classes={{ root: "p-24" }}>

                <div className="flex">
                    <div className="min-w-48 pt-20">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24"
                        label={"Comma Seperated " + props.title}
                        id={props.title}
                        name={props.title}
                        value={selectedString}
                        onChange={(v) => { setSelectedString(v.target.value) }}
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
                    //disabled={!canBeSubmitted()}
                    >
                        Save
                            </Button>
                </div>
            </DialogActions>

        </Dialog>
    );
}

export default HierarchySelectorManualEditDialog;
