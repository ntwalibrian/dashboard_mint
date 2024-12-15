import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Mustaaaaard.css";
import StockCard from "../component.tsx/StockCard";
import StockWatchlist from "../component.tsx/StockWishlist";
import PortfolioChart from "@/component.tsx/Portfolio_chart";
interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
  logo: string;
}
function HomeComponent() {
  const { id } = useParams();
  const [data, setData] = useState<Portfolio[]>([]);
  const [value, setValue] = useState<number>(0);
  

  useEffect(() => {
    axios
      .get(`/api/get_portfolio/${id}`)
      .then((res) => {
        setData(res.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      });
  }, [id]);

  useEffect(() => {
    const calculateTotalValue = (portfolio: Portfolio[]): number => {
      return portfolio.reduce(
        (total, stock) => total + stock.quantity * stock.current_price,
        0
      );
    };
    
    const totalValue = calculateTotalValue(data);
    setValue(totalValue);
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      
      <div>
        <h5 className="text-xl font-bold mb-4">My Portfolio</h5>
        <div className="bg-white rounded-lg shadow-lg border-gray-200 hover:shadow-xl transition-shadow w-full ">
          <StockCard portfolio={data} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-6 w-full max-w-full">
          <div className="h-[500px] col-span-2">
            <PortfolioChart/>
          </div>
          <div>
            <StockWatchlist />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent;
