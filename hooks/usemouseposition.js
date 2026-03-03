import React from "react";

const useMousePosition = (ref) => {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });

  React.useEffect(() => {
    const updateMousePosition = (ev) => {
      if (!ref.current) return;
      setMousePosition({
        x: ev.clientX - ref.current.getBoundingClientRect().left,
        y: ev.clientY - ref.current.getBoundingClientRect().top,
      });
    };
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [ref]);

  return mousePosition;
};

export default useMousePosition;
