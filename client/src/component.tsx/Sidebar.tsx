"use client"

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart2, Layers, Users, Settings, Phone, ChevronUp, ChevronDown, Wallet, ShoppingBag } from 'lucide-react';

interface SidebarProps {
  totalPortfolio?: number;
  balance?: number;
  onNavigate: (item: string) => void;
}

function Sidebar({totalPortfolio = 0, balance = 0, onNavigate} : SidebarProps) {
  const [activeItem, setActiveItem] = useState("home");
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const menuItems = [
    { name: "home", icon: Home, label: "Home" },
    { name: "dashboard", icon: Layers, label: "Dashboard" },
    { name: "stocks", icon: BarChart2, label: "Stocks" },
    { name: "marketplace", icon: ShoppingBag, label: "Marketplace" },
    { name: "community", icon: Users, label: "Community" },
    { name: "settings", icon: Settings, label: "Settings" },
    { name: "contact", icon: Phone, label: "Contact Us" },
  ];

  const cards = [
    {
      id: 'portfolio',
      title: 'Portfolio',
      value: `${totalPortfolio} RFW`,
      icon: <Wallet className="w-5 h-5" />,
      change: '+18.69%',
      changeIcon: <ChevronUp className="w-4 h-4" />,
    },
    {
      id: 'balance',
      title: 'My Balance',
      value: `${balance} RFW`,
    },
  ];

  return (
    <div className="bg-white flex flex-col h-full w-[277px] rounded-none text-[14px]">
      <div className="flex justify-center py-6">
        <div className="text-black font-bold text-xl">"logo area"</div>
      </div>

      <div className="mx-4 mb-6">
        <motion.div
          className="bg-black text-white rounded-lg overflow-hidden cursor-pointer"
          animate={{ height: isWalletOpen ? 'auto' : '60px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={() => setIsWalletOpen(!isWalletOpen)}
        >
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Wallet className="w-6 h-6" />
              <span className="font-semibold text-lg">My Wallet</span>
            </div>
            <motion.div
              animate={{ rotate: isWalletOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
          <AnimatePresence>
            {isWalletOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {cards.map((card) => (
                  <div key={card.id} className="p-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{card.title}</span>
                      {card.icon && <div>{card.icon}</div>}
                    </div>
                    <div className="text-2xl font-bold mb-1">{card.value}</div>
                    {card.change && (
                      <div className="flex items-center text-green-400 text-sm">
                        {card.changeIcon}
                        <span>{card.change}</span>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <nav className="flex-grow overflow-y-auto">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                onNavigate(item.name);
              }}
              className={`
                flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 w-full
                ${
                  activeItem === item.name
                    ? "bg-gray-200 text-black font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }
              `}
            >
              <item.icon
                className="w-5 h-5"
                strokeWidth={activeItem === item.name ? 2 : 1.5}
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

