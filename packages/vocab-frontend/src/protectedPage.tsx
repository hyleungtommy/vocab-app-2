import React from "react";
import Router from "next/router";

const ProtectedPage = ({ children }:any) => {
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedPage;