import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography, } from "@material-ui/core";
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";
import moment from 'moment';

function BannersList(props) {
  const dispatch = useDispatch();
  const Banners = useSelector(({ BannerApp }) => BannerApp.Banner.entities);
  const searchText = useSelector(({ BannerApp }) => BannerApp.Banner.searchText);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (Banners) {
      setFilteredData(getFilteredArray(Banners, searchText));
    }
  }, [Banners, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no Banners!
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
                dispatch(Actions.openEditBannerDialog(rowInfo.original));
              }
            },
          };
        }}
        data={filteredData}
        columns={[
          {
            Header: "Banner's Title",
            accessor: "bannerName",
            filterable: false,
            sortable: false,
            className: "font-bold",
          },
          {
            Header: "Start Date",
            id: "startDate",
            accessor: filteredData => {
              return moment(filteredData.startDate)
                .format("DD-MM-YYYY")
            },
            filterable: false,
            sortable: false
          },
          {
            Header: "End Date",
            id: "endDate",
            accessor: filteredData => {
              return moment(filteredData.endDate)
                .format("DD-MM-YYYY")
            },
            filterable: false,
            sortable: false
          },
          {
            Header: "",
            width: 128,
            Cell: (row) => (
              <div className="flex items-center">
                <IconButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    dispatch(Actions.openEditBannerDialog(row.original))
                  }}
                >
                  <Icon> edit </Icon>{" "}
                </IconButton>{" "}
                <IconButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    dispatch(Actions.removeBanner(row.original.id));
                  }}
                >
                  <Icon> delete </Icon>{" "}
                </IconButton>{" "}
              </div>
            ),
          },
        ]}
        defaultPageSize={10}
        noDataText="No banners found"
      />
    </FuseAnimate>
  );
}

export default BannersList;
