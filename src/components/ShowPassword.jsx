import { Eye, EyeOff } from 'lucide-react';
import PropTypes from "prop-types";

const ShowPassword = ({ showPassword, setShowPassword }) => {
    return (
        <span onClick={() => setShowPassword(!showPassword)} className="flex items-center space-x-3 cursor-pointer">
            {
                showPassword ?
                    <EyeOff />
                    :
                    <Eye />
            }
            <button type="button">{showPassword ? "Hide password" : "Show password"}</button>
        </span>
    )
}

ShowPassword.propTypes = {
    showPassword: PropTypes.bool,
    setShowPassword: PropTypes.func
}

export default ShowPassword