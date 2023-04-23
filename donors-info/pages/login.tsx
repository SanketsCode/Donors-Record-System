import React, { useContext, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import { resUser } from "@/Types/AllTypes";
import { AdminContext } from "@/context/user.context";
import { getCookie, setCookie } from "cookies-next";
import Router from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const [inputFields, setInputFields] = useState({
    mobile: "",
  });

  const { currentAdmin, setCurrentAdmin } = useContext(AdminContext);

  if (currentAdmin != null) {
    Router.push("/home");
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/user/login`,
        inputFields
      )
      .then((res) => {
        if (res.status == 200) {
          const user: resUser = res.data.user;
          setCurrentAdmin(user);
          setCookie("authentication", JSON.stringify(res.data.user));
          Router.push("/home");
          toast.success("Logged In");
        }
      })
      .catch((err) => {
        toast.error("Invalid Mobile");
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <section className="h-[100vh] bg-blue-50 w-full flex justify-center items-center">
        <figure className="rounded-lg shadow-lg bg-white tablet:w-1/4">
          <form
            onSubmit={handleFormSubmit}
            className="px-10 py-14 text-center space-y-5"
          >
            <div>
              <h1 className="font-semibold text-2xl mb-2">Check Recipt</h1>
              <p className="text-xs text-slate-600 mb-6">
                Hello User Fill Your Mobile No
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobile" className="input-label">
                Mobile
              </label>
              <input
                type="text"
                value={inputFields.mobile}
                onChange={handleInputChange}
                name="mobile"
                className="input-md"
                placeholder="mobile"
                required
              />
            </div>
            <div>
              <button type="submit" className="btn-md w-full">
                <AiOutlineLock
                  size={20}
                  className="h-4 w-4 opacity-50 absolute mr-auto"
                />
                Sign in
              </button>
            </div>
          </form>
        </figure>
      </section>
    </React.Fragment>
  );
};

export default Login;
