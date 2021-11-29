import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import GiftsMultiSelectMenu from './GiftsMultiSelectMenu';
import * as Constants from 'app/constants'
function GiftsList(props) {
    const dispatch = useDispatch();
    const gifts = useSelector(({ giftsApp }) => giftsApp.gifts.entities);
    const pages = useSelector(({ giftsApp }) => giftsApp.gifts.pages);
    const searchText = useSelector(({ giftsApp }) => giftsApp.gifts.searchText);
    const [filteredData, setFilteredData] = useState(null);
    const [loader, setLoader] = useState(true);

    const listQuery = useSelector(({ giftsApp }) => giftsApp.gifts.listQuery);

    useEffect(() => {
        dispatch(Actions.getGifts());
    }, [listQuery])





    useEffect(() => {
        // function getFilteredArray(entities, searchText) {
        //     const arr = Object.keys(entities).map((id) => entities[id]);
        //     // if (searchText.length === 0) {
        //     return arr;
        //     // }
        //     return FuseUtils.filterArrayByString(arr, searchText);
        // }

        if (gifts) {
            setFilteredData(gifts);
            setLoader(false);
        }
    }, [gifts]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no gifts!
                </Typography>
            </div>
        );
    }


    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditGiftDialog(rowInfo.original));
                            }
                        }
                    }
                }}

                data={gifts}
                loading={loader}
                columns={[
                    {
                        Header: "Gift Name",
                        accessor: "giftName",
                        filterable: false,
                        className: "font-bold",
                        sortable: false,
                    },
                    {
                        Header: "Points",
                        accessor: "points",
                        filterable: false,
                        sortable: false,
                    },
                    {
                        Header: "MRP",
                        accessor: "giftValueInRs",
                        filterable: false,
                        sortable: false,
                    },
                    {
                        Header: "Max Qty",
                        accessor: "maxQuantity",
                        filterable: false

                    },
                    // {
                    //     id: "isActive",
                    //     Header: "Gift Status",
                    //     accessor: filteredData => {
                    //         return (

                    //             <Typography>Test</Typography>
                    //         )
                    //     }
                    // },
                    {
                        Header: "Actions",
                        width: 300,
                        Cell: row => (
                            <div className="flex items-center">

                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.openEditGiftDialog(row.original))
                                    }}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeGift(row.original.id));
                                        setLoader(true);
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                                <Button
                                    onClick={(ev) => {

                                        ev.stopPropagation();
                                        // toggleActiveRow.isActive = toggleActiveRow == 1 ? 0 : 1;
                                        dispatch(Actions.updateGift({ ...row.original, isActive: row.original.isActive == 1 ? 0 : 1 }));
                                        setLoader(true);
                                    }}
                                >
                                    {row.original.isActive == 0 ? "Activate" : "Deactivate"}
                                </Button>
                            </div>
                        )
                    }
                ]}
                noDataText="No gifts found"
                className="-highlight"
                showPagination={true}
                showPaginationTop={false}
                showPaginationBottom={true}
                manual
                pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                pages={pages}
                /// page={currPage}
                defaultPageSize={10}
                onFetchData={(state, instance) => {
                    console.log(state);
                    console.log("state");
                    setLoader(true);
                    dispatch(Actions.setListQuery({ ...listQuery, pageSize: state.pageSize, currentPage: state.page + 1 }));

                }}
            />
        </FuseAnimate>
    );
}

export default GiftsList;
