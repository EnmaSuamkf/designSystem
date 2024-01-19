import PropTypes from "prop-types";
const Show = ({ when, children }) => {
  return when ? children : null;
};

Show.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Show;
