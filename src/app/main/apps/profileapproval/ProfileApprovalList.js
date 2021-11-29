import React, { useEffect, useState } from 'react';
import { Avatar, Checkbox, Icon, IconButton, Typography, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions/profileapproval.actions';
import * as Constants from 'app/constants'
function ProfileApprovalList() {
    const dispatch = useDispatch();
    const profileapproval = useSelector(({ profileapprovalsApp }) => profileapprovalsApp.profileapproval.entities);
    const pages = useSelector(({ profileapprovalsApp }) => profileapprovalsApp.profileapproval.pages);
    const currPage = useSelector(({ profileapprovalsApp }) => profileapprovalsApp.profileapproval.currentPage);
    const searchText = useSelector(({ profileapprovalsApp }) => profileapprovalsApp.profileapproval.searchText);
    const [filteredData, setFilteredData] = useState(null);
    const [loader, setLoader] = useState(true);




    useEffect(() => {
        function getFilteredArray(entities, searchText) {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if (searchText.length === 0) {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if (profileapproval) {
            setFilteredData(getFilteredArray(profileapproval, searchText));
            setLoader(false);
        }
    }, [profileapproval, searchText]);


    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no profileapproval!
                </Typography>
            </div>
        );
    }


    return (
        <ReactTable
            className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
            getTrProps={(state, rowInfo, column) => {
                return {
                    className: "cursor-pointer",
                    onClick: (e, handleOriginal) => {
                        if (rowInfo) {
                        }
                    }
                }
            }}

            data={filteredData}
            loading={loader}
            columns={[
                {
                    Header: "Name",
                    id: "name",
                    accessor: (x => {
                        return (
                            <div>
                                {x.AccountNumber.old != x.AccountNumber.new ?
                                    (<div><div style={{ background: "#ffbaba", padding: 10 }}>{x.AccountNumber.old}</div><div style={{ background: "#b4ffb4", padding: 10 }}>{x.AccountNumber.new}</div></div>) : (x.AccountNumber.old)}
                            </div>
                        )
                    }),
                },
                {
                    Header: "ProfileApproval Name",
                    id: "profileapprovalname",
                    accessor: (x => {
                        return (
                            <div>
                                {x.AnniversaryDAte.old != x.AnniversaryDAte.new ?
                                    (<div><div style={{ background: "#ffbaba", padding: 10 }}>{x.AnniversaryDAte.old}</div><div style={{ background: "#b4ffb4", padding: 10 }}>{x.AnniversaryDAte.new}</div></div>) : (x.AnniversaryDAte.old)}
                            </div>
                        )
                    }),
                },
                {
                    Header: "Membership Code",
                    id: "membershipcode",
                    accessor: (x => {
                        return (
                            <div>
                                {x.BankName.old != x.BankName.new ?
                                    (<div><div style={{ background: "#ffbaba", padding: 10 }}>{x.BankName.old}</div><div style={{ background: "#b4ffb4", padding: 10 }}>{x.BankName.new}</div></div>) : (x.BankName.old)}
                            </div>
                        )
                    }),
                },
                {
                    Header: "ProfileApproval Role",
                    id: "profileapprovalroles",
                    accessor: (x => {
                        return (
                            <div>
                                {x.ContactPersonName.old != x.ContactPersonName.new ?
                                    (<div><div style={{ background: "#ffbaba", padding: 10 }}>{x.ContactPersonName.old}</div><div style={{ background: "#b4ffb4", padding: 10 }}>{x.ContactPersonName.new}</div></div>) : (x.ContactPersonName.old)}
                            </div>
                        )
                    }),
                },
                {
                    Header: "Actions",
                    width: 300,
                    Cell: row => (
                        <div className="flex items-center">

                            {/* <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                }}
                            >
                                <Icon>edit</Icon>
                            </IconButton> */}
                            <Button
                                onClick={(ev) => {

                                    ev.stopPropagation();
                                    // toggleActiveRow.isActive = toggleActiveRow == 1 ? 0 : 1;
                                    dispatch(Actions.updateProfileApproval({ ...row.original, isDisabled: !row.original.isDisabled }));
                                    setLoader(true);
                                }}
                            >
                                {"Approve 2"}
                            </Button>
                            <Button
                                onClick={(ev) => {

                                    ev.stopPropagation();
                                    dispatch(Actions.openResetPasswordDialog(row.original))
                                }}
                            >
                                {"Reject"}
                            </Button>

                        </div>
                    )
                }
            ]}
            noDataText="No profileapproval found"
            className="-highlight"
            showPagination={true}
            showPaginationTop={false}
            showPaginationBottom={true}
            manual
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            pages={pages}
            page={currPage}
            defaultPageSize={10}
            onFetchData={(state, instance) => {

                // setLoader(true);
                // dispatch(Actions.getProfileApproval({ queryType: 'paginated', pageSize: state.pageSize, currentPage: state.page + 1 }));
            }}
        />
    );
}

export default ProfileApprovalList;
