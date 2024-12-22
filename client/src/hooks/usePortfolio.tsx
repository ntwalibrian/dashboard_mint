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
}

const usePortfolio = (user_id: number) => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [error, setError] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const fetchPortfolio = useCallback(() => {
    const Controller = new AbortController();
    axios
      .get(`/api/get_portfolio/${user_id}`, { signal: Controller.signal })
      .then((res) => {
        setPortfolio(res.data.rows);
        const fetchedPortfolio = res.data.rows;
        const newTotalValue = fetchedPortfolio.reduce((acc : number, stock : Portfolio) => {
          return acc + stock.quantity * stock.current_price;
        }, 0);
        setTotalValue(newTotalValue)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err);
      });
    return () => Controller.abort();
  }, []);

  

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return { portfolio, error, fetchPortfolio, totalValue };
};

export default usePortfolio;
