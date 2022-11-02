import { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../hooks";
import { fetchWeather } from "../redux/weatherSlice";
import { CSSTransition } from "react-transition-group";
import Loader from "./Loader";
import Weather from "./Weather";

type YmapProps = {
  startCoords: number[];
  status: boolean;
};

const Ymap: FC<YmapProps> = ({ startCoords, status }) => {
  const [size, resize] = useState<number[]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status) {
      loadScript(
        "https://api-maps.yandex.ru/2.1/?apikey=94416829-d281-4d3e-b355-d2d6104e163a&lang=ru_RU",
        init
      );
    }
  }, [status]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      resize([window.innerWidth, window.innerHeight]);
    });
  }, []);

  function loadScript(src: string, callback: () => void): void {
    if (scriptRef.current) return;
    let script = document.createElement("script");
    scriptRef.current = script;
    script.src = src;
    document.head.append(script);
    script.onload = () => callback();
  }

  function init(): void {
    if (mapRef.current) {
      mapRef.current.innerHTML = "";
      const win: any = window;
      win.ymaps.ready((): void => {
        setLoading(false);
        var map = new win.ymaps.Map(mapRef.current, {
          center: startCoords,
          zoom: 8,
          type: "yandex#hybrid",
          controls: [],
        });

        // Отключаем ненужные методы
        map.behaviors.disable("rightMouseButtonMagnifier");
        map.behaviors.disable("dblClickZoom");

        dispatch(fetchWeather(map.getCenter()));

        map.events.add(
          ["boundschange"],
          (): void => {
            dispatch(fetchWeather(map.getCenter()));
          },
          map
        );
      });
    }
  }

  return (
    <>
      <CSSTransition
        nodeRef={loadingRef}
        in={loading}
        timeout={1000}
        classNames="map_loading"
        unmountOnExit
      >
        <div
          ref={loadingRef}
          style={{
            position: "absolute",
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "black",
            left: 0,
            top: 0,
            zIndex: 4999,
          }}
        >
          <Loader />
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={mapRef}
        in={status}
        timeout={3000}
        classNames="map"
        mountOnEnter
      >
        <div ref={mapRef} style={{ width: size[0], height: size[1] }}></div>
      </CSSTransition>
      {status && !loading && <Weather />}
    </>
  );
};

export default Ymap;
