import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Error from "@/pages/Error";

const ProtectedRoute = ({ children }) => {
    const { toast } = useToast();
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const [showToast, setShowToast] = useState(false);

    if (!isLoggedIn) {
        if (!showToast) {
            toast({
                variant: "destructive",
                title: "Unauthorized user",
                description: `Please log in to access the ${location.pathname.replace("/", "").toUpperCase()}.`,
            });
            setShowToast(true);
        }

        return <Error code={401} />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.any.isRequired,
};

export default ProtectedRoute;
