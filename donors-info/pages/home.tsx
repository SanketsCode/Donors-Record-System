import User from "@/layout/User";
import React, { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import axios from "axios";
import ReciptCard from "@/components/ReciptCard";
import { recipt } from "@/Types/AllTypes";

const Home = () => {
  const [allRecipts, setAllRecipts] = useState<[recipt] | []>([]);
  const getData = async () => {
    const authenticationCookie = getCookie("authentication");
    if (authenticationCookie !== undefined) {
      const mobile = JSON.parse(authenticationCookie).mobile;
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/user/getAllRecipts/${mobile}`
        )
        .then((res) => {
          console.log(res);
          setAllRecipts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <p className="font-medium text-center text-lg">Thank You</p>

        <div>
          {allRecipts.length ? (
            allRecipts.map((recipt, i) => (
              <ReciptCard
                key={i}
                mobile={recipt.mobile}
                recipt_no={recipt.recipt_no}
                recipt_date={recipt.recipt_date}
                Donors_Name={recipt.Donors_Name}
                Donors_Address={recipt.Donors_Address}
                Donors_Money={recipt.Donors_Money}
                refer={recipt.refer}
              />
            ))
          ) : (
            <p>No Recipt</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

Home.layout = User;

export default Home;
