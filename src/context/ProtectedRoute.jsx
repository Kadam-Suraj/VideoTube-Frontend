import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { toast } = useToast();
    const { isLoggedIn } = useAuth();
    const location = useLocation();


    if (!isLoggedIn) {
        toast({
            variant: "destructive",
            title: "Unauthorized user",
            description: `Please log in to access the ${location.pathname.replace("/", "").toUpperCase()}.`,
        })

        return <Navigate to="/login" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.any.isRequired,
};

export default ProtectedRoute;
