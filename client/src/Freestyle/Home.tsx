import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

interface StockListing {
  id: number;
  symbol: string;
  company_name: string;
  current_price: number;
  total_supply: number;
  logo: string;
}

function Home() {
  const [deleted, setDeleted] = useState(true);
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
    if (deleted) {
      setDeleted(false);
      axios.get("/api/get_listing")
      .then((res) => {
        console.log(res.data)
        setData(res.data.rows)
        console.log(data)
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      })
    }
  }, [deleted])
  
  // useEffect(() => {
  //   axios
  //     .get("/api/get_listing")
  //     .then((res) => {
  //       console.log(res)
  //       setData(res.data.rows);
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching listings:", err);
  //     });
  // });

  function handleDelete(id: number) {
    axios
      .delete(`/api/delete_listing/${id}`)
      .then((res) => {
        setDeleted(true);
        console.log(res);
      })
      .catch((err) => {
        console.log("error occured" + err);
      });
  }

  return (
    <div className="container-fluid bg-primary ">
      <h3>Stocks</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add listing
        </Link>
      </div>
      <Table 
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
          },
          {
            title: 'Name',
            dataIndex: 'company_name',
            key: 'company_name',
          },
          {
            title: 'Price',
            dataIndex: 'current_price',
            key: 'current_price',
          },
          {
            title: 'Amount',
            dataIndex: 'total_supply',
            key: 'total_supply',
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
              <>
                <button
                  className="btn mx-2 btn-danger"
                  onClick={() => handleDelete(record.id)}
                >
                  Delete
                </button>
                <Link
                  to={`/edit/${record.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
              </>
            ),
          },
        ]}
        dataSource={data}
        rowKey="id"
      />
    </div>
  );
}
export default Home;