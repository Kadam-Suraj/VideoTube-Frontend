import { refreshSession } from "@/api/user.api";
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const ContinueSession = () => {

    const { toast } = useToast();
    const { user, session } = useAuth();

    const handleContinueSession = async () => {
        const response = await refreshSession(session);
        if (response.data.success) {

            toast({
                variant: "default",
                title: "Checking Session",
                description: "Waiting for session to refresh",
            });
            
            setTimeout(() => {
                user();
                toast({
                    variant: "success",
                    title: "Session Refreshed",
                    description: "You are now logged in",
                });
            }, 200);
        }
    }

    if (session) {
        return <NavLink to="/login">
            <Button>Login</Button>
        </NavLink>
    }

    if (!session) {
        return <Button onClick={handleContinueSession}>Login</Button>

        // handleContinueSession();
    }

}

export default ContinueSession