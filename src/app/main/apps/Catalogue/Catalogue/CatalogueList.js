import React, { useEffect, useState } from "react";
import { Icon, Button, Grid, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import * as RootActions from 'app/store/actions'
import { useForm } from '@fuse/hooks';
import { actions } from "react-table";
import ReactTable from "react-table";

function CatalogueList() {

    const dispatch = useDispatch();
    const catalogue = useSelector(({ CatalogueApp }) => CatalogueApp.catalogue.items)
    const file = useSelector(({ fuse }) => fuse.file.file);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        dispatch(Actions.getCatalogue())
    }, []);

    function setFile(e) {
        let file = new FormData();
        var element = e.target.files[0];
        file.append('file', element);
        file.append('type', 'catalog');
        dispatch(RootActions.uploadFile(file));
    }

    useEffect(() => {
        if (file != null) {
            dispatch(Actions.addCatalogue({ FilePath: file.filePath, fileName: file.fileName, RoleName: 'admin' }));
        }
    }, [file]);


    useEffect(() => {
        if (catalogue) {
            setFilteredData(catalogue);
        }
    }, [catalogue]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no Catalogues!
        </Typography>{" "}
            </div>
        );
    }

    return (
        <div className="p-24">
            <Grid container spacing={4}>
                <Grid item md={9} >
                    <ReactTable
                        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                        getTrProps={(state, rowInfo, column) => {
                            return {
                                className: "cursor-pointer"
                            };
                        }}
                        data={filteredData}
                        columns={[
                            {
                                Header: "Catalogue Name",
                                id: "fileName",
                                sortable: false,
                                filterable: false,
                                accessor: (filteredData) => { return (<a href={filteredData.filePath} target="_blank">{filteredData.fileName}</a>) },
                            },
                            {
                                Header: "Actions",
                                width: 128,
                                Cell: row => (
                                    <div className="flex items-center">
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                dispatch(Actions.deleteCatalogue(row.original.id))
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </div>
                                )
                            }
                        ]}
                        noDataText="No  found"
                        showPagination={true}
                        showPaginationTop={false}
                        showPaginationBottom={true}
                        pageSizeOptions={[5, 10, 20, 100]}
                        defaultPageSize={10}
                    />
                </Grid>
                <Grid item md={3} >
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
            </Grid>
        </div>
    );
}

export default CatalogueList;
