import { FC } from "react";

type widgetProps = {
  info: number;
  icon: any;
  status: string;
};

const Widget: FC<widgetProps> = ({ info, icon, status }) => {
  return (
    <div
      style={{
        fontSize: "20px",
        width: "70px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {icon}
      <div
        style={
          status === "loading"
            ? { filter: "blur(3px)", transition: "300ms" }
            : { transition: "300ms" }
        }
      >
        {info}
      </div>
    </div>
  );
};

export default Widget;
