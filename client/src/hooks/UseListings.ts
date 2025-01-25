import { useState } from "react";
import { Stocks } from "../lib/definitions";
import axios, { CanceledError } from "axios";
import { useCallback, useEffect } from "react";

function UseListings() {
  const [stocks, setStocks] = useState<Stocks[]>([]);
  const [error, setError] = useState("");
  const fetchStocks = useCallback(async () => {
    const Controller = new AbortController();
    try {
      const response = await axios.get("http://localhost:8080/get_listings");
      setStocks(response.data.rows);
    } catch (err: any) {
      if (err instanceof CanceledError) return;
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
    return () => Controller.abort();
  }, []);
  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return { stocks, error, fetchStocks };
}

export default UseListings;
