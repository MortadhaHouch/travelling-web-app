import { combineReducers } from 'redux';
const initialState = {
    isAdmin:false,
    isLoggedIn:false
};
const loginManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
        return { ...state, isLoggedIn:true };
        case 'LOGOUT':
        return { ...state, isLoggedIn:false };
        default :
        return state
    }
};
const adminManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADMIN':
        return { ...state, isAdmin:true,isUser:false,isLoggedIn:true };
        case 'USER':
        return { ...state, isAdmin:false,isUser:true,isLoggedIn:true };
        default:
        return {...state};
    }
};
const rootReducer = combineReducers({
    isAdmin: adminManagerReducer,
    isLoggedIn: loginManagerReducer
});
export {rootReducer};