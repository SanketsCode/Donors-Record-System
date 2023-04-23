import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

const TransactionCard = ({ money, date, name, status }) => {
  return (
    <div className="flex flex-row items-center shadow rounded-sm p-3 space-x-5">
      {status === "Income" ? (
        <GiReceiveMoney size={50} className="text-green-500" />
      ) : (
        <GiPayMoney size={50} className="text-red-500" />
      )}

      <div className="flex flex-col">
        <p className="font-medium">{name}</p>
        <p
          className={`text-md ${
            status === "Income" ? "text-green-300" : "text-red-500"
          }`}
        >
          {status === "Income" ? "+" : "-"} {money.$numberDecimal} ₹
        </p>
        <p className="text-[12px]">{date}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
