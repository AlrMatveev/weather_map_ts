import { FC, useEffect, useState, useRef } from "react";
import { useAppSelector } from "../hooks";
import Spectacular from "../hoc/Spectacular";
import Widget from "./Widget";
import icons from "../icons";
import Pointer from "./Pointer";

const Weather: FC = () => {
  const weather = useAppSelector((state) => state.weather);
  const [fly, setFly] = useState<boolean>(true);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("pointerdown", handleMap);
    window.addEventListener("pointerup", handleMap);

    return () => {
      window.removeEventListener("pointerdown", handleMap);
      window.removeEventListener("pointerup", handleMap);
    };
  }, []);

  function handleMap(event: PointerEvent) {
    event.type === "pointerdown" ? setFly(false) : setFly(true);
  }

  return (
    <>
      <Spectacular status={fly} node={widgetRef}>
        <div
          ref={widgetRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -70px)",
            display: "flex",
            borderRadius: "3px",
            border: "1px solid gray",
            backgroundColor: "rgba(255,255,255, 0.5)",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          {weather.data &&
            Object.entries(weather.data).map(
              (e: [string, number], i: number) => {
                return (
                  <Widget
                    status={weather.status}
                    info={e[1]}
                    icon={icons[e[0]]}
                    key={i}
                  />
                );
              }
            )}
        </div>
      </Spectacular>
      <Pointer fly={fly} />
    </>
  );
};

export default Weather;
