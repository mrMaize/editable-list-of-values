import React from "react";
import { deleteRow, updateRow } from "../../../../../utils/redux/thunk/thunk";
import { connect } from "react-redux";
import "../../../../../utils/styles/styles.css";
import { disableButtons } from "../../../../../utils/redux/actions/actions";

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.index = (props.page - 1) * props.rowsPerPage + props.index;

    this.state = {
      readOnly: true,
      labelText: "",
      valueText: ""
    };
  }

  onEdit = () => {
    const { readOnly } = this.state;
    const {
      row: { value, label },
      disableButtons
    } = this.props;

    this.setState({
      readOnly: !readOnly,
      valueText: value,
      labelText: label
    });

    this.refs.labelInput.focus();
    disableButtons();
  };

  onDelete = () => {
    const { row, deleteRow } = this.props;
    console.log(`I'm deleting row with id: ${row.id}`);
    deleteRow(row.id);
  };

  onLabelChange = event => {
    this.setState({ labelText: event.target.value });
  };

  onValueChange = event => {
    this.setState({ valueText: event.target.value });
  };

  onSave = () => {
    const labelInput = this.refs.labelInput.value;
    const valueInput = this.refs.valueInput.value;
    const { row, updateRow } = this.props;

    updateRow(row.id, labelInput, valueInput);

    this.setState(state => ({
      readOnly: !state.readOnly
    }));
  };

  render() {
    const { row, disabledButtons } = this.props;
    const { readOnly, labelText, valueText } = this.state;
    const disabled = readOnly && disabledButtons;

    return (
      <div style={{ borderBottom: "1px solid whiteSmoke" }}>
        <div className="inline">
          <input
            onChange={this.onLabelChange}
            ref="labelInput"
            type="text"
            autoFocus={readOnly}
            readOnly={readOnly}
            value={readOnly ? row.label : labelText}
            className={this.getInputClassName()}
          />
        </div>

        <div className="inline">
          <input
            onChange={this.onValueChange}
            ref="valueInput"
            type="text"
            readOnly={readOnly}
            value={readOnly ? row.value : valueText}
            className={this.getInputClassName()}
          />
        </div>

        <button
          className={readOnly ? "button buttonEdit" : "button buttonSave"}
          onClick={readOnly ? this.onEdit : this.onSave}
          disabled={disabled}
        >
          {readOnly ? "Edit" : "Save"}
        </button>
        <button
          className="buttonDelete"
          onClick={this.onDelete}
          disabled={disabledButtons}
        >
          Delete
        </button>
      </div>
    );
  }

  getInputClassName = () => {
    const averageInput = "input";
    const editableInput = "boldInput";
    const disabledInput = "disabledInput";

    let resultClassName = "";

    if (this.state.readOnly) {
      if (this.props.disabledButtons) {
        resultClassName = disabledInput;
      } else {
        resultClassName = averageInput;
      }
    } else {
      resultClassName = editableInput;
    }

    return resultClassName;
  };
}

export default connect(
  state => ({
    page: state.data.page,
    rowsPerPage: state.data.rowsPerPage,
    disableButtons: state.disabledButtons
  }),
  dispatch => ({
    disableButtons: () => dispatch(disableButtons(true)),
    deleteRow: id => dispatch(deleteRow(id)),
    updateRow: (id, labelInput, valueInput) =>
      dispatch(updateRow(id, labelInput, valueInput))
  })
)(Row);
