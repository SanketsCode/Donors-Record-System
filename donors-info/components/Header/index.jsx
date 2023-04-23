import Link from "next/link";
import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { deleteCookie } from "cookies-next";

const Header = () => {
  const handleLogout = () => {
    if (confirm("Are you shure to Log out?")) {
      deleteCookie("authentication");
      window.location = "/";
    }
  };
  return (
    <React.Fragment>
      <header className="bg-white shadow-lg relative z-50">
        <nav className="tablet:py-5 tablet:px-0 sm:p-4 border-b border-b-slate-300">
          <div className="tablet:container flex items-center justify-between mx-auto">
            <Link href={"/"}>
              <p className="md:text-xl sm:text-sm">User Recipt</p>
            </Link>

            <div className="flex">
              <button onClick={() => handleLogout()} className="dashboard-tab">
                <RiLogoutBoxRLine size={20} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
