// reducers/auth.ts
import { LOGIN, LOGOUT } from '../src/actions';

interface AuthState {
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLoggedIn: true };
        case LOGOUT:
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
}
