import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography, } from "@material-ui/core";
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";
import moment from 'moment';

function PointExpiryList(props) {
  const dispatch = useDispatch();
  const PointExpirys = useSelector(({ PointExpiryApp }) => PointExpiryApp.PointExpiry.entities);
  const searchText = useSelector(({ PointExpiryApp }) => PointExpiryApp.PointExpiry.searchText);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (PointExpirys) {
      setFilteredData(getFilteredArray(PointExpirys, searchText));
    }
  }, [PointExpirys, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no PointExpirys!
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
                dispatch(Actions.openEditPointExpiryDialog(rowInfo.original));
              }
            },
          };
        }}
        data={filteredData}
        columns={[
          {
            Header: "PointExpiry Date",
            id: "pointExpiryDate",

            accessor: filteredData => {
              return moment(filteredData.pointExpiryDate)
                .format("DD-MM-YYYY")
            },
            filterable: false,
            sortable: false,
            className: "font-bold",
          },
          {
            Header: "Status",
            id: "expired",
            accessor: filteredData => {
              return filteredData.expired ? 'Point Expired' : 'Points Not Expired'
            },
            filterable: false,
            sortable: false
          }
          // {
          //   Header: "",
          //   width: 128,
          //   Cell: (row) => (
          //     <div className="flex items-center">
          //       <IconButton
          //         onClick={(ev) => {
          //           ev.stopPropagation();
          //           dispatch(Actions.openEditPointExpiryDialog(row.original))
          //         }}
          //       >
          //         <Icon> edit </Icon>{" "}
          //       </IconButton>{" "}
          //       <IconButton
          //         onClick={(ev) => {
          //           ev.stopPropagation();
          //           dispatch(Actions.removePointExpiry(row.original.id));
          //         }}
          //       >
          //         <Icon> delete </Icon>{" "}
          //       </IconButton>{" "}
          //     </div>
          //   ),
          // },
        ]}
        defaultPageSize={10}
        noDataText="No Entires found"
      />
    </FuseAnimate>
  );
}

export default PointExpiryList;
