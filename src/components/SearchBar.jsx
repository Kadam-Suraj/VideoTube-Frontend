import { Search } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ className, activeSearch }) => {
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
                <Input value={value} onChange={(e) => setValue(e.target.value)} className="p-0 pl-4 rounded-none rounded-l-full border-l border-y bg-background" placeholder="Search" />
                <Button type="submit" disabled={!value.trim()} className="p-0 pr-4 pl-3 rounded-none rounded-r-full border bg-muted text-accent-foreground hover:bg-muted">
                    <Search />
                </Button>
            </form>
        </div>
    )
}

export default SearchBar