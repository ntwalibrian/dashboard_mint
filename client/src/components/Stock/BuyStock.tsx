import { useState } from "react";
import { Stocks } from "../../lib/definitions";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyStock = ({
  stock,
  onCancel,
}: {
  stock: Stocks;
  onCancel: () => void;
}) => {
  const navigate = useNavigate()
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useUser();
  const [load, setLoad] = useState<{
    user_id: number;
    stock_id: number;
    quantity: number;
    limit_price: number;
  }>({
    user_id: user.id,
    stock_id: stock.id,
    quantity: Number(amount),
    limit_price: stock.current_price,
  });
  async function handelBuy(e: React.FormEvent) {
    console.log("buy clicked");
    console.log(load);
    e.preventDefault();
    setLoad({
      user_id: user.id,
      stock_id: stock.id,
      quantity: amount,
      limit_price: stock.current_price,
    });
    try {
      const response = await axios.post(
        "http://localhost:8080/post_direct_buy",
        load
      );
      setSuccess(response.data.success);
      if(response.data.success){
        setTimeout(() => {
            navigate(`/dashboard`)
        }, 1500);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
      setSuccess("");
      setAmount(0);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Buy {stock.symbol}</h2>
        <form onSubmit={handelBuy}>
          <input
            type="text"
            value={`${stock.current_price}RWF`}
            readOnly
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (Number(value) > stock.total_supply) {
                setError(
                  `Don't exceed the available supply of ${stock.total_supply}.`
                );
                setSuccess("");
              } else {
                setAmount(Number(value));
                setLoad((prev) => ({
                  ...prev,
                  quantity: Number(value),
                }));
                setError("");
              }
            }}
            placeholder="Enter amount"
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full mb-4"
          >
            Buy
          </button>
        </form>
        {error && (
          <div className="alert error text-sm text-red-500 mb-4">{error}</div>
        )}
        {success && (
          <div className="alert success text-sm text-green-500 mb-4">
            {success}
          </div>
        )}
        <button
          className="bg-gray-500 text-white p-2 rounded w-full"
          onClick={onCancel}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BuyStock;
