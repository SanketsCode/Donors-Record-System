import Admin from "@/Layout/Admin";
import AdminCard from "@/components/HomeSection/AdminCard";
import BasicCard from "@/components/HomeSection/BasicCard";
import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsBank, BsCardChecklist } from "react-icons/bs";
import { FcMoneyTransfer, FcTodoList } from "react-icons/fc";

const Home = () => {
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-5">
        <AdminCard />
        <BasicCard
          color={"from-[#72F9F3] via-[#72C6F9] to-[#72C6F9]"}
          title={"Add Recipt"}
          icon={<AiOutlineUserAdd size={30} />}
          link="/create-recipt"
        />
        <BasicCard
          color={"from-[#F9C472] via-[#F58D37] to-[#F98F41]"}
          title={"List of Donors"}
          icon={<BsCardChecklist size={30} />}
          link="/show-list"
        />
        <BasicCard
          color={"from-[#C1F5A1] via-[#9EF569] to-[#81FC36]"}
          title={"Expenses"}
          icon={<FcMoneyTransfer size={30} />}
          link="/expense"
        />
        <BasicCard
          color={"from-[#95FAD9] via-[#75F8CC] to-[#4FF9C0]"}
          title={"Bank Interest"}
          icon={<BsBank size={30} />}
          link="/bank-statement"
        />
        <BasicCard
          color={"from-[#EA97FB] via-[#E372F9] to-[#DF5BF9]"}
          title={"All Information"}
          icon={<FcTodoList size={30} />}
          link="/all-transactions"
        />
      </div>
    </React.Fragment>
  );
};

Home.layout = Admin;

export default Home;
