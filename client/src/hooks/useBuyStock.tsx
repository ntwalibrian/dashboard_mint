import axios from "axios";
import { useState } from "react";

interface BuyStockValues {
  user_id: string;
  stock_id: number;
  quantity: number;
  limit_price: number;
}

const useBuyStock = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buyStock = async (values: BuyStockValues) => {
    setLoading(true);
    try {
      const responce = await axios.post("/api/place_buy_order", values);
      setLoading(false);
      return responce.data;
    } catch (err) {
      setLoading(false);
      console.error("Error occurred:", err);
      setError("Failed to fetch data");
      throw err;
    }
  };

  return {buyStock, error, loading}
};

export default useBuyStock;
