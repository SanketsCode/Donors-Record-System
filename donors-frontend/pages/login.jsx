import { AdminContext } from "@/context/Admin.context";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import Router from "next/router";

const Login = () => {
  const { currentAdmin, setCurrentAdmin } = useContext(AdminContext);

  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  useState(() => {
    if (currentAdmin != null) {
      Router.push("/home");
    }
  }, [currentAdmin]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputFields({ ...inputFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/admin/login`,
        inputFields
      )
      .then((res) => {
        if (res.status == 200) {
          setCurrentAdmin(res.data.adminData);
          setCookie("authentication", JSON.stringify(res.data.adminData));
          Router.push("/home");
          toast.success("Logged In");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Credentials");
      });
  };

  return (
    <React.Fragment>
      <section className="h-[100vh] bg-blue-50 w-full flex justify-center items-center">
        <figure className="rounded-lg shadow-lg bg-white tablet:w-1/4">
          <form
            onSubmit={handleSubmit}
            className="px-10 py-14 text-center space-y-5"
          >
            <div>
              <h1 className="font-semibold text-2xl mb-2">Admin Details</h1>
              <p className="text-xs text-slate-600 mb-6">
                Basic Mangement of Recipts
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                value={inputFields.email}
                onChange={(event) => handleInputChange(event)}
                name="email"
                className="input-md"
                placeholder="email"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="input-label">
                Password
              </label>
              <input
                type="password"
                value={inputFields.password}
                onChange={(event) => handleInputChange(event)}
                name="password"
                className="input-md"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button type="submit" className="btn-md w-full">
                <AiOutlineLock
                  size={20}
                  className="h-4 w-4 opacity-50 absolute mr-auto"
                />
                Log In
              </button>
            </div>
          </form>
        </figure>
      </section>
    </React.Fragment>
  );
};

export default Login;
