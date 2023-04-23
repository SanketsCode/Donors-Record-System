import Admin from "@/Layout/Admin";
import { AdminContext } from "@/context/Admin.context";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineRightCircle } from "react-icons/ai";

const ShowList = () => {
  const { currentAdmin } = useContext(AdminContext);
  const [ListData, setListData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/getAll`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setListData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-5">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-t border-slate-600">
              <th className="w-[30%]">Recipt No</th>
              <th className="w-[60%]">Donors Name</th>
              <th className="w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {ListData.length > 0 &&
              ListData.map((list, i) => (
                <tr
                  key={i}
                  className="border-b border-t border-slate-600 text-center"
                >
                  <td className="w-[30%]">{list.recipt_no}</td>
                  <td className="w-[60%]">{list.Donors_Name}</td>
                  <td className="w-[10%]">
                    <AiOutlineRightCircle
                      onClick={() => router.push(`/show-list/${list._id}`)}
                      className="mx-auto cursor-pointer hover:text-blue-300"
                      size={20}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

ShowList.layout = Admin;

export default ShowList;
