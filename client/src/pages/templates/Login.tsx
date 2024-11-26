import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [succesful, setSuccesful] = useState(false);
  const [failure, setFailure] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(values);
    axios
      .post("/api/verify_user", values)
      .then((res) => {
        console.log("yes");
        console.log(res);
        setMessage(res.data.success);
        setSuccesful(true);
        setTimeout(() => {
          setSuccesful(false);
        }, 2000);
        setValues({
          username: "",
          password: "",
        });
        localStorage.setItem("authToken", res.data.token);
        console.log(res.data.token)
        navigate(`/dashboard/${res.data.user.id}`)
      })
      .catch((err) => {
        console.log("fuck");
        console.log(err);
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
        }, 2000);
        setValues({
          username: "",
          password: "",
        });
      });
  }

  return (
    <div className="container vh-100 vw-100 bg-primary">
      {succesful && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      {failure && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      <div className="">
        <h3>log in into Mint</h3>
        <div className="d-flex justify-content-end">
          <Link to="/signup" className="btn btn-success">
            Sign up
          </Link>
        </div>
        <br />
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success">
            Home
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="username">user name</label>
            <input
              type="text"
              name="username"
              placeholder="ntwalirian"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">password</label>
            <input
              type="text"
              name="password"
              placeholder="pasword123"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group my-3">
            <button type="submit" className="btn btn-success">
              ENTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
