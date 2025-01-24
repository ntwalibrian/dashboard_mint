import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useUser } from "../context/UserContext";
import { LogOut } from "lucide-react";

function Sidebar() {
  const { logout } = useUser();
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full px-2 py-3 flex flex-col">
      <div
        className="w-full rounded-md bg-primary h-28 cursor-pointer mb-5 flex justify-center items-center "
        onClick={() => navigate("/dashboard")}
      >
        logo"?"
      </div>
      <div className="w-full rounded-md  flex grow flex-col justify-between space-y-3 ">
        <NavLinks />
        <div className="flex grow"></div>
        <Link
          to={"#"}
          className="flex h-10  hover:bg-red-300 items-center justify-start rounded-md p-3 font-medium hover:text-red-500"
          onClick={() => logout()}
        >
          <LogOut size={20} className="mr-2"/>
          Log Out
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
