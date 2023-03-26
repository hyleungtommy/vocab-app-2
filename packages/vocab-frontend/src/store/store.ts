import { createStore, combineReducers, Action } from 'redux';
import { RootState } from "./states/RootState";
import { initialLoginState } from "./states/LoginState";

//takes the current state and an action, and returns the new state based on the action type
const loginReducer = (state = initialLoginState, action: Action<string> & { payload?: any }) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'SET_ERROR_MSG':
        return { ...state, errorMsg: action.payload };
      default:
        return state;
    }
}

const rootReducer = combineReducers<RootState>({
    login: loginReducer
});
  
export default createStore(rootReducer);