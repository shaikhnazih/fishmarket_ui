import React, { useEffect, useState } from "react";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { FuseUtils, FuseAnimate } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";

function GiftsCategoryList(props) {
  const dispatch = useDispatch();
  const giftsCategory = useSelector(({ giftsCategoryApp }) => giftsCategoryApp.giftsCategory.entities);
  const searchText = useSelector(({ giftsCategoryApp }) => giftsCategoryApp.giftsCategory.searchText);
  const pages = useSelector(({ giftsCategoryApp }) => giftsCategoryApp.giftsCategory.pages);


  const listQuery = useSelector(({ giftsCategoryApp }) => giftsCategoryApp.giftsCategory.listQuery);


  const [filteredData, setFilteredData] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch(Actions.getGiftsCategory());
  }, [listQuery])


  // useEffect(() => {
  //   function getFilteredArray(entities, searchText) {
  //     const arr = Object.keys(entities).map((id) => entities[id]);
  //     if (searchText.length === 0) {
  //       return arr;
  //     }
  //     return FuseUtils.filterArrayByString(arr, searchText);
  //   }

  //   if (giftsCategory) {
  //     setFilteredData(getFilteredArray(giftsCategory, searchText));
  //   }

  //   return () => {
  //     console.log('Gift Category DEstroyed')
  //   }
  // }, [, searchText]);



  useEffect(() => {
    if (giftsCategory) {
      setFilteredData(giftsCategory);
      setLoader(false);
    }
  }, [giftsCategory]);


  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no Gift Categories!
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
                dispatch(Actions.openEditGiftCategoryDialog(rowInfo.original));
              }
            },
          };
        }}
        data={filteredData}
        columns={[
          {
            Header: "Gift Category Name",
            accessor: "giftCategoryName",
            filterable: true,
            className: "font-bold",
          },
          {
            Header: "Description",
            accessor: "description",
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
                    dispatch(Actions.openEditGiftCategoryDialog(row.original))
                  }}
                >
                  <Icon> edit </Icon>{" "}
                </IconButton>{" "}
                <IconButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    dispatch(Actions.removeGiftCategory(row.original.id));
                  }}
                >
                  <Icon> delete </Icon>{" "}
                </IconButton>{" "}
              </div>
            ),
          },
        ]}
        noDataText="No gift categories found"
        className="-highlight"
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

export default GiftsCategoryList;
