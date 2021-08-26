import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
//Copyright (c) 2020 Jason Watmore
const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert
});

export default rootReducer;