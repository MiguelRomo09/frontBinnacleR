/* eslint-disable react/prop-types */
import { createContext,useState, useContext, useEffect } from "react";
import { registerRequest,loginRequest, verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used eithin an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signUp = async (user) => {
        try{
            const res = await registerRequest(user);
            console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data);

        }catch(error){
            console.log(error.response.data);
            setErrors(error.response.data)
        }
    };

    const signIn = async (user) => {
        try{
            const res = await loginRequest(user)
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        }catch(error){
            console.log(error);
            setErrors(error.response.data);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            },5000);
            return () => clearTimeout(timer);
        }
    },[errors]);

    useEffect(()=>{
        async function checkLogin(){            
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }
            if(cookies.token){
                try{
                    const res = await verifyTokenRequest(cookies.token);
                    if(!res.data){
                        setLoading(false);
                        setIsAuthenticated(false);
                        return;
                    }

                    setIsAuthenticated(true);
                    setUser(res.data);
                    setLoading(false);

                }catch(error){
                    setLoading(false);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        }
        checkLogin();
    },[]);

    return (
        <AuthContext.Provider value={{
            signUp,
            user,
            loading,
            isAuthenticated,
            errors,
            signIn,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}