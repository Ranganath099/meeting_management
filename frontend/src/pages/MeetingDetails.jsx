import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

function MeetingDetails() {
  const { id } = useParams();

  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    const loadMeeting = async () => {
      try {
        const response =
          await api.get(`/meetings/${id}`);

        setMeeting(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMeeting();
  }, [id]);

  const joinMeeting = async () => {
    try {
      const response =
        await api.post(
          `/meetings/join/${meeting.meetingId}`
        );

      setMeeting(response.data.meeting);

      window.open(
        `http://localhost:5173${meeting.meetingLink}`,
        "_blank"
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to join meeting"
      );
    }
  };

  if (!meeting) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <main className="container">

        <div className="details-card">

          <h1>{meeting.title}</h1>

          <p>
            {meeting.description}
          </p>

          <hr />

          <p>
            <strong>Start:</strong>{" "}
            {new Date(
              meeting.startTime
            ).toLocaleString()}
          </p>

          <p>
            <strong>End:</strong>{" "}
            {new Date(
              meeting.endTime
            ).toLocaleString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {meeting.status}
          </p>

          <p>
            <strong>Meeting ID:</strong>{" "}
            {meeting.meetingId}
          </p>

          <button onClick={joinMeeting}>
            Join Meeting
          </button>

        </div>

      </main>
    </>
  );
}

export default MeetingDetails;