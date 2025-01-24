import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { clearPlaylist } from "@/api/playlist"
import { useToast } from "@/hooks/use-toast"
import PropTypes from "prop-types"

const ClearList = ({ id, func }) => {
    const { toast } = useToast();

    const clearList = async () => {
        const response = await clearPlaylist(id);

        if (response.success) {
            toast({
                variant: "success",
                title: response.message || "List cleared successfully"
            })
            func && func()
        } else {
            toast({
                variant: "destructive",
                title: response.message || "List clear failed"
            })
        }
    }
    return (
        <Popover
        // open={open} onOpenChange={(open) => setOpen(open)}
        >
            <PopoverTrigger>
                Clear list
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center gap-2 px-2 py-0 pb-2 sm:flex-row prevent-link">
                <Alert className="w-full space-x-2 border-none min-w-28">
                    <AlertTriangle />
                    <AlertTitle>Confirm action !</AlertTitle>
                    <AlertDescription className="w-full text-accent-foreground/80">
                        This action cannot be undone.
                    </AlertDescription>
                </Alert>
                <Button variant="destructive" className="self-end"
                    onClick={clearList}
                >Clear</Button>
            </PopoverContent>
        </Popover>
    )
}

ClearList.propTypes = {
    id: PropTypes.string,
    func: PropTypes.func
}

export default ClearList