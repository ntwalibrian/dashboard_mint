import { useUser } from "../../context/UserContext";

function Marketplace() {
  const { user } = useUser();
  return (
    <div>
      sidebar
      {user?.id && <p>user id is {user.id}</p>}
      {user?.username && <p>user name is {user.username}</p>}
    </div>
  );
}

export default Marketplace;
