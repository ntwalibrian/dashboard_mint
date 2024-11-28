import { Bell, ChevronDown } from "lucide-react";

type Props = {
  username: string;
};
const getLetterIcon = (str: string) => {
  if (!str) {
    return null;
  }
  for (let char of str) {
    if (/[a-zA-Z]/.test(char)) {
      return char.toUpperCase();
    }
  }
  return null;
};

function TopNavbar({ username }: Props) {
  return (
    <div
      className="bg-white flex justify-end items-center px-6"
      style={{ height: "83.12px" }}
    >
      <button className="relative mr-6">
        <Bell className="w-6 h-6 text-gray-600" />

        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
          3
        </span>
      </button>

      <div className="h-8 w-[1px] bg-gray-300 mx-6"></div>

      <div className="flex items-center space-x-3 cursor-pointer">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-bold">
            {getLetterIcon(username)}
          </span>
        </div>

        <span className="text-gray-800 font-bold text-sm">{username}</span>

        <ChevronDown className="w-4 h-4 text-gray-600" />
      </div>
    </div>
  );
}

export default TopNavbar;
