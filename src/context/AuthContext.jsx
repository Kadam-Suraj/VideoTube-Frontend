import { currentUser } from "@/api/user.api";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { toast } = useToast();

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    });

    const [session, setSession] = useState(() => {
        return JSON.parse(localStorage.getItem("activeSession")) || false;
    });

    const [loggedInUser, setLoggedInUser] = useState(null);

    const login = () => {
        setSession(true);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("activeSession", true);
    }

    const sessionExpired = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    }
    const logout = () => {
        setSession(false);
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("activeSession");
    };

    const user = async () => {
        const response = await currentUser();
        if (response.data.success) {
            login()
            setLoggedInUser(response.data.data);
        }
        if (response.data.statusCode === 401) {
            sessionExpired();
            toast({
                variant: "destructive",
                title: "Session Expired",
                description: "Please login again",
            });
        }
        // else {
        //     logout();
        //     toast({
        //         variant: "destructive",
        //         title: "Session Expired",
        //         description: "Please login again",
        //     });
        // }
    }

    useEffect(() => {
        if (session) {
            user();
        }
    }, [session]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loggedInUser, session, setSession }}>
            {children}
        </AuthContext.Provider>
    );

};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook for accessing auth context
export const useAuth = () => useContext(AuthContext);
