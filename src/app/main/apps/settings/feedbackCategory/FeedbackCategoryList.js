import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
// import FeebackMultiSelectMenu from './FeebackMultiSelectMenu';

function FeebackCategoryList(props) {
    const dispatch = useDispatch();
    const feedbackCategory = useSelector(({ feedbackCategoryApp }) => feedbackCategoryApp.feedbackCategory.entities);
    const selectedFeedbackIds = useSelector(({ feedbackCategoryApp }) => feedbackCategoryApp.feedbackCategory.selectedFeedbackCategoryIds);
    const searchText = useSelector(({ feedbackCategoryApp }) => feedbackCategoryApp.feedbackCategory.searchText);
    //const user = useSelector(({ feedbackApp }) => feedbackApp.user);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (feedbackCategory) {
            setFilteredData(getFilteredArray(feedbackCategory, searchText));
        }
    }, [feedbackCategory, searchText]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no Feedback Categories!
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
                                dispatch(Actions.openEditFeedbackCategoryDialog(rowInfo.original));
                            }
                        }
                    }
                }}
                data={filteredData}
                columns={[
                    // {
                    //     Header   : () => (
                    //         <Checkbox
                    //             onClick={(event) => {
                    //                 event.stopPropagation();
                    //             }}
                    //             onChange={(event) => {
                    //                // event.target.checked ? dispatch(Actions.selectAllFeebackCategory()) : dispatch(Actions.deSelectAllFeebackCategory());
                    //             }}
                    //             checked={selectedFeedbackIds && selectedFeedbackIds.length === Object.keys(feedbackCategory).length && selectedFeedbackIds.length > 0}
                    //             indeterminate={selectedFeedbackIds && selectedFeedbackIds.length !== Object.keys(feedbackCategory).length && selectedFeedbackIds.length > 0}
                    //         />
                    //     ),
                    //     accessor : "",
                    //     Cell     : row => {
                    //         return (<Checkbox
                    //                 onClick={(event) => {
                    //                     event.stopPropagation();
                    //                 }}
                    //             checked={selectedFeedbackIds && selectedFeedbackIds.includes(row.value.code)}
                    //                // onChange={() => dispatch(Actions.toggleInSelectedFeebackCategory(row.value.id))}
                    //             />
                    //         )
                    //     },
                    //     className: "justify-center",
                    //     sortable : false,
                    //     width    : 64
                    // },
                    {
                        Header: "Feedback Category Name",
                        accessor: "feedbackCategoryName",
                        filterable: true,
                        className: "font-bold"
                    },
                    {
                        Header: "Description",
                        accessor: "feedbackCategoryDescription",
                        filterable: true
                    },
                    {
                        Header: "",
                        width: 128,
                        Cell: row => (
                            <div className="flex items-center">
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.openEditFeedbackCategoryDialog(row.original))
                                    }}
                                >
                                    <Icon> edit </Icon>
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeFeedbackCategory(row.original.id));
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={100}
                noDataText="No feedback categories found"
            />
        </FuseAnimate>
    );
}

export default FeebackCategoryList;
