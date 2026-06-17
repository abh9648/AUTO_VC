import React, { useState } from "react";
import axios from "axios";
import "./createRepo.css";
import Navbar from "../Navbar";

const CreateRepo = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        visibility: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const owner = localStorage.getItem("userId");

        try {
            const response = await axios.post(
                "http://localhost:3002/repo/create",
                {
                    ...formData,
                    owner,
                }
            );

            alert("Repository Created ");
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert("Error creating repo ");
        }
    };

    return (
        <>
            <Navbar />
            <div className="create-repo-container">
                <div className="create-repo-card">
                    <h2>Create Repository</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Repository Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter repository name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                placeholder="Write a short description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group checkbox">
                            <input
                                type="checkbox"
                                name="visibility"
                                checked={formData.visibility}
                                onChange={handleChange}
                            />
                            <span>Public Repository</span>
                        </div>

                        <button type="submit" className="create-btn">
                            Create Repository
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateRepo;