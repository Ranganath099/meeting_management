import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import MeetingCard from "../components/MeetingCard";

function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMeetings = async () => {
    try {
      const response = await api.get(
        "/meetings"
      );

      setMeetings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const deleteMeeting = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this meeting?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/meetings/${id}`
      );

      setMeetings(
        meetings.filter(
          (meeting) => meeting._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">

        <div className="page-header">
          <h1>My Meetings</h1>

          <Link
            className="primary-button"
            to="/create-meeting"
          >
            + Create Meeting
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : meetings.length === 0 ? (
          <p>No meetings found.</p>
        ) : (
          <div className="meeting-grid">

            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting._id}
                meeting={meeting}
                onDelete={deleteMeeting}
              />
            ))}

          </div>
        )}

      </main>
    </>
  );
}

export default Dashboard;