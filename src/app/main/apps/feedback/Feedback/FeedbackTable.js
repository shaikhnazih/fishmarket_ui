import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography, } from "@material-ui/core";
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";
import moment from 'moment';

function FeedbackTable(props) {
    const dispatch = useDispatch();
    const Feedbacks = useSelector(({ FeedbackApp }) => FeedbackApp.Feedback.entities);
    const searchText = useSelector(({ FeedbackApp }) => FeedbackApp.Feedback.searchText);
    const [filteredData, setFilteredData] = useState(null);

    const listQuery = useSelector(({ FeedbackApp }) => FeedbackApp.Feedback.listQuery);
    const [loader, setLoader] = useState(true);
    const pages = useSelector(({ FeedbackApp }) => FeedbackApp.Feedback.pages);
    useEffect(() => {
        dispatch(Actions.getFeedback());
    }, [listQuery])

    useEffect(() => {
        if (Feedbacks) {
            setFilteredData(Feedbacks);
            setLoader(false);
        }
    }, [Feedbacks]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no Feedbacks!
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
                        Header: "User Name",
                        id: "username",
                        sortable: false,
                        filterable: false,
                        accessor: (filteredData) => { return (filteredData.rcbUserName) },
                    },
                    {
                        Header: "Category",
                        id: "category",
                        sortable: false,
                        filterable: false,
                        accessor: (filteredData) => { return (filteredData.feedbackCategory.feedbackCategoryName) },
                    },
                    {
                        Header: "Message",
                        id: "message",
                        accessor: "message",
                        sortable: false,
                        filterable: false,
                    },
                    {
                        Header: "Rating",
                        id: "rating",
                        sortable: false,
                        filterable: false,
                        accessor: "rating"
                        // accessor: (filteredData) => {
                        //     for (var i = 0; i <= filteredData.rating; i++) {
                        //         <Icon>star</Icon>
                        //     }
                        // }
                    }
                ]}
                loading={loader}
                defaultPageSize={10}
                noDataText="No  found"
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

export default FeedbackTable;
