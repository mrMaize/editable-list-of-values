import React from "react";
import { connect } from "react-redux";
import Row from "./Elements/Row";
import Head from "./Elements/Head";
import Hints from "./Elements/Hints";
import * as actions from "../../utils/redux/actions/actions";

class Main extends React.Component {
  nextPage = () => {
    this.props.dispatch(actions.goToTheNextPage());
  };

  lastPage = () => {
    this.props.dispatch(actions.goToLastPage());
  };

  prevPage = () => {
    this.props.dispatch(actions.goToThePrevPage());
  };

  firstPage = () => {
    this.props.dispatch(actions.goToFirstPage());
  };

  render() {
    let data;

    if (this.props.state.data.filteredData) {
      data = this.props.state.data.filteredData.slice(
        (this.props.state.data.page - 1) * this.props.state.data.rowsPerPage,
        this.props.state.data.page * this.props.state.data.rowsPerPage
      );
    }

    return (
      <div>
        <div className="inline">
          {this.props.state.data.data &&
          this.props.state.data.data.length > 0 ? (
            <div
              style={{
                paddingTop: "10px"
              }}
            >
              <Head />

              <table>
                <tbody>
                  {data &&
                    data.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <Row
                            row={row}
                            index={
                              (this.props.state.data.page - 1) *
                                this.props.state.data.rowsPerPage +
                              index
                            }
                            page={this.props.state.data.page}
                            rowsPerPage={this.props.state.data.rowsPerPage}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {this.props.state.data.filteredData.length >
                this.props.state.data.rowsPerPage && (
                <div>
                  <button
                    className={
                      "paginationButton " +
                      (this.disablePrevPageButton()
                        ? "disabledButton"
                        : "enabledButton")
                    }
                    disabled={this.disablePrevPageButton()}
                    style={{ display: "inline" }}
                    onClick={this.firstPage}
                  >
                    {"<<"}
                  </button>
                  <button
                    className={
                      "paginationButton " +
                      (this.disablePrevPageButton()
                        ? "disabledButton"
                        : "enabledButton")
                    }
                    disabled={this.disablePrevPageButton()}
                    style={{ display: "inline" }}
                    onClick={this.prevPage}
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
                    {this.props.state.data.page}
                  </div>
                  <button
                    className={
                      "paginationButton " +
                      (this.disableNextPageButton()
                        ? "disabledButton"
                        : "enabledButton")
                    }
                    style={{ display: "inline" }}
                    disabled={this.disableNextPageButton()}
                    onClick={this.nextPage}
                  >
                    {">"}
                  </button>
                  <button
                    className={
                      "paginationButton " +
                      (this.disableNextPageButton()
                        ? "disabledButton"
                        : "enabledButton")
                    }
                    style={{ display: "inline" }}
                    disabled={this.disableNextPageButton()}
                    onClick={this.lastPage}
                  >
                    {">>"}
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="inline hintBlock">
          <Hints />
        </div>
      </div>
    );
  }

  disableNextPageButton = () => {
    return (
      this.props.state.data.page ===
        Math.ceil(
          this.props.state.data.filteredData.length /
            this.props.state.data.rowsPerPage
        ) || this.props.state.disabledButtons
    );
  };

  disablePrevPageButton = () => {
    return this.props.state.data.page === 1 || this.props.state.disabledButtons;
  };
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    dispatch: dispatch
  })
)(Main);
