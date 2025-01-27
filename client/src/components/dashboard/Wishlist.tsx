import React from 'react';
import { Heart, Bell, Trash2 } from 'lucide-react';
import { useUser } from "../../context/UserContext";
import UseListings from "../../hooks/UseListings";
import { Stocks } from '../../lib/definitions'; 

function WishlistCard({ stock, onDelete }: { stock: Stocks; onDelete: (symbol: string) => void }) {
  

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-sky-100 transition-colors">
      <div className="flex items-center space-x-3">
        <img
          src={stock.logo }
          alt={stock.symbol}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h3 className="text-sm font-semibold">{stock.symbol}</h3>
          <p className="text-xs text-gray-500">{stock.company_name}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium">RWF {stock.current_price}</p>
         
        </div>
        <button 
          onClick={() => onDelete(stock.symbol)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Wishlist() {
  const { user } = useUser();
  const { stocks, error, fetchStocks } = UseListings();

  const handleDelete = (symbol: string) => {
    
    console.log(`Deleting ${symbol} from wishlist`);
  };

  if (error) {
    return (
      <div className="bg-white shadow-lg p-4 rounded-2xl h-[300px] flex items-center justify-center">
        <p className="text-red-500">Error loading watchlist: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl flex flex-col h-[300px] mx-auto">
      <div className="p-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart size={20} className="text-primary" />
            <h2 className="text-xl font-semibold">Watchlist</h2>
          </div>
          <button className="p-2 hover:bg-sky-100 rounded-full transition-colors">
            <Bell size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
        {stocks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No stocks in watchlist</p>
        ) : (
          stocks.map((stock) => (
            <WishlistCard
              key={stock.symbol}
              stock={stock}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      
      <div className="p-4 border-t">
        <button 
          onClick={() => {/* Implement add functionality */}}
          className="w-full bg-gray-50 text-sm text-gray-600 py-2 rounded-lg hover:bg-sky-100 transition-colors"
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
}