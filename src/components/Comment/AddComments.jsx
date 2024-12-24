import Avatar from "../Avatar"
import PropTypes from "prop-types"
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { addVideoComment } from "@/api/comment.api";

const AddComments = ({ url, id, fnc }) => {
    const [value, setValue] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const handleInputSize = (e) => {
        const textRows = e.target.value.split("\n").length;
        e.target.rows = textRows < 1 ? 1 : textRows;
        setValue(e.target.value)
    }

    const addComment = async () => {
        const response = await addVideoComment(id, { content: value });
        if (response.data.success) {
            fnc();
            setIsClicked(false);
        }
    }

    return (
        <div className="flex items-center gap-3 mb-5 space-y-3">
            <div className="self-start mt-4">
                <Avatar url={url}></Avatar>
            </div>
            <div className="w-full">
                <Textarea
                    type="text"
                    placeholder="Add a comment..."
                    className="order-none border-0 border-b resize-none min-h-10 focus-visible:ring-transparent b-accent-foreground/10"
                    onClick={() => setIsClicked(true)}
                    onChange={(e) => handleInputSize(e)}
                    rows={1}
                />

                {isClicked &&
                    <div className="flex items-center justify-end gap-3 mt-2">
                        <Button onClick={() => setIsClicked(false)} variant="toggle">Cancel</Button>
                        <Button type="submit" onClick={addComment} variant="toggle" className={`bg-accent-foreground/10 ${value.trim() === "" ? "pointer-events-none opacity-50" : ""}`}>Comment</Button>
                    </div>
                }
            </div>
        </div>
    )
}

AddComments.propTypes = {
    url: PropTypes.string,
    id: PropTypes.string,
    fnc: PropTypes.func
}

export default AddComments