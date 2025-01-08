import { CanceledError } from "axios";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useBalance = (user_id: number) => {
  const [balance, setBalance] = useState();
  const [error, setError] = useState("");

  const fetchBalance = useCallback(() => {
    const Controller = new AbortController();
    axios
      .get(`/api/get_balance/${user_id}`)
      .then((res) => {
        setBalance(res.data.rows[0].balance);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => Controller.abort();
  }, []);
  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return {balance, error,  fetchBalance};
};

export default useBalance;
