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
import ReportHeader from './ReportHeader'
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers'



function ReportTable(props) {
  let history = useHistory();

  const dispatch = useDispatch();
  const reports = useSelector(({ reportApp }) => reportApp.report.entities);
  const pages = useSelector(({ reportApp }) => reportApp.report.pages);
  const searchText = useSelector(({ reportApp }) => reportApp.report.searchText);
  const [filteredData, setFilteredData] = useState(null);
  const [loader, setLoader] = useState(true);
  const listQuery = useSelector(({ reportApp }) => reportApp.report.listQuery);





  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const pageLayout = useRef(null);

  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getReports());
  }, [listQuery])

  useEffect(() => {

    if (reports) {
      setFilteredData(reports);
      setLoader(false);
    }
  }, [reports]);


  if (!filteredData) {
    return null;
  }





  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot
      }}
      header={
        <ReportHeader enableSearch={true} header={'Report List'} pageLayout={pageLayout} />
      }


      content={
        filteredData.length === 0 ? <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no reports!
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

              data={reports}
              loading={loader}
              columns={[

                {
                  Header: "Report For",
                  id: "reportFor",
                  accessor: (x => (x.memberType)),
                  sortable: false,

                },
                {
                  Header: "Report Code",
                  id: "code",
                  accessor: (x => (x.reportCode)),
                  sortable: false,

                },
                {
                  Header: "Report Title",
                  id: "title",
                  accessor: (x => (x.reportTitle)),
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

                      <Link style={{ color: 'black' }} to={'../settings/' + row.original.id}><Icon>edit</Icon></Link>

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


export default withReducer('reportApp', reducer)(ReportTable);
