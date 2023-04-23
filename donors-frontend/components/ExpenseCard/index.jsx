import { BsTrash } from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";

const ExpenseCard = ({ title, money, date, DeleteExpense, id }) => {
  return (
    <div className="flex shadow rounded-md p-2 items-center space-x-2 relative">
      <BsTrash
        onClick={() => DeleteExpense(id)}
        size={20}
        className="absolute top-2 right-2 cursor-pointer"
      />
      <FcMoneyTransfer size={50} />
      <div>
        <p className="md:text-md sm:text-sm">
          <b>Reason - </b>
          {title}
        </p>
        <p className="md:text-md sm:text-sm">
          <b>Money - </b>
          {money}
        </p>
        <p className="text-[12px]">{date}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
