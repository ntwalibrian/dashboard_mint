import { useState } from "react";
import axios, { CanceledError } from "axios";
import { useCallback, useEffect } from "react";

function UseBalance(user_id: number) {
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState("");
  const fetchBalance = useCallback(async () => {
    const Controller = new AbortController();
    try {
      const response = await axios.post("http://localhost:8080/get_balance", {
        user_id,
      });
      setBalance(response.data.balance);
    } catch (err: any) {
      if (err instanceof CanceledError) return;
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
    return () => Controller.abort();
  }, [user_id]);

  useEffect(() => {
    fetchBalance()
  }, [user_id,fetchBalance])

  return {error,balance,fetchBalance}
}

export default UseBalance;
