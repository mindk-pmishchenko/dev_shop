import PropTypes from 'prop-types'

export default PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired
}));