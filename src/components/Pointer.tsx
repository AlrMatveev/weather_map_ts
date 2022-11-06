import { FC } from "react";
import { useRef } from "react";

type pointerProps = {
  fly: boolean;
};

const Pointer: FC<pointerProps> = ({ fly }) => {
  const pointerRef = useRef<HTMLDivElement | null>(null);

  if (pointerRef.current)
    fly
      ? (pointerRef.current.className = "notFly pointer")
      : (pointerRef.current.className = "fly pointer");

  return <div ref={pointerRef}></div>;
};

export default Pointer;
