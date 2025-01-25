import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useUser } from "../context/UserContext";
import { LogOut, Eye, EyeOff } from "lucide-react";
import UsePortfolio from "../hooks/UsePortfolio";

function Sidebar() {
  const { logout } = useUser();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const { user } = useUser();
  const { totalValue } = UsePortfolio(user.id);
  return (
    <div className="h-screen w-full px-2 py-3 flex flex-col">
      <div
        className="text-primary font-bold cursor-pointer mb-5 flex justify-center items-center "
        onClick={() => navigate("/dashboard")}
      >
        Mint
      </div>
      <div
        className="w-full rounded-lg mb-5 cursor-pointer overflow-hidden relative group bg-black"
        onClick={() => navigate("/dashboard")}
      >
        <div className="relative h-20 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400 font-medium">Portfolio</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBalance(!showBalance);
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>

          <div className="flex items-baseline space-x-1">
            <p className="text-xl font-bold text-white">
              {showBalance ? `${totalValue}` : "****"}
            </p>
            <p className="text-sm text-gray-400">RWF</p>
          </div>
        </div>
      </div>
      <div className="w-full rounded-md  flex grow flex-col justify-between space-y-3 ">
        <NavLinks />
        <div className="flex grow"></div>
        <Link
          to={"#"}
          className="flex h-10  hover:bg-red-300 items-center justify-start rounded-md p-3 font-medium hover:text-red-500"
          onClick={() => logout()}
        >
          <LogOut size={20} className="mr-2" />
          Log Out
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
