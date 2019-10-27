import * as actionTypes from "../actionTypes/actionTypes";

export function updateData(data) {
  return {
    type: actionTypes.UPDATE_DATA,
    data
  };
}

export function resetData(data) {
  return {
    type: actionTypes.RESET_DATA,
    data
  };
}

export function disableButtons(value) {
  return {
    type: actionTypes.DISABLE_BUTTONS,
    value
  };
}

export function updateFilteredData(filteredData) {
  return {
    type: actionTypes.UPDATE_FILTERED_DATA,
    filteredData
  };
}

export function setFilters(filters) {
  return {
    type: actionTypes.SET_FILTERS,
    filters
  };
}

export function goToFirstPage() {
  return {
    type: actionTypes.GO_TO_FIRST_PAGE
  };
}

export function goToLastPage() {
  return {
    type: actionTypes.GO_TO_LAST_PAGE
  };
}

export function goToTheNextPage() {
  return {
    type: actionTypes.GO_TO_THE_NEXT_PAGE
  };
}

export function goToThePrevPage() {
  return {
    type: actionTypes.GO_TO_THE_PREV_PAGE
  };
}

export function addData(data) {
  return {
    type: actionTypes.ADD_DATA,
    data
  };
}

export function deleteRow(data) {
  return {
    type: actionTypes.DELETE_ROW,
    data
  };
}

export function setSortOrder() {
  return {
    type: actionTypes.SET_SORT_ORDER
  };
}

export function toggleView() {
  return {
    type: actionTypes.TOGGLE_VIEW
  };
}
