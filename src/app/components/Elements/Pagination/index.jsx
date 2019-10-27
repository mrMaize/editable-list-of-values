import React from "react";
import { connect } from "react-redux";
import { goToThePrevPage } from "../../../../utils/redux/actions/actions";
import { goToLastPage } from "../../../../utils/redux/actions/actions";
import { goToTheNextPage } from "../../../../utils/redux/actions/actions";
import { goToFirstPage } from "../../../../utils/redux/actions/actions";

export default connect(
  state => ({
    filteredData: state.data.filteredData,
    rowsPerPage: state.data.rowsPerPage,
    page: state.data.page,
    disabledButtons: state.disabledButtons
  }),
  dispatch => ({
    goToTheNextPage: () => dispatch(goToTheNextPage()),
    goToLastPage: () => dispatch(goToLastPage()),
    goToThePrevPage: () => dispatch(goToThePrevPage()),
    goToFirstPage: () => dispatch(goToFirstPage())
  })
)(
  ({
    filteredData,
    rowsPerPage,
    page,
    disabledButtons,
    goToTheNextPage,
    goToLastPage,
    goToThePrevPage,
    goToFirstPage
  }) => {

    const disableNextPageButton =
      page === Math.ceil(filteredData.length / rowsPerPage) || disabledButtons;

    const disablePrevPageButton = page === 1 || disabledButtons;

    return (
      <>
        {filteredData.length > rowsPerPage ? (
          <>
            <button
              className={
                "paginationButton " +
                (disablePrevPageButton ? "disabledButton" : "enabledButton")
              }
              disabled={disablePrevPageButton}
              style={{ display: "inline" }}
              onClick={goToFirstPage}
            >
              {"<<"}
            </button>
            <button
              className={
                "paginationButton " +
                (disablePrevPageButton ? "disabledButton" : "enabledButton")
              }
              disabled={disablePrevPageButton}
              style={{ display: "inline" }}
              onClick={goToThePrevPage}
            >
              {"<"}
            </button>
            <div
              style={{
                padding: "5px",
                display: "inline",
                fontFamily: "Courier, serif"
              }}
            >
              {page}
            </div>
            <button
              className={
                "paginationButton " +
                (disableNextPageButton ? "disabledButton" : "enabledButton")
              }
              style={{ display: "inline" }}
              disabled={disableNextPageButton}
              onClick={goToTheNextPage}
            >
              {">"}
            </button>
            <button
              className={
                "paginationButton " +
                (disableNextPageButton ? "disabledButton" : "enabledButton")
              }
              style={{ display: "inline" }}
              disabled={disableNextPageButton}
              onClick={goToLastPage}
            >
              {">>"}
            </button>
          </>
        ) : null}
      </>
    );
  }
);
