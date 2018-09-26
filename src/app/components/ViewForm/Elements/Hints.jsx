import React, {Component} from "react";
import {connect} from "react-redux";
import {addNewValues, generateSet} from "../../../redux/thunk/thunk";


@connect(
    state => ({
        state: state
    }),
    dispatch => ({
        dispatch: dispatch
    })
)
export default class extends Component {

    state = {
        defaultValue: 10000
    };

    onAddNewValue = () => {
        const
            newLabel = this.refs.newLabel.value,
            newValue = this.refs.newValue.value;

        if (newLabel !== "" || newValue !== "") {
            this.props.dispatch(addNewValues(newLabel, newValue))

        } else {
            alert("Emprty strings are not allowed!")
        }
    };

    onClickGenerateSet = () => {

        if (this.refs.valRange.value === '') {
            this.props.dispatch(generateSet(this.state.defaultValue));

        } else {
            try {
                const value = parseInt(this.refs.valRange.value);
                this.props.dispatch(generateSet(value));

            } catch (e) {
                alert('only numeric input is allowed');

            }
        }
    };

    render() {
        return (
            <div>
                <h1>Hello human</h1>
                <p>Follow the steps bellow:</p>

                <p>1. Press green button says "Generate" to create a random array. It will generate a 10 000 items array
                    by default. You can also enter a cutom value into textfeld next to it. </p>
                <input placeholder={this.state.defaultValue} ref="valRange" className="newValueInput" type={'text'}
                       readOnly={this.props.state.data.data.length > 0}/>
                <button onClick={this.onClickGenerateSet} className="add-button"
                        disabled={this.props.state.data.data.length > 0}>Generate
                </button>


                <p>2. It is shown 20 rows per page. Use navigation bar bellow the list to change the page.</p>

                <p>3. It is possible to delete the line. Just click the red button says "Delete" next to the row you
                    want to blow away.</p>

                <p>4. To edit row click the button says "Edit". Then you'll jump into the edit mode. Change data in the
                    row and click green save button. </p>

                <p>5. You can filter the whole data set. Enter something into input
                    bellow <u><b>Label</b></u> or <u><b>Value</b></u> and press Enter or click blue button says
                    "Search".
                    If nothing is shown, clear all inputs and hit Enter again.</p>

                <p>6. You can sort data by column. Click the "Label" once or twice to see the result. Same with Value
                    label </p>

                <p>7. Finally, you can add new data to the end of the list. Put values into field bellow and click the
                    button says "Add"</p>

                <div className="addContainer">
                    <input placeholder="New Label" className="newValueInput" ref="newLabel"/>
                    <input placeholder="New Value" className="newValueInput" ref="newValue"/>
                    <button disabled={this.props.state.data.data.length === 0} onClick={this.onAddNewValue}
                            className="add-button">Add
                    </button>
                </div>

            </div>
        )
    }
}
