import PropTypes from "prop-types"
import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { EllipsisVertical } from "lucide-react"
// import DeleteComment from "../Comment/DeleteComment"
import { DropdownMenuSeparator } from "../ui/dropdown-menu"
import DeleteContent from "./DeleteContent"

const ContentActions = ({ className, data, fnc, state, api, type }) => {

    return (
        <div className={className}>
            <Menubar className="bg-transparent border-none">
                <MenubarMenu >
                    <MenubarTrigger className="data-[state=open]:bg-transparent focus:bg-transparent">
                        <EllipsisVertical className="cursor-pointer" size={20} />
                    </MenubarTrigger>
                    <MenubarContent className="gap-3 p-3 border-none" >
                        <DeleteContent type={type} api={api} fnc={fnc} id={data._id} />
                        <DropdownMenuSeparator />
                        <button onClick={() => state(true)} className="w-full cursor-pointer text-start">Edit</button>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

ContentActions.propTypes = {
    data: PropTypes.shape({
        username: PropTypes.string,
        _id: PropTypes.string,
    }),
    className: PropTypes.string,
    fnc: PropTypes.func,
    state: PropTypes.func,
    api: PropTypes.func,
    type: PropTypes.string
}

export default ContentActions