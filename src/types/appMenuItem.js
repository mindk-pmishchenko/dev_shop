import PropTypes from 'prop-types';

const appMenuItem = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  Icon: PropTypes.string,
  items: PropTypes.array,
  staticMenu: PropTypes.bool
});

export default appMenuItem;
