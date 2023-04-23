import Admin from "@/Layout/Admin";
import { AdminContext } from "@/context/Admin.context";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const CreateRecipt = () => {
  const { currentAdmin } = useContext(AdminContext);
  const [recipt_no, setRecipt_no] = useState("");
  const [recipt_date, setRecipt_date] = useState(new Date());
  const [Donors_name, setDonors_name] = useState("");
  const [Donors_address, setDonors_address] = useState("");
  const [mobile, setMobile] = useState("");
  const [Donors_money, setDonorsMoney] = useState("");
  const [refer, setRefer] = useState("");
  const [loading, setLoading] = useState(false);

  const SaveData = async () => {
    setLoading(true);
    if (recipt_no === "") {
      toast.error("Fill the Recipt No");
      setLoading(false);
      return;
    }

    if (recipt_date === "") {
      toast.error("Fill the Recipt date");
      setLoading(false);
      return;
    }

    if (Donors_name === "") {
      toast.error("Fill the Donors Name");
      setLoading(false);
      return;
    }
    if (Donors_money === "") {
      toast.error("Fill the Donors Money");
      setLoading(false);
      return;
    }
    if (Donors_address === "") {
      toast.error("Fill the Donors Address");
      setLoading(false);
      return;
    }

    if (mobile === "") {
      toast.error("Fill the Mobile No");
      setLoading(false);
      return;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/create`,
        {
          recipt_no,
          recipt_date: moment(recipt_date).format("dddd MMMM Do YYYY, h:mm A"),
          Donors_Name: Donors_name,
          Donors_Address: Donors_address,
          mobile,
          Donors_Money: Donors_money,
          refer,
        },
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Saved");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Not Saved");
      });

    setDonorsMoney("");
    setDonors_address("");
    setDonors_name("");
    setMobile("");
    setRecipt_no("");
    setRefer("");

    setLoading(false);
  };

  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-5">
        <div className="shadow bg-white rounded-md p-5">
          <div>
            <p className="text-center md:text-3xl sm:text-xl font-medium mb-5">
              New Donor Recipt
            </p>
            <hr />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="recipt_no" className="input-label">
              Recipt No
            </label>
            <input
              type="text"
              value={recipt_no}
              onChange={(event) => setRecipt_no(event.target.value)}
              name="recipt_no"
              className="input-md"
              placeholder="Recipt No"
              required
            />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="recipt_no" className="input-label">
              Recipt Date
            </label>
            <DatePicker
              selected={recipt_date}
              className="input-md w-full"
              onChange={(date) => setRecipt_date(date)}
            />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="donors_name" className="input-label">
              Donors Name
            </label>
            <input
              type="text"
              value={Donors_name}
              onChange={(event) => setDonors_name(event.target.value)}
              name="donors_name"
              className="input-md"
              placeholder="Donors Name"
              required
            />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="donors_address" className="input-label">
              Donors Address
            </label>
            <input
              type="text"
              value={Donors_address}
              onChange={(event) => setDonors_address(event.target.value)}
              name="donors_address"
              className="input-md"
              placeholder="Donors Address"
              required
            />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="donors_mobile" className="input-label">
              Donors Phone No
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              name="donors_mobile"
              className="input-md"
              placeholder="Donors Mobile"
              required
            />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="donors_money" className="input-label">
              Donors Money
            </label>
            <input
              type="text"
              value={Donors_money}
              onChange={(event) => setDonorsMoney(event.target.value)}
              name="donors_money"
              className="input-md"
              placeholder="Donors Money"
              required
            />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="refer" className="input-label">
              Refer
            </label>
            <input
              type="text"
              value={refer}
              onChange={(event) => setRefer(event.target.value)}
              name="donors_refer"
              className="input-md"
              placeholder="Donors refer"
              required
            />
          </div>
          <button
            disabled={loading}
            onClick={SaveData}
            className="btn-md w-full mt-5"
          >
            <AiOutlineLock
              size={20}
              className="h-4 w-4 opacity-50 absolute mr-auto"
            />
            Save
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

CreateRecipt.layout = Admin;

export default CreateRecipt;
