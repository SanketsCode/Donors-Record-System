import axios from "axios";
import { hasCookie, getCookie, deleteCookie, setCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
  currentAdmin: null,
  setCurrentAdmin: () => null,
});

export const AdminProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const value = { currentAdmin, setCurrentAdmin };

  useEffect(() => {
    if (hasCookie("authentication")) {
      try {
        JSON.parse(getCookie("authentication"));
      } catch (error) {
        console.log(error);
        deleteCookie("authentication");
        window.location = "/";
      }

      axios
        .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/admin/getUser`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(getCookie("authentication")).accessToken
            }`,
          },
        })
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
  }, []);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
