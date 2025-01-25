import axios, { CanceledError } from "axios";
import { useCallback, useEffect, useState } from "react";

interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
  logo: string;
  holding_id: string;
}

function UsePortfolio(user_id: number) {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [error, setError] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  const fetchPortfolio = useCallback(async () => {
    const Controller = new AbortController();
    try {
      const response = await axios.post("http://localhost:8080/get_portfolio", {
        user_id,
      });
      setPortfolio(response.data.rows);
      const fetchedPortfolio = response.data.rows;
      const newTotalValue = fetchedPortfolio.reduce(
        (acc: number, stock: Portfolio) => {
          return acc + stock.quantity * stock.current_price;
        },
        0
      );
      setTotalValue(newTotalValue);
    } catch (err: any) {
      if (err instanceof CanceledError) return;
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
    return () => Controller.abort();
  }, [user_id]);

  useEffect(() => {
    fetchPortfolio();
  }, [user_id, fetchPortfolio]);
  return { portfolio, error, fetchPortfolio, totalValue };
}

export default UsePortfolio;
