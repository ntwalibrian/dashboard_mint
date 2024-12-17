import React, { useEffect, useState } from "react";
import { Card, Divider } from "antd";
import axios from "axios";

interface StockWatchlistItem {
  id: number;
  symbol: string;
  companyName: string;
  price: number;
  change: number;
}
type StockListing = {
  id: number;
  symbol: string;
  company_name: string;
  current_price: number;
  total_supply: number;
  logo: string;
};

const StockWatchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<StockWatchlistItem[]>([
    {
      id: 1,
      symbol: "BOK",
      companyName: "BK Group",
      price: 150.25,
      change: 2.5,
    },
    {
      id: 2,
      symbol: "MTN",
      companyName: "MTN Rwanda ltd",
      price: 120.75,
      change: -1.2,
    },
  ]);
  useEffect(() => {
    axios.get("/api/get_listing")
    .then((res) => {
      // console.log(res.data);
      const stocks: StockListing[] = res.data.rows;
      const updatedWatchlist = stocks.map((listing) => ({
        id: listing.id,
        symbol: listing.symbol,
        companyName: listing.company_name,
        price: listing.current_price,
        change: 0.0,
      }));
      setWatchlist(updatedWatchlist);
    })
    .catch((err) => {
      console.log("errror occcured" , err)
    })
  });

  return (
    <Card
      style={{
        width: 270,
        // height: 300,
        background: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div className="text-lg font-bold mb-4">My Watchlist</div>
      <Divider style={{ margin: "5px 0" }} />
      {watchlist.map((stock) => (
        <div key={stock.id} className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-2">
            <div>
              <div className="font-semibold">{stock.symbol}</div>
              <div className="text-xs text-gray-500">{stock.companyName}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{stock.price}RFW</div>
            <div
              className={`text-sm ${
                stock.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default StockWatchlist;
