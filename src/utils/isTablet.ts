import { useEffect, useState } from "react";
import { breakpoints } from "./Breakpoints";

/**
 * This function checks if the current viewport matches a tablet breakpoint.
 *
 * @returns {boolean} - `true` if the viewport width is greater than or equal to the tablet breakpoint and less than the desktop breakpoint, otherwise `false`.
 */
export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);
  const handleChange = () =>
    setIsTablet(
      window.innerWidth >= breakpoints.tablet &&
        window.innerWidth < breakpoints.desktop,
    );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleChange();
    window.addEventListener("resize", handleChange);
    return () => window.removeEventListener("resize", handleChange);
  }, []);

  return isTablet;
};
