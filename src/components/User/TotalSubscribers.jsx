import countFormat from '@/utils/countFormat'
import PropTypes from 'prop-types'

const TotalSubscribers = ({ count }) => {
    return (
        <span className="text-muted-foreground">
            {countFormat(count)} {count !== 1 ? "Subscribers" : "Subscriber"}
        </span>
    )
}

TotalSubscribers.propTypes = {
    count: PropTypes.number
}

export default TotalSubscribers