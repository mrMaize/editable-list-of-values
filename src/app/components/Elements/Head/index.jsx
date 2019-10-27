import React, { Component } from "react";
import { sortData } from "../../../../utils/redux/thunk/thunk";
import { connect } from "react-redux";

import "../../../../utils/styles/styles.css";
import {setFilters} from "../../../../utils/redux/actions/actions";

class Index extends Component {
  constructor(props) {
    super(props);
    this.searchLabel = '';
    this.searchValue = '';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {data} = this.props;
    data && data.length > 0 && document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.key === "Enter") {
      this.setFilters();
    }
  };

  setFilters = () => {
    this.props.setFilters({
      label: this.searchLabel,
      value: this.searchValue
    });
  };

  onLabelClick = () => {
    this.props.sortData();
  };

  onSearchClick = () => {
    this.setFilters();
  };

  render() {
    const { data, sortOrder } = this.props;
    const labelClassName = `label inline ${sortOrder}`;

    return (
      <>
        {data && data.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="borders">
                    <div
                      onClick={this.onLabelClick}
                      className={labelClassName + " pointer"}
                    >
                      Label
                    </div>
                    <div className="label inline">Value</div>
                    <div>
                      <div className="inline">
                        <input
                          placeholder="Label to search"
                          type="text"
                          className="searchInput"
                          onChange={e => this.searchLabel = e.target.value}
                        />
                      </div>

                      <div className="inline">
                        <input
                          placeholder="Value to search"
                          onChange={e => this.searchValue = e.target.value}
                          type="text"
                          className="searchInput"
                        />
                      </div>

                      <div className="inline">
                        <button
                          className="searchButton"
                          onClick={this.onSearchClick}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}
      </>
    );
  }
}

export default connect(
  state => ({
    data: state.data.data,
    sortOrder: state.data.sortOrder
  }),
  dispatch => ({
    sortData: () => dispatch(sortData()),
    setFilters: filters => dispatch(setFilters(filters))
  })
)(Index);
