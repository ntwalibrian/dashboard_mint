import { useState } from "react";
import { Home, BarChart2, Layers, Users, Settings, Phone } from "lucide-react";
import { ChevronUp, Eye, EyeOff } from "lucide-react"; // Add required icons

interface SidebarProps {
  totalPortfolio?: number;
  onNavigate: (item: string) => void;
}

function Sidebar({totalPortfolio = 0, onNavigate} : SidebarProps) {
  const [activeItem, setActiveItem] = useState("home");
  const [showInvestments, setShowInvestments] = useState(true); // State to toggle visibility

  const menuItems = [
    { name: "home", icon: Home, label: "Home" },
    { name: "dashboard", icon: Layers, label: "Dashboard" },
    { name: "stocks", icon: BarChart2, label: "Stocks" },
    { name: "community", icon: Users, label: "Community" },
    { name: "settings", icon: Settings, label: "Settings" },
    { name: "contact", icon: Phone, label: "Contact Us" },
  ];

  return (
    <div className="bg-white flex flex-col h-full w-[277px] rounded-none text-[14px]  ">
      <div className="flex justify-center py-4">
        <div className=" text-black font-bold">"logo area"</div>
      </div>

      <div
        className="bg-black text-white flex justify-between items-center rounded-lg mx-4 p-4"
        style={{
          height: "72.75px",
        }}
      >
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-sm font-semibold">Investments</div>
            {showInvestments && <div className="text-lg font-bold">{totalPortfolio}RFW</div>}
          </div>
        </div>

        {/* Right Side: Percentage Change */}
        <div className="flex flex-col items-center">
  <div className="flex items-center text-green-500 font-bold text-sm">
    <span className="mr-1">+18.69%</span>
    <ChevronUp className="w-4 h-4" />
  </div>
  <div 
    className="mt-2"
    onClick={() => setShowInvestments((prev) => !prev)}
  >
    <button className="text-gray-400 space-x-2 text-xs">
      {showInvestments ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
    </button>
  </div>
</div>
</div>
      

      <nav className="flex flex-col justify-between flex-grow mt-4 " >
        {/* Top Menu Items */}
        <div className="space-y-2 px-4">
          {menuItems.slice(0, 3).map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                onNavigate(item.name);
              }}
              className={`
                flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 w-full font-bold
                ${
                  activeItem === item.name
                    ? "bg-gray-200 text-black font-bold"
                    : "hover:bg-gray-100 text-black"
                }
              `}
            >
              <item.icon
                className="w-5 h-5"
                strokeWidth={activeItem === item.name ? 2 : 1}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Menu Items */}
        <div className="space-y-2 px-4 mb-4">
          {menuItems.slice(3).map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                onNavigate(item.name);
              }}
              className={`
                flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 w-full font-bold
                ${
                  activeItem === item.name
                    ? "bg-gray-200 text-black"
                    : "hover:bg-gray-100 text-black"
                }
              `}
            >
              <item.icon
                className="w-5 h-5"
                strokeWidth={activeItem === item.name ? 2 : 1}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
