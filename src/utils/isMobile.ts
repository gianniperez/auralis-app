import { useEffect, useState } from "react";
import { breakpoints } from "./Breakpoints";

/**
 * This function checks if the current viewport matches a mobile breakpoint.
 *
 * @returns {boolean} - `true` if the viewport width is less than or equal to the breakpoint, otherwise `false`.
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleChange = () =>
    setIsMobile(window.innerWidth < breakpoints.desktop);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleChange();
    window.addEventListener("resize", handleChange);
    return () => window.removeEventListener("resize", handleChange);
  }, []);

  return isMobile;
};
