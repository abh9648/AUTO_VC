import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
const API_URL = "https://auto-vc-yxwu.onrender.com";

const Dashboard = () => {
  const navigate = useNavigate();

  const openRepo = (repoId) => {
    navigate(`/repo/${repoId}`);
  };

  // NEW (carousel state)
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //  NEW (delete function)
  const handleDelete = async (repoId) => {
    const confirmDelete = window.confirm("Delete this repository?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/repo/delete/${repoId}`, {
        method: "DELETE",
      });

      setRepositories((prev) => prev.filter((r) => r._id !== repoId));
      setSuggestedRepositories((prev) => prev.filter((r) => r._id !== repoId));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  //  NEW (carousel controls)
  const nextSlide = () => {
    if (currentIndex + itemsPerPage < suggestedRepositories.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/repo/user/${userId}`
        );
        const data = await response.json();
        setRepositories(
          Array.isArray(data.repositories) ? data.repositories : []
        );
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
        setRepositories([]);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`${API_URL}/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error while fetching suggested repositories: ", err);
        setSuggestedRepositories([]);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />

      <section className="dashboard-container">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <h3>Your Menu</h3>

          <div className="sidebar-item">🏠 Home</div>
          <div className="sidebar-item">📦 Repositories</div>
          <div className="sidebar-item">⭐ Starred</div>
          <div className="sidebar-item">👤 Profile</div>

          <button
            className="create-btn"
            onClick={() => navigate("/create")}
          >
            + New Repository
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">

          <div className="main-header">
            <h2>Your Repositories</h2>

            <input
              type="text"
              value={searchQuery}
              placeholder="Search repositories..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {searchResults.length > 0 ? (
            searchResults.map((repo) => (
              <div
                className="repo-card"
                key={repo._id}
                onClick={() => openRepo(repo._id)} // whole card clickable
                style={{ cursor: "pointer" }}
              >

                <div className="repo-info">
                  <h3>{repo.name}</h3>
                  <p>{repo.description || "No description"}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="repo-actions">

                  {/* EDIT */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); //  prevent navigation
                      navigate(`/edit-repo/${repo._id}`);
                    }}
                    className="repo-btn"
                  >
                    ✏️
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); //  prevent navigation
                      handleDelete(repo._id);
                    }}
                    className="repo-btn delete"
                  >
                    🗑
                  </button>

                </div>
              </div>
            ))
          ) : (
            <p className="empty-text">No repositories found</p>
          )}
        </main>

        {/* 🔹 RIGHT PANEL */}
        <aside className="right-panel">

          {/* UPDATED SUGGESTED WITH ARROWS */}
          <div className="suggested-header">
            <h3>Suggested</h3>

            {suggestedRepositories.length > itemsPerPage && (
              <div className="arrow-controls">
                <button onClick={prevSlide}>◀</button>
                <button onClick={nextSlide}>▶</button>
              </div>
            )}
          </div>

          <div className="suggested-container">
            {suggestedRepositories
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((repo) => (
                <div
                  key={repo._id}
                  className="suggested-card"
                  onClick={() => openRepo(repo._id)}
                >
                  <strong>{repo.name}</strong>
                  <p>{repo.description}</p>
                </div>
              ))}
          </div>

          {/* EVENTS */}
          <h3 style={{ marginTop: "20px" }}>Events</h3>

          <div className="event-card">
            <p>Tech Conference</p>
            <span>Dec 15</span>
          </div>

          <div className="event-card">
            <p>Developer Meetup</p>
            <span>Dec 25</span>
          </div>

        </aside>
      </section>
    </>
  );
};

export default Dashboard;