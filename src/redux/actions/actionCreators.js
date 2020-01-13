import {
  ADD_DIGIT,
  REM_DIGIT,
  ADD_SECOND_DIGIT,
  REM_SECOND_DIGIT,
  ERROR,
  CLEAR_ERROR,
  WIN,
  LOSE,
  COINCIDENCES
} from "./constants";

//First Field
export const addDigit = val => {
  return {
    type: ADD_DIGIT,
    payload: val
  };
};

export const removeDigit = val => {
  return {
    type: REM_DIGIT,
    payload: val
  };
};

//SecondField
export const addSecond = val => {
  return {
    type: ADD_SECOND_DIGIT,
    payload: val
  };
};

export const removeSecond = val => {
  return {
    type: REM_SECOND_DIGIT,
    payload: val
  };
};

//ERR

export const errHandle = text => {
  return {
    type: ERROR,
    payload: text
  };
};

export const clearErr = () => {
  return {
    type: CLEAR_ERROR
  };
};

//Generate

const generate = num => {
  let digit = [];
  for (let i = 0; i < num; i++) {
    digit.push(Math.floor(Math.random() * 10 * 2 - 1));
  }
  return digit;
};

export const Generate = (num, type) => {
  let digit = generate(num);
  return {
    type: type,
    payload: digit
  };
};

export const Win = () => {
    return {
        type:WIN,
        payload:true
    }
}

export const Lose = () => {
    return {
        type:LOSE,
        payload:true
    }
}


export const coincidences = (arr) => {
    return {
        type:COINCIDENCES,
        payload:arr
    }
}
