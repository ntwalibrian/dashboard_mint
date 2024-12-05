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
interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
  logo: string;
}
function DashBoard() {
  const { id } = useParams();
  const [data, setData] = useState<Portfolio[]>([]);
  const location = useLocation();
  const user = location.state?.user;
  const [activeItem, setActiveItem] = useState("home");
  const [value, setValue] = useState<number>();

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
    setTimeout(() => {
      const calculateTotalValue = (portfolio: Portfolio[]): number => {
        return portfolio.reduce((total, stock) => total + (stock.quantity * stock.price), 0);
      };
      const totalValue = calculateTotalValue(data);
      setValue(totalValue);
    }, 8000);
  }, [data]);

  // Add a function to handle sidebar navigation
  const handleNavigation = (item: string) => {
    setActiveItem(item);
  };

  const renderComponent = () => {
    switch (activeItem) {
      case "home":
      case "dashboard":
        return <HomeComponent />;
      case "stocks":
        return <StocksComponent />;
      case "community":
        return <CommunityComponent />;
      case "settings":
        return <SettingsComponent />;
      case "contact":
        return <ContactComponent />;
      default:
        return <HomeComponent />; // Default to home instead of null
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar totalPortfolio={value} onNavigate={handleNavigation} />
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
