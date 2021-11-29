import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import * as Constants from 'app/constants'
import moment from 'moment';

function RetailerTargetList(props) {
    const dispatch = useDispatch();
    const retailerTargetsApp = useSelector(({ retailerTargetApp }) => retailerTargetApp);

    const retailerTargets = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.entities);
    const pages = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.pages);
    const searchText = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.searchText);
    const [filteredData, setFilteredData] = useState(null);
    const [loader, setLoader] = useState(true);

    const listQuery = useSelector(({ retailerTargetApp }) => retailerTargetApp.retailerTargets.listQuery);

    useEffect(() => {
        dispatch(Actions.getRetailerTarget());
    }, [listQuery])


    useEffect(() => {
        if (retailerTargets) {
            setFilteredData(retailerTargets);
            setLoader(false);
        }
    }, [retailerTargets]);


    useEffect(() => {
        console.log('===============retailerTargetsApp=====================');
        console.log(retailerTargetsApp);
        console.log('====================================');
    }, [retailerTargetsApp])


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no retailer targets please click on Bulk Upload to Add!
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
                                //dispatch(Actions.openEditGiftDialog(rowInfo.original));
                            }
                        }
                    }
                }}

                data={retailerTargets}
                loading={loader}
                columns={[
                    {
                        Header: "Scheme  Description",
                        id: "scheme",

                        accessor: filteredData => { return filteredData.scheme.schemeTitle },
                        filterable: false,
                        className: "font-bold",
                        sortable: false,
                    },
                    {
                        Header: "MembershipCode",
                        accessor: "membershipCode",
                        filterable: false,
                        sortable: false,
                    },
                    {
                        Header: "Target Value",
                        accessor: "targetValue",
                        filterable: false,
                        sortable: false,
                    },
                    {
                        Header: "Target Achieved",
                        accessor: "targetAchievedValue",
                        filterable: false

                    },
                    {
                        Header: "Target Quantity",
                        accessor: "targetQuantity",
                        filterable: false,
                        sortable: false,
                    },
                    {
                        Header: "Target Achieved Quantity ",
                        accessor: "targetAchievedQuantity",
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
                    setLoader(true);
                    dispatch(Actions.setListQuery({ ...listQuery, pageSize: state.pageSize, currentPage: state.page + 1 }));

                }}
            />
        </FuseAnimate>
    );

}

export default RetailerTargetList;
