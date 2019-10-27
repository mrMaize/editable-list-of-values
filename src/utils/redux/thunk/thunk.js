import * as actions from "../actions/actions";
import { findRowNumber, sort } from "../../tools/tools";

export function generateSet(value) {
  return dispatch => {
    const valArray = [];

    function Object(id, val) {
      this.id = id;
      this.label = "label_" + val.toString();
      this.value = "value_" + val.toString();
    }

    function randomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    }

    for (let i = 0; i < value; i++) {
      valArray.push(Object(i, randomInteger(0, value)));
    }

    dispatch(actions.updateData(valArray));
  };
}

export function deleteRow(rowId) {
  return (dispatch, getState) => {
    const data = getState().data.data;
    const filteredData = data.filter((data, index) => data.id !== rowId);
    dispatch(actions.deleteRow(filteredData));
  };
}

export function updateRow(id, label, value) {
  return (dispatch, getState) => {
    const data = getState().data.data;
    const rowNumber = findRowNumber(id, data);
    console.log(rowNumber);

    data[rowNumber].label = label;
    data[rowNumber].value = value;

    dispatch(actions.updateData(data));
    dispatch(actions.disableButtons(false));
  };
}

export function addNewValues(label, value) {
  return (dispatch, getState) => {
    const data = getState().data.data;
    const newId = data[data.length - 1].id + 1;

    dispatch(
      actions.addData([
        ...data,
        {
          id: newId,
          label: label,
          value: value
        }
      ])
    );
  };
}

export function sortData() {
  return (dispatch, getState) => {
    dispatch(actions.setSortOrder());
    //dispatch(actions.toggleView());

    const sortedData = sort(getState().data.data, getState().data.sortOrder);

    dispatch(actions.updateData(sortedData));
    //dispatch(actions.toggleView());
  };
}
