import { FC } from "react";
import { useEffect, useRef } from "react";

const Pointer: FC = () => {
  const pointerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("pointerdown", () => {
      if (pointerRef.current) pointerRef.current.className = "fly pointer";
    });

    window.addEventListener("pointerup", () => {
      if (pointerRef.current) pointerRef.current.className = "pointer";
    });
  }, []);

  return (
    <div
      ref={pointerRef}
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "red",
      }}
    ></div>
  );
};

export default Pointer;
