import { useEffect } from "react";

export const ScrollToTop = ({change}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [change]);

  return null;
}