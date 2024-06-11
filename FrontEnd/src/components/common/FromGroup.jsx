import PropTypes from "prop-types";

const FromGroup = ({ children }) => {
  return <div className="flex flex-col gap-y-3 mb-4 lg:mb-5">{children}</div>;
};
FromGroup.propTypes = {
  children: PropTypes.node,
};
export default FromGroup;
