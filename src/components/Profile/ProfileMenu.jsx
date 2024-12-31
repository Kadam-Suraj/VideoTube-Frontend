import { logOutUser } from "@/api/user.api";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "../Avatar";

const ProfileMenu = () => {
    const { logout, user, loggedInUser } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        const res = await logOutUser();

        if (res.data.success) {
            logout();
            toast({
                variant: "success",
                title: "Logged out successfully",
                description: "You will be redirected to the login page",
            })
            setTimeout(() => {
                navigate("/login");
            }, 300);
        } else {
            toast({
                variant: "destructive",
                title: "Log out failed",
                description: "Please try again!!!",
            })
        }
    }

    const handleProfileClick = () => {
        setOpen(false);
    }

    useEffect(() => {
        user();
    }, []);


    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="py-2">
                {loggedInUser &&
                    <Avatar url={loggedInUser?.avatar} />
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <NavLink to="/dashboard" onClick={handleProfileClick} className="w-full">
                        Dashboard
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <NavLink to="/user-profile" onClick={handleProfileClick} className="w-full">
                        Profile
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileMenu;