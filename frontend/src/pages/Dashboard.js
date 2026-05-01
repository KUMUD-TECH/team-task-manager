import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Dashboard() {

    const navigate = useNavigate();
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const res =
        await API.get("/dashboard");

      setStats(res.data);

    } catch {

      alert("Error loading dashboard");

    }

  };

  return (

  <div >

    <Navbar />

   

    <div style={{ padding: "20px" }} >

     

      <div >

        <h1 >
          Dashboard
        </h1>

        <button
          onClick={() => navigate("/projects")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Projects →
        </button>

      </div>


      <div >

        

        <div >

          <h3 >
            Total Tasks
          </h3>

          <p >
            {stats.totalTasks || 0}
          </p>

        </div>

      

        <div >

          <h3 >
            Completed
          </h3>

          <p >
            {stats.completedTasks || 0}
          </p>

        </div>

       

        <div >

          <h3 >
            Pending
          </h3>

          <p >
            {stats.pendingTasks || 0}
          </p>

        </div>

        

        <div >

          <h3 >
            Overdue
          </h3>

          <p >
            {stats.overdueTasks || 0}
          </p>

        </div>

      </div>

    </div>

  </div>

);
}

export default Dashboard;