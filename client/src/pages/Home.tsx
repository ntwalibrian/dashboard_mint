
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <button
        style={{
          padding: "0.8rem 2rem",
          fontSize: "1.1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onClick={() => navigate("/login")}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Iyi page ntacyo imaze
      </button>
    </div>
  );
}

export default Home;
