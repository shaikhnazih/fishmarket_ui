import React, { useEffect, useState } from "react";
import { Icon, Button, Grid, IconButton, Typography, } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import * as RootActions from 'app/store/actions'
import { useForm } from '@fuse/hooks';
import { actions } from "react-table";

function UpdateProfileForm() {

    const dispatch = useDispatch();
    const record = useSelector(({ UpdateProfileApp }) => UpdateProfileApp.updateProfiles.entity)
    const file = useSelector(({ fuse }) => fuse.file.file);

    useEffect(() => {
        dispatch(Actions.getUpdateProfileRequest())
    }, []);

    //function setFile(e) {
    //    let file = new FormData();
    //    var element = e.target.files[0];
    //    file.append('file', element);
    //    file.append('type', 'catalog');
    //    dispatch(RootActions.uploadFile(file));
    //}

    useEffect(() => {
        if (file != null) {
            dispatch(Actions.updateRequest({}));
        }
    }, [file]);

    return (


        <div className="p-24">

            <Grid container spacing={4}>
                <Grid item md={4} >
                    <div className="flex">
                        <input
                            accept="application/pdf"
                            className="hidden"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={setFile}
                        />

                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">Upload</Button>
                        </label>
                        <br></br>
                        <p>&nbsp;Upload Only PDF Files</p>
                    </div>
                </Grid>
                <Grid item md={8} >
                </Grid>
            </Grid>
        </div>
    );
}

export default UpdateProfileForm;
