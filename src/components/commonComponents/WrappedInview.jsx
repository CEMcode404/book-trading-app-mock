import PropTypes from "prop-types";
import React from "react";
import { useInView } from "react-intersection-observer";
// Wrapped the inview with a div and put the ref in the wrapper to
//prevent flickering, cause by transform and any position altering css prop,
//when the element being monitored and viewport meet edge by edge

const WrappedInView = ({
  children,
  className = "",
  root = null,
  rootMargin = "0%",
  threshold = 1,
}) => {
  const { ref, inView, entry } = useInView({
    root,
    rootMargin,
    threshold,
  });
  return (
    <div className={className} ref={ref}>
      {children(inView, entry)}
    </div>
  );
};

WrappedInView.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  root: PropTypes.node,
  rootMargin: PropTypes.string,
  threshold: PropTypes.number,
};

export default WrappedInView;
