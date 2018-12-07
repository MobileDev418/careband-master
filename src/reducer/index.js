import { combineReducers, createStore, compose , applyMiddleware} from "redux";
import  thunk from 'redux-thunk'
import  createLogger from 'redux-logger'
import authService from "../modules/AuthService";
import tabService from "../modules/TabService";
import notiService from "../modules/NotiService";
import navService from "../modules/NavService";
import placeService from "../modules/PlaceService";

const Reducer = combineReducers({
  authService,
  tabService,
  notiService,
  navService,
  placeService
});
const rootReducer = (state, action) => {
	return Reducer(state,action);
}

const logger = createLogger();

let store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
