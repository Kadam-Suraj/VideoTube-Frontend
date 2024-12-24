import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ToggleTextView = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textContainerRef = useRef(null);

    useEffect(() => {
        const container = textContainerRef.current;
        if (container) {
            // Check if content overflows
            setIsOverflowing(container.scrollHeight > container.clientHeight);
        }
    }, [children]);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div >
            <div
                ref={textContainerRef}
                className={`overflow-hidden ${isExpanded ? "max-h-none" : "max-h-12"
                    }`
                }
                style={{ transition: "max-height 0.3s ease" }}
            >
                {children}
            </div>
            {
                isOverflowing && (
                    <button
                        className="mt-2"
                        onClick={toggleText}
                    >
                        {isExpanded ? "Show less" : "more..."}
                    </button>
                )
            }
        </div>
    );
};

ToggleTextView.propTypes = {
    children: PropTypes.node,
}

export default ToggleTextView;
