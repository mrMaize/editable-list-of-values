import React from "react";
import Elements from "./Elements";

export default () => (
  <>
    <div className="inline">
      <div style={{ paddingTop: "10px" }}>
        <Elements.Head />
        <Elements.Table />
        <Elements.Pagination />
      </div>
    </div>

    <div className="inline hintBlock">
      <Elements.Hints />
    </div>
  </>
);
