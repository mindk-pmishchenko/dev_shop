import PropTypes from 'prop-types';

const category = PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired
});

export default category;