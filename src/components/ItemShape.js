import PropTypes from "prop-types";

const ItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  sellerId: PropTypes.number.isRequired,
  datePosted: PropTypes.string.isRequired,
  isAvailable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  images: PropTypes.string.isRequired,
});

export default ItemShape;
