import { AdminContext } from "@/context/Admin.context";
import { useContext } from "react";

const AdminCard = () => {
  const { currentAdmin } = useContext(AdminContext);

  return (
    <div className="shadow sm:w-full border border-gray-400 p-5 flex flex-col">
      <div>
        <p className="text-center md:text-3xl sm:text-xl font-medium mb-5">
          Admin Info
        </p>
        <hr />
      </div>

      <div className="mt-5">
        {currentAdmin && (
          <>
            <p className="font-medium md:text-xl sm:text-lg">
              Name : {currentAdmin.name}
            </p>
            <p className="font-medium md:text-xl sm:text-lg">
              Email : {currentAdmin.email}
            </p>
            <p className="font-medium md:text-xl sm:text-lg">
              Role : {currentAdmin.role}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
