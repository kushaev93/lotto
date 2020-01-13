import {
  ADD_DIGIT,
  REM_DIGIT,
  ADD_SECOND_DIGIT,
  REM_SECOND_DIGIT,
  ERROR,
  CLEAR_ERROR,
  FIRST_GENERATE,
  SECOND_GENERATE,
  WIN,
  LOSE,
  COINCIDENCES,
  
} from "../actions/constants";

const initialState = {
  selected: {
    firstField: [],
    secondField: []
  },
  generated: {
    firstGenerate: [],
    secondGenerate: []
  },
  win: null,
  lose:null,
  firstFieldValues: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19
  ],
  secondFieldValues: [1, 2],
  errors: [],
  coincidences:[]
};

export const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIGIT:
      return {
        ...state,
        selected: {
          firstField: [...state.selected.firstField, action.payload],
          secondField: [...state.selected.secondField]
        }
      };
    case REM_DIGIT:
      return {
        ...state,
        selected: {
          firstField: state.selected.firstField.filter(
            item => item !== action.payload
          ),
          secondField: [...state.selected.secondField]
        }
      };

    case ADD_SECOND_DIGIT:
      return {
        ...state,
        selected: {
          secondField: [...state.selected.secondField, action.payload],
          firstField: [...state.selected.firstField]
        }
      };
    case REM_SECOND_DIGIT:
      return {
        ...state,
        selected: {
          secondField: state.selected.secondField.filter(
            item => item !== action.payload
          ),
          firstField: [...state.selected.firstField]
        }
      };

    case ERROR:
      return {
        ...state,
        errors: [...state.errors, { text: action.payload }]
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errors: []
      };

    case FIRST_GENERATE:
      return {
        ...state,
        generated: {
          firstGenerate: [...state.generated.firstGenerate, action.payload],
          secondGenerate: [...state.generated.secondGenerate]
        }
      };

    case SECOND_GENERATE:
      return {
        ...state,
        generated: {
          secondGenerate: [...state.generated.secondGenerate, action.payload],
          firstGenerate: [...state.generated.firstGenerate]
        }
      };

      case COINCIDENCES:
        return {
          ...state,
          coincidences:[...action.payload]
        };

      case WIN:
        return {
          ...state,
          win: true
        };

        case LOSE:
          return {
            ...state,
            lose: true
          };
    default:
      return state;
  }
};
