import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';

// Combine multiple reducers if needed
const rootReducer = combineReducers({
    auth: authReducer,
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
