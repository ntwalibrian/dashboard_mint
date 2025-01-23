import { useUser } from "../../context/UserContext";

function Marketplace() {
  const { user } = useUser();
  return (
    <div>
      sidebar
      {user.id}
      {user.username}
    </div>
  );
}

export default Marketplace;
