import PropTypes from "prop-types"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { EllipsisVertical } from "lucide-react"

const EditComment = ({ className }) => {
    return (
        <div className={className}>
            <Menubar className="bg-transparent border-none">
                <MenubarMenu>
                    <MenubarTrigger className="data-[state=open]:bg-transparent focus:bg-transparent data-[state=open]:text-">
                        <EllipsisVertical className="cursor-pointer" size={20} />
                    </MenubarTrigger>
                    <MenubarContent className="border-none">
                        <MenubarItem>
                            <span>Delete</span>
                        </MenubarItem>
                        <MenubarItem>
                            <span>Edit</span>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

EditComment.propTypes = {
    className: PropTypes.string,
}

export default EditComment