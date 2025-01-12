import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button"
import PropTypes from "prop-types"

const NavigateButton = ({ to, name }) => {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(to)}>{name}</Button>
    )
}

NavigateButton.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string
}

export default NavigateButton