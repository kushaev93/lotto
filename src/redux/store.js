import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { selectReducer } from "./reducers";
import logger from "redux-logger";

export const store = createStore(selectReducer,applyMiddleware(thunk, logger));
