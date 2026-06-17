import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./editRepo.css";
const API_URL = "https://auto-vc-yxwu.onrender.com";

const EditRepo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [repo, setRepo] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      const res = await fetch(`${API_URL}/repo/${id}`);
      const data = await res.json();
      setRepo(data);
      setDescription(data.description || "");
    };

    fetchRepo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetch(`${API_URL}/repo/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          content: "Updated via UI",
        }),
      });

      alert("Repository updated!");
      navigate(`/repo/${id}`);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!repo) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <h2>Edit Repository</h2>

        <div className="edit-card">
          <label>Repository Name</label>
          <input value={repo.name} disabled />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleUpdate} className="save-btn">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditRepo;