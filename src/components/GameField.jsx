import React, { useState } from "react";

//Lodash
import _ from "lodash";

//Mui
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "20px 0px"
  },
  btn: {
    minWidth: "42px",
    border: "1px solid silver"
  },
  btnActive: {
    background: "yellow",
    border: "none",
    padding: "6px 8px",
    minWidth: "40px"
  }
}));

export default function GameField(props) {
  const classes = useStyles();

  const { max, add, selectedFields, remove, leftToChoose, err, clear } = props;

  const hadnleAdd = event => {
    if (leftToChoose == 0) {
      return new Promise((resolve, reject) => {
        err("Can`t be add more digits");
        resolve();
      }).then(() => clear());
    } else {
      event.currentTarget.classList.toggle(classes.btnActive);
      const num = parseInt(event.target.textContent);
      const res = _.find(selectedFields, o => o === num);
      res ? remove(res) : add(num);
    }
  };

  const items = max.map(item => (
    <Button onClick={hadnleAdd} className={classes.btn}>
      {item}
    </Button>
  ));
  return <div className={classes.root}>{items}</div>;
}
