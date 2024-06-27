import { createContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
    });

    const register = async (formData) => {
        try{    const res = await axios.post('http://localhost:8080/api/auth/register', formData);
            if(res.data)
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        }
        catch(error){
            console.log(error)
        }
    
    };

    const login = async (formData) => {
        const res = await axios.post('http://localhost:8080/api/auth/login', formData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, user: state.user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
