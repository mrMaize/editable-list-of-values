import React, {Component} from "react";
import {deleteRow, filterByValues, updateRow} from "../../../redux/thunk/thunk";
import {connect} from "react-redux";

import "../../../styles/styles.css"
import * as actions from "../../../redux/actions/actions";


@connect(
    state => ({
        state: state
    }),

    dispatch => ({
        dispatch: dispatch
    })
)
export default class Head extends Component {

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown)
    }

    onKeyDown = (event) => {
        if (event.key === "Enter") {
            this.setFilters();
        }
    };

    setFilters = () => {
        const label = this.refs.searchLabel.value;
        const value = this.refs.searchValue.value;

        this.props.dispatch(actions.setFilters({
            label: label,
            value: value
        }))
    };

    onLabelClick = () => {
        this.props.dispatch(actions.setSortOrder());
    };

    onSearchClick = () => {
        this.setFilters();
    };


    render() {

        const labelClassName = `label inline ${this.props.state.data.sortOrder}`;

        return(
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div className="borders">
                                <div onClick={this.onLabelClick} className="label inline">Label</div>
                                <div className={labelClassName}>Value</div>
                                <div>
                                    <div className="inline">
                                        <input placeholder="Label to search" ref="searchLabel" type="text" className="searchInput"/>
                                    </div>

                                    <div className="inline">
                                        <input placeholder="Value to search" ref="searchValue" type="text" className="searchInput"/>
                                    </div>

                                    <div className="inline">
                                        <button className="searchButton" onClick={this.onSearchClick}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}