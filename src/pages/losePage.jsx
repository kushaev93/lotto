import React from "react";

export default function LoosePage(props) {
  const { coincidences } = props;
  const values = coincidences.map(num => <span style={{margin:'5px'}}>{num}</span>)
  return (
    <div style={{ textAlign: "center" }}>
      <p>Loose</p>
      <p>[{values}]</p>
    </div>
  );
}
