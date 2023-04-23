import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import { MyProp } from "@/Types/AllTypes";
import { hasCookie } from "cookies-next";
import Router from "next/router";
import { AdminContext } from "@/context/user.context";

const User = ({ children }: MyProp) => {
  const { currentAdmin } = useContext(AdminContext);

  useEffect(() => {
    if (!hasCookie("authentication")) {
      Router.push("/login");
    }
  }, [currentAdmin]);

  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default User;
