import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../component.tsx/Sidebar";
import TopNavbar from "../component.tsx/Navbar";
import "./Mustaaaaard.css";
import HomeComponent from "./HomeComponent";
import StocksComponent from "./StocksComponent";
import CommunityComponent from "./CommunityComponent";
import SettingsComponent from "./SettingsComponent";
import ContactComponent from "./ContactComponent";
import { RwandanP2PStockMarketplace } from "./Marketplace";
import usePortfolio from "@/hooks/usePortfolio";
import useBalance from "@/hooks/useBalance";

function DashBoard() {
  const { id } = useParams();
  
  const location = useLocation();
  const user = location.state.user;
  const [activeItem, setActiveItem] = useState("home");
  
  // const [balance, setBalance] = useState()

  const {totalValue, fetchPortfolio} = usePortfolio(user.id)
  const {balance, error, fetchBalance} = useBalance(user.id)
  // useEffect(() => {
  //   axios.get(`/api/get_balance/${id}`)
  //     .then((res) => {
  //       console.log('balance shit')
  //       console.log(res)
  //       setBalance(res.data.rows[0].balance)
        
  //       console.log(res.data.rows[0].balance)
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching listings:", err);
  //     });
    
  // },[id])

  // Add a function to handle sidebar navigation
  const handleNavigation = (item: string) => {
    setActiveItem(item);
  };

  const renderComponent = () => {
    switch (activeItem) {
      case "home":
      case "dashboard":
        return <HomeComponent user_id={user.id} />;
      case "stocks":
        return <StocksComponent uid = {user.id} />;
      case "marketplace":
        return <RwandanP2PStockMarketplace />;
      case "community":
        return <CommunityComponent />;
      case "settings":
        return <SettingsComponent />;
      case "contact":
        return <ContactComponent />;
      default:
        return <HomeComponent user_id={user.id} />; // Default to home instead of null
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar totalPortfolio={totalValue} balance={balance} onNavigate={handleNavigation} />
      <div className="flex flex-col flex-grow">
        <TopNavbar username={user.username} />
        <div className="flex-grow bg-[#f6f7f9] p-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
