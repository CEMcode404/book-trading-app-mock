import { useInView } from "react-intersection-observer";
import React from "react";
// Wrapped the inview with a div and put the ref in the wrapper to
//prevent flickering, cause by transform and any position altering css prop,
//when the element being monitored and viewport meet edge by edge

const WrappedInView = ({
  children,
  threshold = 1,
  rootMargin = "0%",
  root = null,
  className = "",
}) => {
  const { ref, inView, entry } = useInView({
    threshold,
    rootMargin,
    root,
  });
  return (
    <div className={className} ref={ref}>
      {children(inView, entry)}
    </div>
  );
};

export default WrappedInView;
