import Admin from "@/Layout/Admin";
import TransactionCard from "@/components/TransactionCard";
import { AdminContext } from "@/context/Admin.context";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AllTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [recipt_rs, setrecipt_rs] = useState(0);
  const [expense_rs, setexpense_rs] = useState(0);
  const [bank_rs, setbank_rs] = useState(0);
  const { currentAdmin } = useContext(AdminContext);
  const [limit, setLimit] = useState(2);

  const getData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/getAllInfo`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
      })
      .then((res) => {
        setbank_rs(res.data.bank_rs);
        setAllTransactions(res.data.allTransactions.reverse());
        setrecipt_rs(res.data.recipt_rs);
        setexpense_rs(res.data.expense_rs);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Not Fetched");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <div className="shadow bg-white rounded-md p-5 space-y-3">
          <div className="w-full">
            <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">
              All Information
            </p>
            <hr />
          </div>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            All Recipt Money - {recipt_rs}Rs
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            Expense Money - {expense_rs}Rs
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            Bank Interest - {bank_rs}Rs
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            All Total Gain Amount - {recipt_rs + bank_rs}Rs
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            Remaining Amount - {recipt_rs + bank_rs - expense_rs}Rs
          </p>
        </div>
        <div>
          {allTransactions.length ? (
            allTransactions.slice(0, limit).map((data, i) => {
              return (
                <TransactionCard
                  key={i}
                  date={data.date}
                  money={data.money}
                  name={data.name}
                  status={data.status}
                />
              );
            })
          ) : (
            <p>No Transations Yet!</p>
          )}
          {limit < allTransactions.length ? (
            <button
              onClick={() => setLimit(limit + 2)}
              className="btn-md w-full mt-5"
            >
              View More
            </button>
          ) : (
            <button onClick={() => setLimit(2)} className="btn-md w-full mt-5">
              View Less
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

AllTransactions.layout = Admin;

export default AllTransactions;
