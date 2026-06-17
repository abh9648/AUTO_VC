import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./repoDetails.css";

const RepoDetails = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchRepo = async () => {
      const res = await fetch(`http://localhost:3002/repo/${id}`);
      const data = await res.json();
      setRepo(data);
    };

    const fetchFiles = async () => {
      const res = await fetch(`http://localhost:3002/repo/files/${id}`);
      const data = await res.json();
      setFiles(data);
    };

    fetchRepo();
    fetchFiles();
  }, [id]);

  if (!repo) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="repo-container">

        {/* HEADER */}
        <div className="repo-header">
          <h2>{repo.owner?.username} / {repo.name}</h2>
          <p>{repo.description}</p>
        </div>

        {/* ACTION BAR */}
        <div className="repo-actions-bar">
          <button>⭐ Star</button>
          <button>🍴 Fork</button>
          <button>👁 Watch</button>
        </div>

        {/* FILES */}
        <div className="repo-files">
          <h3>Files & Commits</h3>

          {files.length > 0 ? (
            files.map((commit) => (
              <div key={commit.commitId} className="commit-card">
                <strong>{commit.commitId}</strong>

                {commit.files.map((file, i) => (
                  <div key={i} className="file-item">
                    📄 {file}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No commits yet</p>
          )}
        </div>

      </div>
    </>
  );
};

export default RepoDetails;