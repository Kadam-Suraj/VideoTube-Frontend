import { currentUser } from "@/api/user.api";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { toast } = useToast();

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedState = localStorage.getItem("isLoggedIn");
        return savedState === "true"; // Convert string to boolean
    });

    const [session, setSession] = useState(true);

    const [loggedInUser, setLoggedInUser] = useState(null);

    const login = () => {
        setIsLoggedIn(true);
        setSession(true);
        localStorage.setItem("isLoggedIn", true);
    }
    const logout = () => {
        setIsLoggedIn(false);
        setSession(false);
        localStorage.removeItem("isLoggedIn");
    };

    const user = async () => {
        const response = await currentUser();
        if (response.data.success) {
            login()
            setLoggedInUser(response.data.data);
        }
        if (response.data.statusCode === 401) {
            logout();
            toast({
                variant: "destructive",
                title: "Session Expired",
                description: "Please login again",
            });
        }

        // if (response.data.statusCode !== 200 || response.data.statusCode !== 401) {
        //     logout();
        //     const res = await logOutUser();
        //     if (res.data.success) {
        //         toast({
        //             variant: "destructive",
        //             title: "Session Destroyed",
        //             description: "Please login again",
        //         });
        //         return;
        //     }
        // }
    }

    useEffect(() => {
        if (isLoggedIn) {
            // user();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loggedInUser, session }}>
            {children}
        </AuthContext.Provider>
    );

};

AuthProvider.propTypes = {
    children: PropTypes.any.isRequired,
};

// Custom hook for accessing auth context
export const useAuth = () => useContext(AuthContext);
