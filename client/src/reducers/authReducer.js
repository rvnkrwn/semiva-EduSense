const initialState = {
    isLoggedIn: false,
    // Add other auth-related properties if needed
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: true,
            };
        // Add other cases as needed
        default:
            return state;
    }
};

export default authReducer;
