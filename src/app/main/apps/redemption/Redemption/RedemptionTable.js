import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography, } from "@material-ui/core";
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";
import moment from 'moment';

function RedemptionTable(props) {
    const dispatch = useDispatch();
    const Redemptions = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.entities);
    const searchText = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.searchText);
    const [filteredData, setFilteredData] = useState(null);
    const pages = useSelector(({ RedemptionApp }) => RedemptionApp.Redemption.pages);
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (Redemptions) {

            setFilteredData(getFilteredArray(Redemptions, searchText));
            setLoader(false);
            console.log("Redemption  data");
            console.log(filteredData);
        }
    }, [Redemptions, searchText]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no Redemptions!
        </Typography>{" "}
            </div>
        );
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
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
                        Header: "Redemption Code",
                        id: "redemptioncode",
                        accessor: (x => (x.requestNo)),
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "Redemption Date",
                        id: "requestDate",
                        accessor: (filteredData => (moment(filteredData.requestDateTime).format("DD-MM-YYYY"))),
                        filterable: false,
                        sortable: false
                    },

                    // {
                    //     Header: "Member Type",
                    //     id: "memberType",
                    //     accessor: (x => (x.member.memberType)),
                    //     filterable: false,
                    //     sortable: false
                    // },,
                    {
                        Header: "Member Name",
                        id: "displayName",
                        accessor: (x => (x.displayName)),
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "Membership Code",
                        id: "membershipCode",
                        accessor: (x => (x.member.membershipCode)),
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "Gift",
                        id: "iconUrl",
                        filterable: false,
                        sortable: false,
                        accessor: (x => (x.gift.giftName)),

                        // accessor: (filteredData) => { return (<div><img style={{ marginLeft: "10px", float: "left" }} width="80px" height="50px" src={filteredData.gift.iconUrl} /><p style={{ marginLeft: "5px", float: "left" }} width="80px" height="50px">{filteredData.gift.giftName}</p></div>) },
                    },
                    // {
                    //     Header: "Gift Quantity",
                    //     id: "giftQuantity",
                    //     accessor: "giftQuantity",
                    //     filterable: false,
                    //     sortable: false
                    // },
                    {
                        Header: "Unit Price",
                        id: "unitPrice",
                        accessor: "unitPrice",
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "Courier Name",
                        id: "courierName",
                        accessor: "courierName",
                        filterable: false,
                        sortable: false
                    },
                    {
                        Header: "AWB No",
                        id: "awbno",
                        accessor: "awbno",
                        filterable: false,
                        sortable: false
                    }


                    , {
                        Header: "Status",
                        id: "status",
                        accessor: (filteredData) => {
                            return filteredData.status.status
                            // return (
                            //     (filteredData.statusCode.toString().trim() == "Pending") ?
                            //         (
                            //             <Icon className="text-green text-20">check_circle</Icon>) :
                            //         (
                            //             <Icon className="text-red text-20">remove_circle</Icon>
                            //         )
                            // )
                        },
                    }
                ]}
                defaultPageSize={10}
                noDataText="No  found"
                showPagination={true}
                showPaginationTop={false}
                showPaginationBottom={true}
                manual
                pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                pages={pages}
                defaultPageSize={10}
                loading={loader}
                onFetchData={(state, instance) => {
                    setLoader(true);
                    dispatch(Actions.getRedemption({ QueryType: 'paginated', pageSize: state.pageSize, currentPage: state.page + 1 }));
                }}
            />
        </FuseAnimate>
    );
}

export default RedemptionTable;
