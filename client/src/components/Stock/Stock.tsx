import React from "react";
import { ArrowDownFromLine } from "lucide-react";
import UseListings from "../../hooks/UseListings";
import { Stocks } from "../../lib/definitions";
import BuyStock from "./BuyStock";

function Card({ stock, onBuy }: { stock: Stocks; onBuy: (stock: Stocks) => void } ) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="h-16 items-center justify-between w-full p-4 flex flex-row bg-white text-black shadow-md hover:bg-purple-400 ">
        <p>{stock.symbol}</p>
        <p>
          <p>Price: </p>
          <p> {stock.current_price} RWF</p>
        </p>
        <p>
          {" "}
          <p> Qty: </p> <p>{stock.total_supply}</p>
        </p>
        <div className="gap-1 flex flex-row items-center">
          <button
            className="p-3 bg-primary mr-2 flex-1"
            onClick={() => {
              handleExpandClick();
            }}
          >
            <ArrowDownFromLine size={20} />
          </button>
          <button className="p-3 bg-primary flex-1" onClick={() => onBuy(stock)}>Buy</button>
        </div>
      </div>
      <div
        className={`" border-t-2 border-green-300 w-full p-6 bg-white shadow-md text-sm md:text-base flex-row justify-between gap-2 text-left text-black " ${
          expanded ? "flex" : "hidden"
        }`}
      >
        <div>
          <p>company name : {stock.company_name}</p>
          <p>ceo : {stock.ceo}</p>
          <p>market cap : 1000000000RWF</p>
          <p>head quarter : {stock.headquarters} </p>
        </div>
        <div>
          <p>founded : {stock.founded}</p>
          <p>industry : {stock.industry}</p>
        </div>
      </div>
    </div>
  );
}

export function Stock() {
  const { stocks } = UseListings();
  const [selectedStock, setSelectedStock] = React.useState<Stocks | null>(null);
  const handleBuyClick = (stock: Stocks) => {
    setSelectedStock(stock);
  };
  const handleCancel = () => {
    setSelectedStock(null);
  };

  return (
    <div className="w-full flex flex-col items-start ">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Available Shares ('in-Stock')
      </h2>
      <div className="w-full flex flex-col items-start gap-2">
        {stocks.map((item, index) => {
          return <Card key={index} stock={item} onBuy={handleBuyClick} />;
        })}
      </div>
      {selectedStock && <BuyStock stock={selectedStock} onCancel={handleCancel}/>}
    </div>
  );
}
