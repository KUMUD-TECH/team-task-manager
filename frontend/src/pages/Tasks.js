import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Tasks() {

  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const res =
        await API.get(
          `/projects/${projectId}/tasks`
        );

      setTasks(res.data);

    } catch {

      alert("Error loading tasks");

    }

  };

  const createTask = async () => {

    try {

      await API.post(
        "/tasks",
        {
          title,
          description,
          due_date: dueDate,
          project_id: projectId,
          assigned_to: assignedTo
        }
      );

      alert("Task created");

      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");

      fetchTasks();

    } catch {

      alert("Error creating task");

    }

  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${id}/status`,
        {
          status
        }
      );

      fetchTasks();

    } catch {

      alert("Error updating status");

    }

  };

  return (

    <div>

      <Navbar />

      <div style={{ padding: "20px" }}>

        <h2>Tasks</h2>

        <h3>Create Task</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
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

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Assign User ID"
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value)
          }
        />

        <br /><br />

        <button onClick={createTask}>
          Create Task
        </button>

        <hr />

        <h3>Task List</h3>

        {tasks.map((t) => (

          <div key={t.id}>

            <strong>{t.title}</strong>

            <p>{t.description}</p>

            <p>Status: {t.status}</p>

            <button
              onClick={() =>
                updateStatus(
                  t.id,
                  "Todo"
                )
              }
            >
              Todo
            </button>

            <button
              onClick={() =>
                updateStatus(
                  t.id,
                  "In Progress"
                )
              }
            >
              In Progress
            </button>

            <button
              onClick={() =>
                updateStatus(
                  t.id,
                  "Done"
                )
              }
            >
              Done
            </button>

            <hr />

          </div>

        ))}

      </div>

    </div>

  );

}

export default Tasks;