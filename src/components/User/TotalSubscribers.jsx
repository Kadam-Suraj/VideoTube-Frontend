import countFormat from '@/utils/countFormat'
import PropTypes from 'prop-types'

const TotalSubscribers = ({ count }) => {
    return (
        <span className="opacity-50 dark:text-gray-300 dark:opacity-80">
            {countFormat(count)} {count !== 1 ? "Subscribers" : "Subscriber"}
        </span>
    )
}

TotalSubscribers.propTypes = {
    count: PropTypes.number
}

export default TotalSubscribers