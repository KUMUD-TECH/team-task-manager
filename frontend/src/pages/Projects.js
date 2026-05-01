import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Projects() {

    const role = localStorage.getItem("role");
const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {

    try {

      const res =
        await API.get("/projects");

      setProjects(res.data);

    } catch {

      alert("Error loading projects");

    }

  };

  const createProject = async () => {

    try {

      await API.post(
        "/projects",
        {
          name,
          description
        }
      );

      alert("Project created");

      setName("");
      setDescription("");

      fetchProjects();

    } catch {

      alert("Error creating project");

    }

  };

  return (

  <div>

    <Navbar />

    <div style={{ padding: "20px" }}>

      <h2>Projects</h2>

      {role === "Admin" && (
        <>
          <h3>Create Project</h3>

          <input
            placeholder="Project Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <br /><br />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <br /><br />

          <button onClick={createProject}>
            Create Project
          </button>

          <hr />
        </>
      )}

      <h3>Project List</h3>

      {projects.map((p) => (

        <div key={p.id}>

          <strong>{p.name}</strong>

          <p>{p.description}</p>

          <button
            onClick={() =>
              navigate(`/projects/${p.id}/tasks`)
            }
          >
            View Tasks
          </button>

          <hr />

        </div>

      ))}

    </div>

  </div>

);
}

export default Projects;