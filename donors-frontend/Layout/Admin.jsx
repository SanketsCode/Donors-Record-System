import Header from "@/components/Header";
import { AdminContext } from "@/context/Admin.context";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { hasCookie, getCookie } from "cookies-next";

const Admin = ({ children }) => {
  const { pathname } = useRouter;

  const { currentAdmin } = useContext(AdminContext);

  useEffect(() => {
    if (!hasCookie("authentication")) {
      Router.push("/login");
    }
  }, [currentAdmin]);

  if (currentAdmin == null) {
    return "Loading...";
  }

  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default Admin;
