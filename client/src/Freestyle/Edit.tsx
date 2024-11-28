import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
interface StockListing {
  id: number;
  symbol: string;
  company_name: string;
  current_price: number;
  total_supply: number;
}
function Edit() {
  const { id } = useParams();
  const [data, setData] = useState<StockListing | null>(null);
  useEffect(() => {
    axios
      .get(`/api/get_listing/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      });
  }, [id]);
  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

  function handleSubmit(e: React.FormEvent) {
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
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="company_name">companyname</label>
            <input
              type="text"
              name="name"
              value={data.company_name}
              required
              onChange={(e) =>
                setData({ ...data, company_name: e.target.value })
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="currentprice">currentprice</label>
            <input
              type="number"
              name="currentprice"
              value={data.current_price}
              required
              onChange={(e) =>
                setData({ ...data, current_price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="total_supply">total_supply</label>
            <input
              type="number"
              name="total_supply"
              value={data.total_supply}
              required
              onChange={(e) =>
                setData({
                  ...data,
                  total_supply: parseFloat(e.target.value),
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
