import React from "react";

export default function WinPage(props) {
    const { coincidences } = props;
    const values = coincidences.map(num => <span style={{margin:'5px'}}>{num}</span>)
  return (
    <div style={{ textAlign: "center" }}>
      <p>Win</p>
      <p>[{values}]</p>
    </div>
  );
}
