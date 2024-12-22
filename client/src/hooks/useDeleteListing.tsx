import axios from "axios";
import { useCallback, useState } from "react";

const useDeleteListing = () => {
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = useCallback((id: number) => {
    axios
      .delete(`/api/delete_listing/${id}`)
      .then((res) => {
        setDeleted(true);
        console.log(res);
      })
      .catch((err) => {
        console.log("Error occurred: " + err);
        setError(err.message);
      });
  }, []);
  return {
    deleted,
    error,
    handleDelete,
    resetDeleted: () => setDeleted(false),
  };
};

export default useDeleteListing;
