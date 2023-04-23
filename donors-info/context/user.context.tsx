import { MyProp, contextUser, resUser } from "@/Types/AllTypes";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "typescript-cookie";
import { hasCookie, deleteCookie } from "cookies-next";
import { log } from "console";
import axios from "axios";

export const AdminContext = createContext<contextUser>({
  currentAdmin: null,
  setCurrentAdmin: (user: resUser) => null,
});

export const AdminProvider = ({ children }: MyProp) => {
  const router = useRouter();
  const [currentAdmin, setCurrentAdmin] = useState<null | resUser>(null);
  const value = {
    currentAdmin: currentAdmin,
    setCurrentAdmin: (user: resUser) => {
      setCurrentAdmin(null);
      return null;
    },
  };

  useEffect(() => {
    if (hasCookie("authentication")) {
      try {
        const authenticationCookie = getCookie("authentication");
        if (authenticationCookie != undefined) {
          JSON.parse(authenticationCookie);
        }
      } catch (error) {
        console.log(error);
        deleteCookie("authentication");
        router.push("/");
      }

      const authenticationCookie = getCookie("authentication");

      if (authenticationCookie != undefined) {
        let mobile = JSON.parse(authenticationCookie).mobile;

        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/user/getUser/${mobile}`
          )
          .then((res) => {
            if (res.status == 200) {
              setCurrentAdmin(res.data.user);
              setCookie("authentication", JSON.stringify(res.data.user));
            } else {
              deleteCookie("authentication");
            }
          })
          .catch((err) => {
            console.log(err);
            deleteCookie("authentication");
          });
      }
    }
  }, []);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
