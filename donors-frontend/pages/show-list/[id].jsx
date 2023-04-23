import Admin from "@/Layout/Admin";
import { AdminContext } from "@/context/Admin.context";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const ID = () => {
  const [donor, setDonor] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { currentAdmin } = useContext(AdminContext);
  console.log(currentAdmin);
  const getData = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/getARecipt/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setDonor(res.data.recipt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentAdmin) {
      getData();
    }
  }, [currentAdmin]);

  const deleteData = async () => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Deleted");
        router.push("/show-list");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Not Deleted");
      });
  };

  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-5">
        {donor && (
          <>
            <div>
              <p>Recipt No : {donor.recipt_no}</p>
              <p>Recipt Date : {donor.recipt_date}</p>
              <p>Donors Name : {donor.Donors_Name}</p>
              <p>Donors Address : {donor.Donors_Address}</p>
              <p>Donors Money : {donor.Donors_Money.$numberDecimal}</p>
              <p>Mobile No : {donor.mobile}</p>
              <p>Refer : {donor.refer}</p>
            </div>
            <div className="flex md:flex-row sm:flex-col md:space-x-5 sm:space-x-0  md:space-y-0 sm:space-y-5">
              <button
                onClick={() => router.push(`/edit/${id}`)}
                className="btn-md w-full mt-5"
              >
                <AiOutlineEdit
                  size={20}
                  className="h-4 w-4 opacity-50 absolute mr-auto"
                />
                Edit
              </button>
              <button
                onClick={() => deleteData()}
                className="btn-md-delete w-full mt-5 bg-red-400"
              >
                <AiOutlineDelete
                  size={20}
                  className="h-4 w-4 opacity-50 absolute mr-auto"
                />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

ID.layout = Admin;
export default ID;
