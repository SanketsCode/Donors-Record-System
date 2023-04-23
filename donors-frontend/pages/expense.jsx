import Admin from "@/Layout/Admin";
import ExpenseCard from "@/components/ExpenseCard";
import { AdminContext } from "@/context/Admin.context";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";

const Expense = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [money, setMoney] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimit] = useState(2);
  const { currentAdmin } = useContext(AdminContext);

  const getData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/expenses`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
      })
      .then((res) => {
        setExpenses(res.data.expenses.reverse());
      })
      .catch((err) => {
        console.log(err);
        toast.error("Not Fetched");
      });
  };

  const SaveData = async () => {
    setLoading(true);
    if (title === "") {
      toast.error("No Title");
      setLoading(false);
      return;
    }

    if (description === "") {
      toast.error("No Description");
      setLoading(false);
      return;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/expense`,
        {
          title,
          description,
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
        console.log(err);
        toast.error("Not Saved");
      });

    setLoading(false);
    setTitle("");
    setMoney(0);
    setDescription("");
  };

  const DeleteExpense = async (id) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/recipt/expense/${id}`,
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <div className="shadow bg-white rounded-md p-5">
          <div>
            <p className="text-center md:text-3xl sm:text-xl font-medium mb-5">
              Expenses
            </p>
            <hr />
          </div>
          <div className="flex flex-col  mt-5">
            <label htmlFor="title" className="input-label">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              name="title"
              className="input-md"
              placeholder="title"
              required
            />
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
            <label htmlFor="title" className="input-label">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              name="title"
              className="input-md"
              placeholder="description"
              required
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
          {expenses.length ? (
            expenses.slice(0, limit).map((expense, i) => {
              return (
                <ExpenseCard
                  key={i}
                  title={expense.title}
                  date={expense.date}
                  money={expense.money.$numberDecimal}
                  DeleteExpense={DeleteExpense}
                  id={expense._id}
                />
              );
            })
          ) : (
            <p>No Transations Yet!</p>
          )}
          {limit < expenses.length ? (
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

Expense.layout = Admin;

export default Expense;
