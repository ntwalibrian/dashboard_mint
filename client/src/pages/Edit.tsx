import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
interface StockListing {
  id: number;
  symbol: string;
  name: string;
  price: number;
  in_stock_amount: number;
}
function Edit() {
  const { id } = useParams();
  const [data, setData] = useState<StockListing | null>(null);
  useEffect(() => {
    axios
      .get(`/api/get_listing/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data[0]);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      });
  }, [id]);
  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

  function handleSubmit(e : React.FormEvent) {
    e.preventDefault();
    axios
      .post(`/api/update_listing/${id}`, data)
      .then((res) => {
        console.log("worked");
      })
      .catch((err) => {
        console.log("error :" + err);
      });
  }

  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container-fluid vw-100 vh-100 bg-primary">
        <h1>{data.symbol}</h1>
        <Link to="/" className="btn btn-success">
          Back
        </Link>
        <form onSubmit={ handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="symbol">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={data.symbol}
              required
              onChange={(e) => setData({ ...data, symbol: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              required
              onChange={(e) =>
                setData({ ...data, price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              value={data.in_stock_amount}
              required
              onChange={(e) =>
                setData({
                  ...data,
                  in_stock_amount: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="form-group my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;
