import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface StockListing {
  id: number;
  symbol: string;
  company_name: string;
  current_price: number;
  total_supply: number;
}

function Home() {
  // const [deleted, setDeleted] = useState(true);
  const [data, setData] = useState<StockListing[]>([]);
  // useEffect(() => {
  //   if (deleted) {
  //     setDeleted(false);
  //     axios
  //       .get("/api/get_listing")
  //       .then((res) => {
  //         setData(res.data);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching listings:", err);
  //       });
  //   }
  // }, [deleted]);
  useEffect(() => {
    axios
      .get("/api/get_listing")
      .then((res) => {
        console.log(res)
        setData(res.data.rows);
        console.log(data)
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      });
  });

  // function handleDelete(id: number) {
  //   axios
  //     .delete(`/api/delete_listing/${id}`)
  //     .then((res) => {
  //       // setDeleted(true);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log("error occured" + err);
  //     });
  // }

  return (
    <div className="container-fluid bg-primary ">
      <h3>Stocks</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add listing
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Ammount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.symbol}</td>
              <td>{item.company_name}</td>
              <td>{item.current_price}</td>
              <td>{item.total_supply}</td>
              <td>
                {/* <button
                  className="btn mx-2 btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button> */}
                <Link
                  to={`/edit/${item.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
