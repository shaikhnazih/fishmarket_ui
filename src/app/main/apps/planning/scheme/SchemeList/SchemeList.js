import React, {useEffect, useState} from 'react';
import {Avatar, Checkbox, Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import SchemeMultiSelectMenu from './SchemeMultiSelectMenu';

function SchemeList(props)
{
    console.log('SchemeApplog', 'dummylist')

    const dispatch = useDispatch();
    const schemes = useSelector(({ schemeApp }) => {
        console.log('SchemeApplog', 'SchemeList111111222')
                                                    console.log('schemeApp', schemeApp); return schemeApp.schemes.entities
        });
    const selectedSchemeIds = useSelector(({ schemeApp }) => schemeApp.schemes.selectedSchemeIds);
    const searchText = useSelector(({ schemeApp }) => schemeApp.schemes.searchText);
    //const user = useSelector(({ schemeApp }) => schemeApp.user);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        console.log(schemes);
        function getFilteredArray(entities, searchText)
        {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if ( searchText.length === 0 )
            {
                return arr;
            }
            console.log(arr, searchText)
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if ( schemes )
        {
            setFilteredData(getFilteredArray(schemes, searchText));
        }
    }, [schemes, searchText]);


    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no schemes!
                </Typography>
            </div>
        );
    }
    console.log(filteredData);
    return (

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                dispatch(Actions.openEditSchemeDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[
                    {
                        Header   : () => (
                            <Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                onChange={(event) => {
//                                    event.target.checked ? dispatch(Actions.selectAllSchemes()) : dispatch(Actions.deSelectAllSchemes());
                                }}
                                checked={selectedSchemeIds && selectedSchemeIds.length === Object.keys(schemes).length && selectedSchemeIds.length > 0}
                                indeterminate={selectedSchemeIds && selectedSchemeIds.length !== Object.keys(schemes).length && selectedSchemeIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                checked={selectedSchemeIds && selectedSchemeIds.includes(row.value.code)}
//                                    onChange={() => dispatch(Actions.toggleInSelectedSchemes(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header: "Scheme Code",
                        accessor  : "code",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        Header: "Scheme Name",
                        accessor  : "schemeName",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        Header    : "Points",
                        accessor  : "points",
                        filterable: true
                    },
                    {
                        Header    : "Max Qty",
                        accessor  : "maxQuantity",
                        filterable: true
                    },
                    {
                        Header: "",
                        width : 128,
                        Cell  : row => (
                            <div className="flex items-center">
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
//                                        dispatch(Actions.toggleStarredScheme(row.original.id))
                                    }}
                                >
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeScheme(row.original.code));
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                noDataText="No Schemes found"
            />
        </FuseAnimate>
    );
}

export default SchemeList;
