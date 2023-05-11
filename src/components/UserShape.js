import PropTypes from "prop-types";

const UserShape = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  reviewerStatus: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
});

export default UserShape;
