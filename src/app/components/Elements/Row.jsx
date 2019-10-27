import React from "react";
import { deleteRow, updateRow } from "../../../utils/redux/thunk/thunk";
import { connect } from "react-redux";
import "../../../utils/styles/styles.css";
import * as actions from "../../../utils/redux/actions/actions";

class Row extends React.Component {
  state = {
    readOnly: true,
    labelText: "",
    valueText: ""
  };

  onEdit = () => {
    const readOnly = this.state.readOnly;

    this.setState({
      readOnly: !readOnly,
      valueText: this.props.row.value,
      labelText: this.props.row.label
    });

    this.refs.labelInput.focus();
    this.props.dispatch(actions.disableButtons(true));
  };

  onDelete = () => {
    const { row } = this.props;

    console.log(`I'm deleting row with id: ${row.id}`);
    this.props.dispatch(deleteRow(row.id));
  };

  onLabelChange = event => {
    this.setState({
      labelText: event.target.value
    });
  };

  onValueChange = event => {
    this.setState({
      valueText: event.target.value
    });
  };

  onSave = () => {
    const labelInput = this.refs.labelInput.value,
      valueInput = this.refs.valueInput.value;

    const { row } = this.props;

    this.props.dispatch(updateRow(row.id, labelInput, valueInput));

    this.setState(state => ({
      readOnly: !state.readOnly
    }));
  };

  render() {
    const { row } = this.props;

    const disabled = this.state.readOnly && this.props.state.disabledButtons;

    return (
      <div style={{ borderBottom: "1px solid whiteSmoke" }}>
        <div className="inline">
          <input
            onChange={this.onLabelChange}
            ref="labelInput"
            type="text"
            autoFocus={this.state.readOnly}
            readOnly={this.state.readOnly}
            value={this.state.readOnly ? row.label : this.state.labelText}
            className={this.getInputClassName()}
          />
        </div>

        <div className="inline">
          <input
            onChange={this.onValueChange}
            ref="valueInput"
            type="text"
            readOnly={this.state.readOnly}
            value={this.state.readOnly ? row.value : this.state.valueText}
            className={this.getInputClassName()}
          />
        </div>

        <button
          className={
            this.state.readOnly ? "button buttonEdit" : "button buttonSave"
          }
          onClick={this.state.readOnly ? this.onEdit : this.onSave}
          disabled={disabled}
        >
          {this.state.readOnly ? "Edit" : "Save"}
        </button>
        <button
          className="buttonDelete"
          onClick={this.onDelete}
          disabled={this.props.state.disabledButtons}
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

    if (this.state.readOnly) {
      if (this.props.state.disabledButtons) {
        return disabledInput;
      } else {
        return averageInput;
      }
    } else {
      return editableInput;
    }
  };
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    dispatch: dispatch
  })
)(Row);
