import PropTypes from "prop-types"
import { EllipsisVertical } from "lucide-react"
import { DropdownMenuSeparator } from "../ui/dropdown-menu"
import DeleteContent from "./DeleteContent"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const ContentActions = ({ className, data, fnc, state, setState, api, type }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={(open) => setOpen(open)}>
                <PopoverTrigger>
                    <EllipsisVertical className="cursor-pointer" size={20} />
                </PopoverTrigger>
                <PopoverContent className="max-w-40">
                    <DeleteContent type={type} api={api} fnc={fnc} id={data._id} open={setOpen} />
                    {
                        !state &&
                        <span>
                            <DropdownMenuSeparator />
                            <button onClick={() => { setOpen(false); setState(true); }} className="w-full cursor-pointer text-start">Edit</button>
                        </span>
                    }
                </PopoverContent>
            </Popover>
        </div>
    )
}

ContentActions.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
    }),
    className: PropTypes.string,
    fnc: PropTypes.func,
    state: PropTypes.bool,
    setState: PropTypes.func,
    api: PropTypes.func,
    type: PropTypes.string
}

export default ContentActions