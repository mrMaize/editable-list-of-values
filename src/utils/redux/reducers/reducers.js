import { combineReducers } from "redux";
import * as actionTypes from "../actionTypes/actionTypes";
import { sort } from "../../tools/tools";

export const asc = "asc";
export const desc = "desc";

export const initialState = {
  data: {
    data: [],
    filteredData: [],
    label: "",
    value: "",
    page: 1,
    rowsPerPage: 20,
    sortOrder: "",
    toggleView: false
  },
  disabledButtons: false
};

function data(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_DATA:
      return {
        ...state,
        data: action.data,
        filteredData: getFilteredDataByFilters(
          action.data,
          state.label,
          state.value,
          state.sortOrder
        )
      };

    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filteredData: getFilteredDataByFilters(
          state.data,
          action.filters.label,
          action.filters.value,
          state.sortOrder
        ),
        label: action.filters.label,
        value: action.filters.value,
        page: 1
      };

    case actionTypes.UPDATE_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.filteredData
      };

    case actionTypes.GO_TO_THE_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      };

    case actionTypes.GO_TO_THE_PREV_PAGE:
      return {
        ...state,
        page: state.page - 1
      };

    case actionTypes.GO_TO_LAST_PAGE:
      return {
        ...state,
        page: Math.ceil(state.filteredData.length / state.rowsPerPage)
      };

    case actionTypes.GO_TO_FIRST_PAGE:
      return {
        ...state,
        page: 1
      };

    case actionTypes.ADD_DATA:
      const order = "";
      const filteredData = getFilteredDataByFilters(
        action.data,
        state.label,
        state.value,
        order
      );

      return {
        ...state,
        data: action.data,
        filteredData: filteredData,
        page: Math.ceil(filteredData.length / state.rowsPerPage),
        sortOrder: order
      };

    case actionTypes.DELETE_ROW:
      const maxPage = Math.ceil(action.data.length / state.rowsPerPage);

      return {
        ...state,
        data: action.data,
        filteredData: getFilteredDataByFilters(
          action.data,
          state.label,
          state.value,
          state.sortOrder
        ),
        page: state.page > maxPage ? maxPage : state.page
      };

    case actionTypes.RESET_DATA:
      return {
        ...state,
        data: [],
        filteredData: getFilteredDataByFilters(
          action.data,
          state.label,
          state.value,
          state.sortOrder
        )
      };

    case actionTypes.SET_SORT_ORDER:
      const sortOrder = state.sortOrder === asc ? desc : asc;

      return {
        ...state,
        sortOrder: sortOrder,
        page: 1
      };

    default:
      return state;
  }
}

function disabledButtons(state = false, actions) {
  switch (actions.type) {
    case actionTypes.DISABLE_BUTTONS:
      return actions.value;

    default:
      return state;
  }
}

const manageData = combineReducers({
  data,
  disabledButtons
});

export default manageData;

function getFilteredDataByFilters(data, label, value, sortOrder) {
  let filteredData = [];

  if (label === "" && value === "") {
    filteredData = data;
  } else if (label !== "" && value !== "") {
    filteredData = data.filter(
      data => data.label === label && data.value === value
    );
  } else if (label === "") {
    filteredData = data.filter(data => data.value === value);
  } else {
    filteredData = data.filter(data => data.label === label);
  }

  return sort(filteredData, sortOrder);
}
