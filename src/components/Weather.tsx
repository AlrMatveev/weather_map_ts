import { FC } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Pointer from "./Pointer";

const Weather: FC = () => {
  const weather = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  console.log(weather);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        zIndex: 5000,
        transform: "translate:(-50%, -50%)",
      }}
    >
      {weather.data?.temp}

      <Pointer />
    </div>
  );
};

export default Weather;
