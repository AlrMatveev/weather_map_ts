import { FC } from "react";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../hooks";
import { setLocation } from "../redux/weatherSlice";
import { CSSTransition } from "react-transition-group";

type locationProps = {
  status: boolean;
};

type coords = {
  latitude: number;
  longitude: number;
};

const Location: FC<locationProps> = ({ status }) => {
  const locationRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0,
  };

  function success(pos: any): void {
    const crd: coords = pos.coords;
    dispatch(setLocation([crd.latitude, crd.longitude]));
  }

  function error(err: any): void {
    dispatch(setLocation(null));
  }

  return (
    <CSSTransition
      nodeRef={locationRef}
      in={status}
      timeout={500}
      classNames="location"
      unmountOnExit
    >
      <div
        ref={locationRef}
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          color: "white",
          transform: "translateX(-50%)",
          zIndex: 5000,
        }}
      >
        Надо узнать Ваше местоположение
      </div>
    </CSSTransition>
  );
};

export default Location;
