import { useUser } from "../context/UserContext";
import { Bell, Menu, Search } from "lucide-react";
import { Avatar } from "flowbite-react";

function Navbar() {
  const { user } = useUser();
  const firstLetter = user.username.charAt(0)?.toUpperCase();

  return (
    <div className="h-full w-full px-4 py-3 flex flex-row bg-white/80 backdrop-blur-sm md:bg-primary items-center">
      <div className="md:hidden text-xl font-bold text-primary">Mint</div>

      <div className="flex items-center max-w-md mx-auto md:mx-0">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-[200px] md:w-[300px]"
          />
        </div>
      </div>

      <div className="hidden md:flex grow"></div>

      <div className="flex items-center space-x-4 md:space-x-6 ml-auto">
        <Bell
          className="text-black md:text-white cursor-pointer hover:text-gray-300 transition-colors"
          size={20}
        />
        <div className="hidden md:block h-6 w-px bg-gray-300/30"></div>

        <div className="flex items-center space-x-2 md:space-x-3">
          <Avatar placeholderInitials={firstLetter} rounded size="sm" />
          <span className="hidden md:block text-white">{user.username}</span>
        </div>

        <div className="block md:hidden">
          <Menu size={24} className="text-black cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
