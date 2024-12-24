import PropTypes from 'prop-types';

const Avatar = ({ url }) => {
    return (
        <img
            src={url || "default-avatar.jpg"}
            alt="Avatar"
            className="object-cover w-8 h-8 rounded-full shrink-0"
        />
    )
}

Avatar.propTypes = {
    url: PropTypes.string
}

export default Avatar