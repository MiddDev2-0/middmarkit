import PropTypes from "prop-types";

const ItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  sellerEmail: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  images: PropTypes.string.isRequired,
});

export default ItemShape;
