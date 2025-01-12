import { refreshSession } from "@/api/user.api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import NavigateButton from "../NavigateButton";

const ContinueSession = () => {

    const { toast } = useToast();
    const { user, session, isLoggedIn } = useAuth();

    const handleContinueSession = async () => {
        toast({
            variant: "default",
            title: "Checking Session . . .",
            description: "Waiting for session to refresh ...",
        });
        const response = await refreshSession();
        if (response.data.success) {
            toast({
                variant: "success",
                title: "Session Refreshed",
                description: "You are now logged in",
            });
            user();
        }
    }

    if (!isLoggedIn && !session) {
        return <NavigateButton to="/login" name="Login" />
    }

    if (session && !isLoggedIn) {
        return <Button onClick={handleContinueSession}>Login</Button>
    }

}

export default ContinueSession