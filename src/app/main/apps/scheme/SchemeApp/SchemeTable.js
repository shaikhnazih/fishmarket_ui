import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Checkbox, Icon, IconButton, Typography, Button } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FusePageCarded, DemoContent } from '@fuse';
import SchemeHeader from './SchemeHeader'
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers'



function SchemeTable(props) {
  let history = useHistory();

  const dispatch = useDispatch();
  const schemes = useSelector(({ schemeApp }) => schemeApp.scheme.entities);
  const pages = useSelector(({ schemeApp }) => schemeApp.scheme.pages);
  const searchText = useSelector(({ schemeApp }) => schemeApp.scheme.searchText);
  const [filteredData, setFilteredData] = useState(null);
  const [loader, setLoader] = useState(true);
  const listQuery = useSelector(({ schemeApp }) => schemeApp.scheme.listQuery);





  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const pageLayout = useRef(null);

  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getSchemes());
  }, [listQuery])

  useEffect(() => {

    if (schemes) {
      setFilteredData(schemes);
      setLoader(false);
    }
  }, [schemes]);


  if (!filteredData) {
    return null;
  }





  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot
      }}
      header={
        <SchemeHeader enableSearch={true} header={'Scheme List'} pageLayout={pageLayout} />
      }


      content={
        filteredData.length === 0 ? <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no schemes!
                      </Typography>
        </div> : <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
              className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
              getTrProps={(state, rowInfo, column) => {
                return {
                  className: "cursor-pointer",
                  onClick: (e, handleOriginal) => {
                    if (rowInfo) {
                      //  dispatch(Actions.openEditUserDialog(rowInfo.original));
                    }
                  }
                }
              }}

              data={schemes}
              loading={loader}
              columns={[

                {
                  Header: "Scheme For",
                  id: "schemeFor",
                  accessor: (x => (x.memberType)),
                  sortable: false,

                },
                {
                  Header: "Scheme Code",
                  id: "code",
                  accessor: (x => (x.schemeCode)),
                  sortable: false,

                },
                {
                  Header: "Scheme Title",
                  id: "title",
                  accessor: (x => (x.schemeTitle)),
                  sortable: false,

                },
                {
                  Header: "Period",
                  id: "Period",
                  accessor: filteredData => {
                    return moment(filteredData.startDate).format("DD-MM-YYYY").toString() + ' - ' + moment(filteredData.endDate).format("DD-MM-YYYY").toString()
                  },
                  sortable: false,
                },
                {
                  Header: "Budget",
                  id: "budget",
                  accessor: (x => (x.budget ? x.budget : '-')),
                  sortable: false,
                },
                {
                  Header: "Settlement Date",
                  id: "settlement",
                  accessor: filteredData => {
                    return moment(filteredData.settlementDate)
                      .format("DD-MM-YYYY")
                  },
                  sortable: false,
                },
                {
                  Header: "Actions",
                  width: 300,
                  Cell: row => (
                    <div className="flex items-center">

                      <Link style={{ color: 'black' }} to={location => ({ ...location, pathname: "/apps/scheme/settings/" + row.original.id })}><Icon>edit</Icon>Edit</Link>
                      <Link style={{ color: 'black' }} to={location => ({ ...location, pathname: "/apps/scheme/settings/c_" + row.original.id })}><Icon>file_copy</Icon>Copy</Link>

                      {/* <Button
                  onClick={(ev) => {

                    ev.stopPropagation();
                    // toggleActiveRow.isActive = toggleActiveRow == 1 ? 0 : 1;
                    //   dispatch(Actions.updateUser({ ...row.original, isDisabled: !row.original.isDisabled }));
                    setLoader(true);
                  }}
                >
                  {row.original.isDisabled ? "Activate" : "Deactivate"}
                </Button> */}
                    </div>
                  )
                }

                // , {
                //     Header: "Status",
                //     id: "status",
                //     accessor: (filteredData) => {
                //         return filteredData.statusCode
                //         // return (
                //         //     (filteredData.statusCode.toString().trim() == "Pending") ?
                //         //         (
                //         //             <Icon className="text-green text-20">check_circle</Icon>) :
                //         //         (
                //         //             <Icon className="text-red text-20">remove_circle</Icon>
                //         //         )
                //         // )
                //     },
                // }
              ]}
              noDataText="No user found"
              className="-highlight"
              showPagination={true}
              showPaginationTop={false}
              showPaginationBottom={true}
              manual
              pageSizeOptions={[2, 5, 10, 20, 25, 50, 100]}
              pages={pages}
              defaultPageSize={10}
              onFetchData={(state, instance) => {

                setLoader(true);
                dispatch(Actions.setListQuery({ ...listQuery, pageSize: state.pageSize, currentPage: state.page + 1 }));
              }}


            />
          </FuseAnimate>


      }
    />



  )

}


export default withReducer('schemeApp', reducer)(SchemeTable);
