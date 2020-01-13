import React, { useState } from "react";
import { connect } from "react-redux";

//actions
import {
  addDigit,
  removeDigit,
  addSecond,
  removeSecond,
  errHandle,
  clearErr,
  Generate,
  Win,
  Lose,
  coincidences
} from "../redux/actions/actionCreators";
//Const
import { FIRST_GENERATE, SECOND_GENERATE } from "../redux/actions/constants";

//Lodash
import _ from "lodash";

//Components
import GameField from "./GameField";
import SnackBar from "./SnackBar";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FindReplaceIcon from "@material-ui/icons/FindReplace";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  fieldText: {
    fontWeight: "600",
    padding: "0px 11px 0px 0px"
  },
  result: {
    textAlign: "center"
  },
  resultBtn: {
    width: "auto",
    height: "40px",
    padding: "0 29px",
    minWidth: "40px",
    borderRadius: "20px",
    border: "1px solid silver"
  }
}));

function GameCard(props) {
  const classes = useStyles();
  const [bool, setBool] = useState(true);
  const {
    firstField,
    secondField,
    add,
    remove,
    addSecond,
    removeSecond,
    selectedFirstFields,
    selectedSecondFields,
    errors,
    err,
    errClear,
    digitGenerate,
    coincidencesState,
    firstRandom,
    secondRandom,
    winner,
    looser,
    setCoincidences
  } = props;

  let firstleftToChoose = 8 - selectedFirstFields.length;
  let secondleftToChoose = 1 - selectedSecondFields.length;

  const handleClick = () => {
    if (firstleftToChoose == 0 && secondleftToChoose == 0) {
      return new Promise((resolve, reject) => {
        digitGenerate(8, FIRST_GENERATE);
        setBool(false);
        resolve();
      }).then(() => digitGenerate(1, SECOND_GENERATE));
    } else {
      return new Promise((resolve, reject) => {
        err("Please select digits , can`t be empty ");
        resolve();
      }).then(() => errClear());
    }
  };

  const handleClickShowWin = () => {
    let firstRes = [];
    let secondRes = [];
    let arr = firstRandom[0];
    let arr2 = secondRandom[0];

    return new Promise((resolve, reject) => {
      for (let i of selectedFirstFields) {
        if (!arr.includes(i)) {
          firstRes.push(i);
        }
      }

      for (let i of selectedSecondFields) {
        if (arr2.includes(i)) {
          secondRes.push(i);
          
        }

      }

      if (firstRes.length >= 3) {
        console.log(firstRes.length);
        winner();
        setCoincidences(firstRes);
      } else {
        looser();
      }
    });

    // return new Promise((resolve, reject) => {
    //   return new Promise((resolve, reject) => {
    //     if (arr == null) {
    //       throw "Error";
    //     }
    //     resolve(arr);
    //   })
    //     .then(arr => {
    //       return () => {
    //         for (let i of selectedFirstFields) {
    //           if (!arr.includes(i)) {
    //             firstRes.push(i);
    //           }
    //         }

    //         for (let i of selectedSecondFields) {
    //           if (arr2.includes(i)) {
    //             secondRes.push(i);
    //           }
    //         }

    //         if (firstRes > 3 && secondRes > 0) {
    //           return new Promise((resolve, reject) => {
    //             winner();
    //             resolve();
    //           }).then(() => setCoincidences(firstRes));
    //         }
    //       };
    //     })
    //     .catch(e => {
    //       return new Promise((resolve, reject) => {
    //         err(e);
    //         resolve();
    //       }).then(() => errClear());
    //     });
    // }).catch(e => {
    //   return new Promise((resolve, reject) => {
    //     err(e);
    //     resolve();
    //   }).then(() => errClear());
    // });
  };

  return (
    <div>
      <div className={classes.root}>
        <p>Ticket 1</p>
        <div>
          <Button onClick={handleClick}>
            <FindReplaceIcon />
          </Button>
        </div>
      </div>
      <div>
        <div>
          <span className={classes.fieldText}>Field 1</span>
          Select {firstleftToChoose} digits
        </div>
        <GameField
          max={firstField}
          add={add}
          remove={remove}
          selectedFields={selectedFirstFields}
          leftToChoose={firstleftToChoose}
          err={err}
          clear={errClear}
        />

        <div>
          <span className={classes.fieldText}>Field 2</span>
          Select {secondleftToChoose} digit
        </div>
        <GameField
          max={secondField}
          add={addSecond}
          remove={removeSecond}
          selectedFields={selectedSecondFields}
          leftToChoose={secondleftToChoose}
          err={err}
          clear={errClear}
        />
      </div>
      <div className={classes.result}>
        <Button
          disabled={bool}
          className={classes.resultBtn}
          onClick={handleClickShowWin}
        >
          Show Result
        </Button>
      </div>
      <SnackBar message={errors} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    firstField: state.firstFieldValues,
    secondField: state.secondFieldValues,
    selectedFirstFields: state.selected.firstField,
    selectedSecondFields: state.selected.secondField,
    errors: state.errors,
    firstRandom: state.generated.firstGenerate,
    secondRandom: state.generated.secondGenerate,
    coincidencesState: state.coincidences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: val => dispatch(addDigit(val)),
    remove: val => dispatch(removeDigit(val)),
    addSecond: val => dispatch(addSecond(val)),
    removeSecond: val => dispatch(removeSecond(val)),
    err: text => dispatch(errHandle(text)),
    errClear: () => dispatch(clearErr()),
    digitGenerate: (num, type) => dispatch(Generate(num, type)),
    winner: () => dispatch(Win()),
    looser: () => dispatch(Lose()),
    setCoincidences: data => dispatch(coincidences(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
