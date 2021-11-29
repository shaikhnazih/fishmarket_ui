import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography, } from "@material-ui/core";
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";

function NotificationsList() {
    const dispatch = useDispatch();
    const notifications = useSelector(({ NotificationsApp }) => NotificationsApp.notifications.entities);
    const searchText = useSelector(({ NotificationsApp }) => NotificationsApp.notifications.searchText);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (notifications) {
            setFilteredData(getFilteredArray(notifications, searchText));
        }
    }, [notifications, searchText]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no Notifications!
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
                        className: "cursor-pointer",
                        onClick: (e, handleOriginal) => {
                            if (rowInfo) {
                                dispatch(Actions.openEditNotificationsDialog(rowInfo.original));
                            }
                        },
                    };
                }}
                data={filteredData}
                columns={[
                    {
                        Header: "Title",
                        accessor: "title",
                        filterable: true,
                        className: "font-bold",
                    },
                    {
                        Header: "Detail",
                        accessor: "notificationDetail",
                        filterable: true,
                    },
                    {
                        Header: "",
                        width: 128,
                        Cell: (row) => (
                            <div className="flex items-center">
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.openEditNotificationsDialog(row.original))
                                    }}
                                >
                                    <Icon> remove_red_eye </Icon>{" "}
                                </IconButton>{" "}
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeNotifications(row.original.id));
                                    }}
                                >
                                    <Icon> delete </Icon>{" "}
                                </IconButton>{" "}
                            </div>
                        ),
                    },
                ]}
                defaultPageSize={10}
                noDataText="No Notifications Found"
            />
        </FuseAnimate>
    );
}

export default NotificationsList;
