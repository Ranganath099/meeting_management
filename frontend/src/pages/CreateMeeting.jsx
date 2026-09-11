import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

function CreateMeeting() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/meetings",
        form
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create meeting"
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="form-container">

        <h1>Create Meeting</h1>

        <form onSubmit={handleSubmit}>

          <label>Meeting Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Team Meeting"
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Meeting description"
          />

          <label>Start Time</label>

          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
          />

          <label>End Time</label>

          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Meeting
          </button>

        </form>

      </main>
    </>
  );
}

export default CreateMeeting;