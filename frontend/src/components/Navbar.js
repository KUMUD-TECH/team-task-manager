import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");

  };

  return (

    <div
      style={{
        background: "#333",
        padding: "10px",
        color: "white"
      }}
    >

      <Link
        to="/dashboard"
        style={{
          marginRight: "15px",
          color: "white"
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/projects"
        style={{
          marginRight: "15px",
          color: "white"
        }}
      >
        Projects
      </Link>

      <button
        onClick={logout}
        style={{
          float: "right"
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;