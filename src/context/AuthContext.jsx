import { currentUser, logOutUser } from "@/api/user.api";
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

    const [loggedInUser, setLoggedInUser] = useState(null);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
    }
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    };

    const user = async () => {
        const response = await currentUser();
        if (response.data.success) {
            localStorage.setItem("isLoggedIn", true);
            setLoggedInUser(response.data.data);
        }
        if (!response.data.success) {
            const res = await logOutUser();
            if (res.data.success) {
                logout();
                toast({
                    variant: "destructive",
                    title: "Session Expired",
                    description: "Please login again",
                });
                return;
            }
        }
    }

    useEffect(() => {
        user();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loggedInUser }}>
            {children}
        </AuthContext.Provider>
    );

};

AuthProvider.propTypes = {
    children: PropTypes.any.isRequired,
};

// Custom hook for accessing auth context
export const useAuth = () => useContext(AuthContext);
