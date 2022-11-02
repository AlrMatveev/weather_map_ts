import { FC } from "react";
import { useAppSelector } from "./hooks";
import Ymap from "./components/Ymap";
import Location from "./components/Location";

const App: FC = () => {
  const location = useAppSelector((state) => state.weather.location);

  return (
    <>
      <Location status={location.status === "pending"} />
      <Ymap
        startCoords={location.coords}
        status={location.status === "response"}
      />
    </>
  );
};

export default App;
