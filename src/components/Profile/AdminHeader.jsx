import PropTypes from "prop-types"
const AdminHeader = ({ username }) => {
    return (
        <div>
            <h3 className="text-3xl font-bold">Welcome Back, {username}</h3>
            <span>Seamless Video Management, Elevated Results.</span>
        </div>
    )
}

AdminHeader.propTypes = {
    username: PropTypes.string
}

export default AdminHeader