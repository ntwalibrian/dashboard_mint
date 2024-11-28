import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate()
  const [succesful, setSuccesful] = useState(false);
  const [failure, setFailure] = useState(false);

  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    pin: "",
    email: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    axios
      .post("/api/add_user", values)
      .then((res) => {
        console.log(res);
        setSuccesful(true)
        setTimeout(() => {
          setSuccesful(false);
        }, 3000);
        setValues({
          name: "",
          username: "",
          password: "",
          pin: "",
          email: "",
        });
        setTimeout(() =>{
          navigate('/login')
        }, 3768)
      })
      .catch((err) => {
        console.log(err);
        setFailure(true)
        setTimeout(() => {
          setFailure(false);
        }, 3000);
        setValues({
          name: "",
          username: "",
          password: "",
          pin: "",
          email: "",
        });
      });
  }

  return (
    <div className="container vh-100 vw-100 bg-primary">
      {succesful && (
        <div className="alert alert-success" role="alert">
          User Creation succesful , plz log in
        </div>
      )}
      {failure && (
        <div className="alert alert-danger" role="alert">
          User Creation failed , plz try again
        </div>
      )}

      <div className="">
        <h3>Sign UP into Mint</h3>
        <h3>make account</h3>
        <br />
        <div className="d-flex justify-content-end">
          <Link to="/login" className="btn btn-success">
            Login
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="ntwali brian diouf"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="username">User_name</label>
            <input
              type="text"
              name="username"
              placeholder="ntwali123"
              required
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              placeholder="ntwali123lgt"
              required
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="pin">recovery Pin</label>
            <input
              type="number"
              name="pin"
              placeholder="234564"
              required
              value={values.pin}
              onChange={(e) => setValues({ ...values, pin: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="ntwali123@gmail.com"
              required
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
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

export default SignUp;
