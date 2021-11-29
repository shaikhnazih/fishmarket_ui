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
import { validate } from '@material-ui/pickers';

const defaultFormState = {
    code: '',
    giftName: '',
    giftNameError: '',
    iconUrl: '',
    iconFileName: '',
    maxQuantity: 0,
    maxQuantityError: '',
    giftCategoryId: '',
    giftCategoryIdError: '',
    points: 0,

    giftValueInRs: 0,
    giftValueInRsError: '',
    pointsError: '',
    description: '',
    isActive: 1,
    isError: true
};

function GiftDialog(props) {
    const dispatch = useDispatch();
    const giftDialog = useSelector(({ giftsApp }) => giftsApp.gifts.giftDialog);
    const file = useSelector(({ fuse }) => fuse.file.file);

    const giftCategories = useSelector(({ giftsApp }) => giftsApp.gifts.giftCategories);
    const { form, handleChange, setForm } = useForm(defaultFormState);
    const [selectedCategory, setSelectedCategory] = useState(0);

    const initDialog = useCallback(() => {

        if (giftDialog.type === 'edit' && giftDialog.data) {
            setForm({ ...giftDialog.data });
        }

        if (giftDialog.type === 'new') {
            setForm({
                ...defaultFormState,
                ...giftDialog.data,
                //  id: FuseUtils.generateRandom()
            });
        }
    }, [giftDialog.data, giftDialog.type, setForm]);

    function setGiftFile(e) {
        console.log(e.target.files[0])
        let image = new FormData();
        var element = e.target.files[0];
        image.append('file', element);
        image.append('type', 'GiftImages');
        dispatch(RootActions.uploadFile(image));
    }
    function handleSelectedCategory(event) {
        setSelectedCategory(event.target.value);
    }

    useEffect(() => {
        dispatch(Actions.getGiftCategorySelectOptions());
    }, [])

    useEffect(() => {

        if (giftDialog.props.open) {
            initDialog();
        }

    }, [giftDialog.props.open, giftCategories, initDialog]);


    useEffect(() => {
        console.log('useeffect of File');
        console.log(file);
        if (file != null && (file.fileName.split('.')[1] != 'xls' || file.fileName.split('.')[1] != 'xlsx')) {
            setForm({
                ...form,
                iconUrl: file.filePath,
                iconFileName: file.fileName
            });
        }
    }, [file]);


    function validate() {
        var isErrorValidate = false;
        var giftNameErrorValidate = '';
        var pointsErrorValidate = '';
        var giftValueInRsValidate = '';
        var maxQuantityErrorValidate = '';
        var giftCategoryIdValidate = '';
        if (form.giftName.length < 3) {
            giftNameErrorValidate = 'Gift Name Should be minimum 3 charachters long';
            isErrorValidate = true;
        }
        if (form.giftName.length == 0) {
            giftNameErrorValidate = 'Gift Name is required';
            isErrorValidate = true;
        }
        if (form.maxQuantity < 1) {
            maxQuantityErrorValidate = 'Maximum quantity should be atleast 1';
            isErrorValidate = true;
        }
        if (form.points < 1) {
            pointsErrorValidate = 'Points should be greater than 0';
            isErrorValidate = true;
        }
        if (form.giftValueInRs < 1) {
            giftValueInRsValidate = 'MRP should be greater than 0';
            isErrorValidate = true;
        }
        if (form.giftCategoryId < 1) {
            giftCategoryIdValidate = 'Category is required';
            isErrorValidate = true;
        }

        setForm({
            ...form,
            giftNameError: giftNameErrorValidate,
            pointsError: pointsErrorValidate,
            maxQuantityError: maxQuantityErrorValidate,
            giftValueInRsError: giftValueInRsValidate,
            giftCategoryIdError: giftCategoryIdValidate,

            isError: isErrorValidate
        })
    }


    function closeComposeDialog() {
        giftDialog.type === 'edit' ? dispatch(Actions.closeEditGiftDialog()) : dispatch(Actions.closeNewGiftDialog());
    }

    function canBeSubmitted() {
        return (
            form.giftName.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        validate();
        if (!form.isError) {
            if (giftDialog.type === 'new') {
                dispatch(Actions.addGift(form));
            }
            else {
                dispatch(Actions.updateGift(form));
            }
            closeComposeDialog();
        }
    }

    function handleRemove() {
        dispatch(Actions.removeGift(form.id));
        closeComposeDialog();
    }


    function handleCheckboxChangeChange(event) {
        console.log(event.target.name)
        setForm({ ...form, [event.target.name]: event.target.checked ? 1 : 0 });


    }
    let options;
    if (giftCategories != null) {
        options = JSON.parse(giftCategories).data.items.map(category => (
            <MenuItem value={category.id} key={category.id}>{category.giftCategoryName}</MenuItem>
        ))
    } else {
        options = <MenuItem value="0"><em>No Categories Created</em></MenuItem>
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            {...giftDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="lg"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {giftDialog.type === 'new' ? 'New Gift' : 'Edit Gift'}
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                    {giftDialog.type === 'edit' && (
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
                            label="Gift Name"
                            id="giftName"
                            name="giftName"
                            value={form.giftName}
                            onChange={handleChange}
                            onBlur={validate}
                            error={form.giftNameError != undefined && form.giftNameError != ''}
                            helperText={form.giftNameError}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">description</Icon>
                        </div>
                        <FormControl className="flex w-full MuiFormControl-fullWidth mb-24" variant="outlined">
                            <InputLabel htmlFor="giftCategoryId">Category</InputLabel>
                            <Select
                                value={form.giftCategoryId}
                                onChange={handleChange}
                                input={
                                    <OutlinedInput
                                        labelWidth={("category".length * 9)}
                                        name="giftCategoryId"
                                        id="giftCategoryId" />
                                }
                                onBlur={validate}
                                error={form.giftCategoryIdError != undefined && form.giftCategoryIdError != ''}
                                helperText={form.giftCategoryIdError}
                            >
                                {options}


                            </Select>
                        </FormControl>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">description</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Points"
                            id="points"
                            name="points"
                            value={form.points}
                            onChange={handleChange}
                            onBlur={validate}
                            error={form.pointsError != undefined && form.pointsError != ''}
                            helperText={form.pointsError}
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
                            label="MRP"
                            id="giftValueInRs"
                            name="giftValueInRs"
                            value={form.giftValueInRs}
                            onChange={handleChange}
                            onBlur={validate}
                            error={form.giftValueInRsError != undefined && form.giftValueInRsError != ''}
                            helperText={form.giftValueInRsError}
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
                            label="Max Quantity"
                            id="maxQuantity"
                            name="maxQuantity"
                            value={form.maxQuantity}
                            onChange={handleChange}
                            onBlur={validate}
                            error={form.maxQuantityError != undefined && form.maxQuantityError != ''}
                            helperText={form.maxQuantityError}
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
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">description</Icon>
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.isActive}
                                    onChange={handleCheckboxChangeChange}
                                    name="isActive"
                                    color="primary"
                                />
                            }
                            label="Is Active"
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">description</Icon>
                        </div>
                        <input
                            accept="image/*"
                            className="hidden"
                            id="contained-button-file-gift"
                            multiple
                            type="file"
                            onChange={setGiftFile}
                        />
                        <label htmlFor="contained-button-file-gift">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>

                        {form.iconUrl &&
                            <div className={"flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"}>
                                <img className="max-w-none w-auto h-full" src={form.iconUrl} alt="GIFT" />
                                {/* Constants.BASE_URL + "api/file/GetFile/" + */}
                            </div>
                        }
                    </div>

                </DialogContent>

                {giftDialog.type === 'new' ? (
                    <DialogActions className="justify-between p-8">
                        <div className="px-16">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                type="submit"
                                disabled={form.isError}
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
                                    disabled={form.isError}
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

export default GiftDialog;
