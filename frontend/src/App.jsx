import { useState, useEffect } from "react";
import axios from "axios";
import LoginPage from "./LoginPage";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [task, setTask] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [quote, setQuote] = useState({ text: "asd", author: "asd" });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchTasks();
      fetchQuote();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/todos",
        {
          text: task,
          dueTime: dueTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask("");
      setDueTime("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (selectedTask && selectedTask._id === id) {
        setSelectedTask(null);
      }
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const fetchQuote = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/quotes/random");
      setQuote(res.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const handleLoginSuccess = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleTaskClick = (t) => {
    setSelectedTask(t);
  };

  return (
    <>
      <div className="everything-container">
        <div className="tasks-container">
          <div className="sidebar-container">
            <div className="brandName-container">
              <p className="brandName">TASKER</p>
            </div>
            <div className="listOfTasks">
              <ul>
                {tasks.map((t) => (
                  <li
                    key={t._id}
                    onClick={() => handleTaskClick(t)}
                    className={
                      selectedTask && selectedTask._id === t._id ? "active" : ""
                    }
                  >
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="quote">
              <h1>
                "{quote.text}" - {quote.author}
              </h1>
            </div>
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="taskInterface">
            <div className="tasksDetails">
              {selectedTask ? (
                <div className="task-detail-content">
                  <div className="detail-item">
                    <span className="detail-label">Task:</span>
                    <p className="detail-value">{selectedTask.text}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Note:</span>
                    <p className="detail-value">{selectedTask.dueTime}</p>
                  </div>
                  <button
                    className="deleteTaskButton"
                    onClick={() => deleteTask(selectedTask._id)}
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="no-task-selected"></div>
              )}
            </div>
            <div className="taskCreation">
              {popupActive && (
                <div className="popup">
                  <input
                    placeholder="Task Name.."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <input
                    placeholder="Note.."
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                  />
                  <button
                    className="confirmAddTask"
                    onClick={() => {
                      addTask();
                      setPopupActive(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
              <button
                className="addButton"
                onClick={() => {
                  setPopupActive((p) => !p);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
