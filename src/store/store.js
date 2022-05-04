import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { calendarReducer } from "../reducers/calendarReducer";
import { notificationReducer } from "../reducers/notificationReducers";
import { uiReducer } from "../reducers/uiReducers";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    notification: notificationReducer,
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)