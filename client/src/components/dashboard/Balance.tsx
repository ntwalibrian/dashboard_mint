import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "../../context/UserContext";
import UseBalance from "../../hooks/UseBalance";

function BalanceCard() {
  const [balanceVisible, setBalanceVisible] = useState<boolean>(false);
  
  const {user} = useUser()
  const {balance} = UseBalance(user.id)

  const toggleBalanceVisibility = (): void => {
    setBalanceVisible(!balanceVisible);
  };

  const handleFundWallet = (): void => {
    
    alert("Funding your Mint wallet!");
  };

  return (
    <div className="max-w-sm mx-0 bg-black text-white shadow-lg p-4 rounded-2xl">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Mint Wallet</h2>
          <button
            onClick={toggleBalanceVisibility}
            className="text-white focus:outline-none"
          >
            {balanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="text-center mb-6">
          <p className="text-sm font-light">Available Balance</p>
          <h3 className="text-3xl font-bold">
            {balanceVisible ? `RFW${balance}` : "****"}
          </h3>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleFundWallet}
            className="bg-white text-black px-4 py-2 rounded-lg shadow-md focus:outline-none"
          >
            Fund Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
