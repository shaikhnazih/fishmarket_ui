import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography, } from "@material-ui/core";
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";
import moment from 'moment';

function RedemptionHistoryTable(props) {
    const dispatch = useDispatch();
    const RedemptionHistorys = useSelector(({ RedemptionHistoryApp }) => RedemptionHistoryApp.RedemptionHistory.entities);
    const searchText = useSelector(({ RedemptionHistoryApp }) => RedemptionHistoryApp.RedemptionHistory.searchText);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (RedemptionHistorys) {
            setFilteredData(getFilteredArray(RedemptionHistorys, searchText));
            console.log("Redemption history data");
            console.log(filteredData);
        }
    }, [RedemptionHistorys, searchText]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no RedemptionHistorys!
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
                        Header: "Gift",
                        id: "iconUrl",
                        filterable: true,
                        accessor: (filteredData) => { return (<div><img style={{ marginLeft: "10px", float: "left" }} width="80px" height="50px" src={filteredData.gift.iconUrl} /><p style={{ marginLeft: "5px", float: "left" }} width="80px" height="50px">{filteredData.gift.giftName}</p></div>) },
                    },
                    {
                        Header: "Gift Quantity",
                        id: "giftQuantity",
                        accessor: "giftQuantity",
                        filterable: true
                    },
                    {
                        Header: "Unit Price",
                        id: "unitPrice",
                        accessor: "unitPrice",
                        filterable: true,
                    }, {
                        Header: "Status",
                        id: "status",
                        accessor: (filteredData) => {
                            console.log(filteredData.statusCode);
                            console.log(filteredData.statusCode === "Pending");
                            return (
                                (filteredData.statusCode.toString().trim() == "Pending") ?
                                    (
                                        <Icon className="text-green text-20">check_circle</Icon>) :
                                    (
                                        <Icon className="text-red text-20">remove_circle</Icon>
                                    )
                            )
                        },
                    }
                ]}
                defaultPageSize={10}
                noDataText="No History found"
            />
        </FuseAnimate>
    );
}

export default RedemptionHistoryTable;
