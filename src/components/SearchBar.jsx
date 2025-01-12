import { Search } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"
import { useAuth } from "@/context/AuthContext";

const SearchBar = ({ className, activeSearch }) => {
    const { isLoggedIn } = useAuth();
    const [value, setValue] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/results?search_query=${value}`);
        activeSearch(false);
    }

    return (
        <div className={className}>
            <form action="" onSubmit={handleSubmit} className="flex items-center w-full md:w-96">
                <Input value={value} disabled={!isLoggedIn} onChange={(e) => setValue(e.target.value)} className="p-0 pl-4 border-l rounded-none rounded-l-full border-y bg-background" placeholder="Search" />
                <Button type="submit" disabled={!value.trim()} className="p-0 pl-3 pr-4 border rounded-none rounded-r-full bg-muted text-accent-foreground hover:bg-muted">
                    <Search />
                </Button>
            </form>
        </div>
    )
}

SearchBar.propTypes = {
    className: PropTypes.string,
    activeSearch: PropTypes.func
}

export default SearchBar