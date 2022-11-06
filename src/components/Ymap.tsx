import { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../hooks";
import { fetchWeather } from "../redux/weatherSlice";
import Loader from "./Loader";
import Weather from "./Weather";
import Spectacular from "../hoc/Spectacular";

const Ymap: FC = () => {
  const [size, resize] = useState<number[]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [load, setLoad] = useState<boolean>(true);

  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const win: any = window;

  const zoom: number = 6;

  useEffect(() => {
    //гружу скрипт API Yandex Карт
    loadScript(
      "https://api-maps.yandex.ru/2.1/?apikey=94416829-d281-4d3e-b355-d2d6104e163a&lang=ru_RU",
      init
    );

    window.addEventListener("resize", () => {
      resize([window.innerWidth, window.innerHeight]);
    });
  }, []); // eslint-disable-line

  const optionsLoaction = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0,
  };

  function loadScript(src: string, callback: () => void): void {
    if (scriptRef.current) return;
    let script = document.createElement("script");
    scriptRef.current = script;
    script.src = src;
    document.head.append(script);
    script.onload = () => callback();
  }

  function init(): void {
    win.ymaps.ready((): void => {
      //узнаю пестоложение клиента
      navigator.geolocation.getCurrentPosition(success, error, optionsLoaction);

      //перемещаю карту по координатам клиента
      function success(pos: any): void {
        map.setCenter([pos.coords.latitude, pos.coords.longitude], zoom);
      }

      function error(err: any): void {
        console.log(err);
      }

      // убираем прелоадер
      setLoad(false);

      var map = new win.ymaps.Map(mapRef.current, {
        center: [55.755864, 37.617698],
        zoom: zoom,
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

  return (
    <>
      <Spectacular status={load} node={loadingRef}>
        <div
          ref={loadingRef}
          style={{
            position: "absolute",
            width: size[0],
            height: size[1],
            backgroundColor: "black",
            left: 0,
            top: 0,
            zIndex: 4999,
          }}
        >
          <Loader />
        </div>
      </Spectacular>

      <div ref={mapRef} style={{ width: size[0], height: size[1] }}></div>
      <Weather />
    </>
  );
};

export default Ymap;
