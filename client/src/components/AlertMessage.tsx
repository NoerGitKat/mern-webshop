import React from "react";
import { Alert } from "react-bootstrap";

interface IAlertMessage {
  defaultProps?: { variant: string };
  variant?: string;
  children: JSX.Element;
}

const AlertMessage: React.FC<IAlertMessage> = ({
  variant,
  children,
}): JSX.Element => {
  return <Alert variant={variant}>{children}</Alert>;
};

AlertMessage.defaultProps = {
  variant: "info",
};

export default AlertMessage;
