
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import useListings from "@/hooks/useListings";
import useDeleteListing from "@/hooks/useDeleteListing";

function Home() {
  const { listings, error, fetchListings } = useListings();
  const {
    deleted,
    error: deleteError,
    handleDelete,
    resetDeleted,
  } = useDeleteListing();

  useEffect(() => {
    if (deleted) {
      resetDeleted();
      fetchListings();
    }
  }, [deleted, fetchListings, resetDeleted]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (deleteError) {
    return <div>Error: {deleteError}</div>;
  }
  return (
    <>
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
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Symbol",
              dataIndex: "symbol",
              key: "symbol",
            },
            {
              title: "Name",
              dataIndex: "company_name",
              key: "company_name",
            },
            {
              title: "Price",
              dataIndex: "current_price",
              key: "current_price",
            },
            {
              title: "Amount",
              dataIndex: "total_supply",
              key: "total_supply",
            },
            {
              title: "Actions",
              key: "actions",
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
          dataSource={listings}
          rowKey="id"
        />
      </div>
    </>
  );
}
export default Home;
