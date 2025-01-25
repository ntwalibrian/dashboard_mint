import { useUser } from "../context/UserContext";
import { Bell, Menu } from "lucide-react";
import { Avatar } from "flowbite-react";

function Navbar() {
  const { user } = useUser();
  const firstLetter = user.username.charAt(0)?.toUpperCase()
  console.log(firstLetter)
  return (
    <div className="h-full w-full px-2 py-3 flex flex-row bg-blue-900 items-center">
        {/* here goes the rest of the navstuff */}
        {/* this thing grow and fills space only nibiguter ubwoba */}
      <div className="flex grow"></div>
      {/* this it that stuff of user name do it a component  */}
      <div className="text-white cursor-pointer flex flex-row gap-3 items-center">
        <Bell className="text-black md:text-white" />
        <p className="hidden md:flex">{user.username}</p>
        <Avatar placeholderInitials={firstLetter} className="flex md:hidden" rounded />
      </div>

      <div className="mx-2 cursor-pointer md:hidden text-black">
        <Menu size={30} />
      </div>
    </div>
  );
}

export default Navbar;
