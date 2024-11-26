import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    symbol: "",
    name: "",
    price: "",
    amount: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    axios
      .post("/api/add_listing", values)
      .then((res) => {
        console.log(res);
        setValues({
          symbol: "",
          name: "",
          price: "",
          amount: "",
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container vh-100 vw-100 bg-primary">
      <div className="row">
        <h3>Add Stock</h3>
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success">
            Home
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="symbol">Symbol</label>
            <input
              type="text"
              name="symbol"
              placeholder="BOK"
              required
              value={values.symbol}
              onChange={(e) => setValues({ ...values, symbol: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Bank of Kigali"
              required
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="Price">Price</label>
            <input
              type="number"
              name="price"
              required
              value={values.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="ammount">Amount</label>
            <input
              type="number"
              name="amount"
              value={values.amount}
              required
              onChange={(e) => setValues({ ...values, amount: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
