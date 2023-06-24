const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
const initialState = {
    isLoggedIn: isLoggedIn,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: true,
            };
        case 'SET_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;
