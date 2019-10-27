import React from "react";
import { connect } from "react-redux";
import Row from "./Row/Row";

export default connect(
  state => ({
    data: state.data.data
  }),
  null
)(({ data }) => (
  <>
    <table>
      <tbody>
        {data &&
          data.map((row, index) => (
            <tr key={index}>
              <td>
                <Row row={row} index={index} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </>
));
