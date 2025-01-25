import React from 'react';

interface BalanceProps {
  balance?: number;
  onFundWallet?: () => void;
}

const Balance = ({ balance = 0, onFundWallet }: BalanceProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-indigo-100 p-3 rounded-xl">
          <svg 
            className="w-7 h-7 text-indigo-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 3h18v18H3zM3 9h18M15 15h2"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Wallet Balance
          </h2>
          <p className="text-gray-500 text-sm">
            Available funds for minting
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="text-5xl font-bold text-gray-900 tracking-tight">
          ${balance.toFixed(2)}
        </div>
        <div className="text-gray-500 text-sm mt-1">
          USD Balance
        </div>
      </div>

      <button 
        onClick={onFundWallet}
        className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl
                 font-semibold text-lg hover:bg-indigo-700 transition-colors
                 duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Fund My Mint Wallet
      </button>
    </div>
  );
};

export default Balance;
