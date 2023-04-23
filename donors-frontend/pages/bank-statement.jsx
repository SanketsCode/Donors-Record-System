import Admin from "@/Layout/Admin";
import { AdminContext } from "@/context/Admin.context";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import BankMoneyCard from "@/components/BankMoneyCard";

const BankStatment = () => {
  const [money, setMoney] = useState(0.0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [bankMoney, setBankMoney] = useState([]);
  const { currentAdmin } = useContext(AdminContext);
  const [limit, setLimit] = useState(2);

  const getData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/bank`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
      })
      .then((res) => {
        setBankMoney(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
        toast.error("Not Fetched");
      });
  };

  const DeleteInterest = async (id) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/bank/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Deleted");
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Not Deleted");
      });
  };

  const SaveData = async () => {
    setLoading(true);

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/bank/create`,
        {
          money,
          date: moment(date).format("dddd MMMM Do YYYY, h:mm A"),
        },
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Saved Successfully");
        getData();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Not Saved");
      });

    setLoading(false);

    setMoney(0);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <div className="shadow bg-white rounded-md p-5">
          <div>
            <p className="text-center md:text-3xl sm:text-xl font-medium mb-5">
              Bank Statement
            </p>
            <hr />
          </div>

          <div className="flex flex-col  mt-5">
            <label htmlFor="recipt_no" className="input-label">
              Date
            </label>
            <DatePicker
              selected={date}
              className="input-md w-full"
              onChange={(date) => setDate(date)}
            />
          </div>

          <div className="flex flex-col  mt-5">
            <label htmlFor="money" className="input-label">
              Money
            </label>
            <input
              type="text"
              value={money}
              onChange={(event) => setMoney(event.target.value)}
              name="money"
              className="input-md"
              placeholder="Money"
              required
            />
          </div>
          <button
            onClick={SaveData}
            disabled={loading}
            className="btn-md w-full mt-5"
          >
            <AiOutlineSave
              size={20}
              className="h-4 w-4 opacity-50 absolute mr-auto"
            />
            Save
          </button>
        </div>
        <div>
          {bankMoney.length ? (
            bankMoney.slice(0, limit).map((expense, i) => {
              console.log(expense);
              return (
                <BankMoneyCard
                  key={i}
                  date={expense.date}
                  money={expense.money.$numberDecimal}
                  DeleteExpense={DeleteInterest}
                  id={expense._id}
                />
              );
            })
          ) : (
            <p>No Transations Yet!</p>
          )}
          {limit < bankMoney.length ? (
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

BankStatment.layout = Admin;

export default BankStatment;
