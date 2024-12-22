import axios, { CanceledError } from "axios";
import { useEffect, useState, useCallback } from "react";

interface StockListing {
  id: number;
  symbol: string;
  company_name: string;
  current_price: number;
  total_supply: number;
  logo: string;
}

const useListings = () => {
  const [listings, setListings] = useState<StockListing[]>([]);
  const [error, setError] = useState("");
  const fetchListings = useCallback(() => {
    const Controller = new AbortController();
    axios
      .get("/api/get_listing", { signal: Controller.signal })
      .then((res) => {
        setListings(res.data.rows);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err);
      });
    return () => Controller.abort();
  }, []);
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, error, fetchListings };
};

export default useListings;
