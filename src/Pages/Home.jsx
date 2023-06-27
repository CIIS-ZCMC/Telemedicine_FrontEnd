import { useEffect, useState } from "react";
import DesktopView from "./Homepage/DesktopView";
import MobileView from "./Homepage/MobileView";

const Home = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobileView = windowSize.width <= 1350;

  return <div>{isMobileView ? <MobileView /> : <DesktopView />}</div>;
};

export default Home;
