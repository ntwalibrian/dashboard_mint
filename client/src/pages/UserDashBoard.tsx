import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../component.tsx/Sidebar";
import TopNavbar from "../component.tsx/Navbar";
import './Mustaaaaard.css'
import StockCard from "../component.tsx/StockCard";
import StockWatchlist from "../component.tsx/StockWishlist";
interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
}
function DashBoard() {
  const { id } = useParams();
  const [data, setData] = useState<Portfolio[]>([]);
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    axios
      .get(`/api/get_portfolio/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.rows);
        console.log("data array bellow");
        console.log(data);
        console.log(res.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      });
  }, [id]);
  useEffect(() => {
    setTimeout(() => {
      console.log("after wait");
      console.log(data);
      console.log(data[0].quantity);
    }, 7000);
  });

  return (
   
    <div className="flex h-screen">
      
      <Sidebar />
      <div className="flex flex-col flex-grow">
        
        <TopNavbar />
        
        <div className="flex-grow bg-[#f6f7f9] p-6">
         <h5 className="font-bold">My Portfolio</h5>
         <div
      className="bg-white rounded-lg"
      style={{
        width: '890.02px',
        height: '156.57px',
      }}
    >
      <StockCard/>
      <div className="mt-4">
      <StockWatchlist/></div>
    </div>
          
        </div>
      </div>
    </div>
 
  
  );
}

export default DashBoard;
