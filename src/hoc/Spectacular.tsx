import { FC } from "react";
import { CSSTransition } from "react-transition-group";

type SpectacularProps = {
  status: boolean;
  node: any;
  children: JSX.Element;
  className?: string;
};

const Spectacular: FC<SpectacularProps> = ({
  status,
  node,
  children,
  className,
}) => {
  return (
    <CSSTransition
      nodeRef={node}
      in={status}
      timeout={1000}
      classNames={className}
      mountOnEnter
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

Spectacular.defaultProps = { className: "my-node" };

export default Spectacular;
