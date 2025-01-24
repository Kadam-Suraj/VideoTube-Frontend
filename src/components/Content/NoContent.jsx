import PropTypes from "prop-types"

const NoContent = ({ children, type }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-1 mt-5">
            {children}
            <h2 className="text-2xl font-semibold text-center">No {type} found</h2>
            <span className="text-center">There are no {type}s available here.</span>
        </div>
    )
}

NoContent.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string
}


export default NoContent