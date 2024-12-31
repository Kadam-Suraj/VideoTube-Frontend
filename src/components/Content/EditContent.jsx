import { useToast } from "@/hooks/use-toast"
import PropTypes from "prop-types"
import { useState } from "react"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const EditContent = ({ data, IsEditing, fnc, api, type }) => {
    const [value, setValue] = useState(data.content);
    const { toast } = useToast();

    const editContent = async () => {
        if (value === data.content) {
            toast({
                title: `${type[0].toUpperCase() + type.slice(1)} data not changed`,
                description: `Unable to update ${type}.`,
            });
            return;
        }
        const response = await api(data._id, { content: value });
        if (response.data.success) {
            fnc();
            toast({
                variant: "success",
                title: `${type[0].toUpperCase() + type.slice(1)} updated successfully`,
            });
            data.content = value;
            IsEditing(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            < Textarea
                onChange={(e) => setValue(e.target.value)}
                value={value}
                rows={Math.max(1, value.split("\n").length)}
                className="order-none border-0 border-b resize-none min-h-10 focus-visible:ring-transparent b-accent-foreground/10" />
            <div className="flex items-center justify-end gap-3 mt-2">
                <Button
                    onClick={() => { IsEditing(false) }}
                    variant="toggle">
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={editContent}
                    variant="toggle"
                    className={`bg-accent-foreground/10 ${value.trim() === "" ? "pointer-events-none opacity-50" : ""}`}>
                    Update
                </Button>
            </div>
        </div>
    )
}

EditContent.propTypes = {
    data: PropTypes.shape({
        username: PropTypes.string,
        _id: PropTypes.string,
        content: PropTypes.string
    }),
    IsEditing: PropTypes.func,
    fnc: PropTypes.func,
    api: PropTypes.func,
    type: PropTypes.string
}

export default EditContent