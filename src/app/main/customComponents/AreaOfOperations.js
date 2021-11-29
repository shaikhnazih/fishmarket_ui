// import React, { useState, useEffect, useCallback } from 'react';
// import { OutlinedInput, TextField, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
// import { useForm } from '@fuse/hooks';
// import FuseUtils from '@fuse/FuseUtils';
// import { useDispatch, useSelector } from 'react-redux';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';

// const defaultFormState = {
//     AreaOfOperations: [
//         { HeirarchyType: "Branch", All: false, Items: [] },
//         { HeirarchyType: "RSM", All: false, Items: [] },
//         { HeirarchyType: "TSM", All: false, Items: [] }
//     ]
// };

// const AreaOfOperations = (props) => {

//     const { form, handleChange, setForm } = useForm(defaultFormState);

//     useEffect(() => {
//         setForm({ ...form, AreaOfOperations: props.values })
//     }, [])

//     function handleSelectedCategoryBranch(event) {
//         var _AreaOfOperations = form.AreaOfOperations;
//         _AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "Branch").Items = event.target.value;
//         setForm({ ...form, AreaOfOperations: _AreaOfOperations });
//         props.onCustomeChange(_AreaOfOperations);
//     }

//     function handleSelectedCategoryBranchAll(event) {
//         var _AreaOfOperations = form.AreaOfOperations;
//         _AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "Branch").All = event.target.checked;
//         setForm({ ...form, AreaOfOperations: _AreaOfOperations });
//         props.onCustomeChange(_AreaOfOperations);
//     }

//     function handleSelectedCategoryRSM(event) {
//         var _AreaOfOperations = form.AreaOfOperations;
//         _AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "RSM").Items = event.target.value;
//         setForm({ ...form, AreaOfOperations: _AreaOfOperations });
//         props.onCustomeChange(_AreaOfOperations);
//     }

//     function handleSelectedCategoryRSMAll(event) {
//         var _AreaOfOperations = form.AreaOfOperations;
//         _AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "RSM").All = event.target.checked;
//         setForm({ ...form, AreaOfOperations: _AreaOfOperations });
//         props.onCustomeChange(_AreaOfOperations);
//     }

//     function handleSelectedCategoryTSM(event) {
//         var _AreaOfOperations = form.AreaOfOperations;
//         _AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "TSM").Items = event.target.value;
//         setForm({ ...form, AreaOfOperations: _AreaOfOperations });
//         props.onCustomeChange(_AreaOfOperations);
//     }

//     function handleSelectedCategoryTSMAll(event) {
//         var _AreaOfOperations = form.AreaOfOperations;
//         _AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "TSM").All = event.target.checked;
//         setForm({ ...form, AreaOfOperations: _AreaOfOperations });
//         props.onCustomeChange(_AreaOfOperations);
//     }


//     return (
//         <div>
//             <div className="flex">
//                 <div className="min-w-48 pt-20" style={{ float: "left" }}>
//                     <Icon color="action">Branch</Icon>
//                 </div>
//                 <div style={{ marginTop: "25px" }}>
//                     <div style={{ float: "left", margin: "10px" }}>
//                         <p>All</p>
//                     </div>
//                     <div style={{ float: "left", marginRight: "30px" }}>
//                         <Checkbox
//                             checked={form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "Branch").All}
//                             onChange={handleSelectedCategoryBranchAll}
//                             value={true}
//                             inputProps={{ 'aria-label': 'All' }}
//                         />
//                     </div>
//                 </div>
//                 {form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "Branch").All == false &&
//                     <div style={{ float: "left", width: "600px" }}>
//                         <FormControl className="flex w-full MuiFormControl-fullWidth mb-24" variant="outlined">
//                             <InputLabel htmlFor="filetype">Branch</InputLabel>
//                             <Select
//                                 value={form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "Branch").Items}
//                                 onChange={handleSelectedCategoryBranch
//                                 multiple
//                                 input={
//                                     <OutlinedInput
//                                         labelWidth={("fileType".length * 9)}
//                                         id="areaofoperation" />
//                                 }
//                             >
//                                 <MenuItem value="Kurla">Kurla</MenuItem>
//                                 <MenuItem value="Chembur">Chembur</MenuItem>
//                                 <MenuItem value="Byculla">Byculla</MenuItem>
//                                 <MenuItem value="Dadar">Dadar</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </div>
//                 }
//             </div>

//             <div className="flex">
//                 <div className="min-w-48 pt-20" style={{ float: "left" }}>
//                     <Icon color="action">RSM</Icon>
//                 </div>
//                 <div style={{ marginTop: "25px" }}>
//                     <div style={{ float: "left", margin: "10px" }}>
//                         <p>All</p>
//                     </div>
//                     <div style={{ float: "left", marginRight: "30px" }}>
//                         <Checkbox
//                             checked={form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "RSM").All}
//                             onChange={handleSelectedCategoryRSMAll}
//                             value={true}
//                             inputProps={{ 'aria-label': 'All' }}
//                         />
//                     </div>
//                 </div>
//                 {form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "RSM").All == false &&
//                     <div style={{ float: "left", width: "600px" }}>
//                         <FormControl className="flex w-full MuiFormControl-fullWidth mb-24" variant="outlined">
//                             <InputLabel htmlFor="filetype">RSM</InputLabel>
//                             <Select
//                                 value={form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "RSM").Items}
//                                 onChange={handleSelectedCategoryRSM}
//                                 multiple
//                                 input={
//                                     <OutlinedInput
//                                         labelWidth={("fileType".length * 9)}
//                                         id="areaofoperation" />
//                                 }
//                             >
//                                 <MenuItem value="RSM1">RSM1</MenuItem>
//                                 <MenuItem value="RSM2">RSM2</MenuItem>
//                                 <MenuItem value="RSM3">RSM3</MenuItem>
//                                 <MenuItem value="RSM4">RSM4</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </div>
//                 }
//             </div>

//             <div className="flex">
//                 <div className="min-w-48 pt-20" style={{ float: "left" }}>
//                     <Icon color="action">TSM</Icon>
//                 </div>
//                 <div style={{ marginTop: "25px" }}>
//                     <div style={{ float: "left", margin: "10px" }}>
//                         <p>All</p>
//                     </div>
//                     <div style={{ float: "left", marginRight: "30px" }}>
//                         <Checkbox
//                             checked={form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "TSM").All}
//                             onChange={handleSelectedCategoryTSMAll}
//                             value={true}
//                             inputProps={{ 'aria-label': 'All' }}
//                         />
//                     </div>
//                 </div>
//                 {form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "TSM").All == false &&
//                     <div style={{ float: "left", width: "600px" }}>
//                         <FormControl className="flex w-full MuiFormControl-fullWidth mb-24" variant="outlined">
//                             <InputLabel htmlFor="filetype">TSM</InputLabel>
//                             <Select
//                                 value={form.AreaOfOperations.find(AreaOfOperation => AreaOfOperation.HeirarchyType == "TSM").Items}
//                                 onChange={handleSelectedCategoryTSM}
//                                 multiple
//                                 input={
//                                     <OutlinedInput
//                                         labelWidth={("fileType".length * 9)}
//                                         id="areaofoperation" />
//                                 }
//                             >
//                                 <MenuItem value="TSM1">TSM1</MenuItem>
//                                 <MenuItem value="TSM2">TSM2</MenuItem>
//                                 <MenuItem value="TSM3">TSM3</MenuItem>
//                                 <MenuItem value="TSM4">TSM4</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default AreaOfOperations;