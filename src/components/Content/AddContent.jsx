import PropTypes from "prop-types"
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "../Avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const AddContent = ({ fnc, api, type, id }) => {
    const [value, setValue] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const { loggedInUser } = useAuth();

    const addContent = async () => {
        const response = await api({ content: value }, id);
        if (response.data.success) {
            fnc();
            setIsClicked(false);
            setValue("");
        }
    }

    return (
        <div className="flex items-center gap-3 mb-5 space-y-5">
            <div className="self-start mt-4">
                <Avatar url={loggedInUser?.avatar} />
            </div>
            <div className="flex-grow">
                <Textarea
                    type="text"
                    placeholder={`Add a ${type}...`}
                    className="order-none border-0 border-b rounded-none resize-none min-h-10 focus-visible:ring-transparent b-accent-foreground/10"
                    onClick={() => setIsClicked(true)}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    rows={Math.max(1, value.split("\n").length)}
                />

                {isClicked &&
                    <div className="flex items-center justify-end gap-3 mt-2">
                        <Button
                            onClick={() => { setValue(""); setIsClicked(false) }}
                            variant="toggle">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => { setValue(""); addContent(); }}
                            variant="toggle"
                            className={`bg-accent-foreground/10 capitalize ${value.trim() === "" ? "pointer-events-none opacity-50" : ""}`}>
                            {type}
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

AddContent.propTypes = {
    url: PropTypes.string,
    id: PropTypes.string,
    fnc: PropTypes.func,
    api: PropTypes.func,
    type: PropTypes.string
}

export default AddContent
