import { useEffect, useState } from "react";

import api from "../services/api";
import Navbar from "../components/Navbar";

function MeetingHistory() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response =
          await api.get("/meetings/history");

        setMeetings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadHistory();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">

        <h1>Meeting History</h1>

        {meetings.length === 0 ? (
          <p>
            No completed meetings.
          </p>
        ) : (
          <div className="meeting-grid">

            {meetings.map((meeting) => (
              <div
                className="meeting-card"
                key={meeting._id}
              >

                <h3>
                  {meeting.title}
                </h3>

                <p>
                  {meeting.description}
                </p>

                <p>
                  Ended:{" "}
                  {new Date(
                    meeting.endTime
                  ).toLocaleString()}
                </p>

                <p>
                  Participants:{" "}
                  {meeting.participants.length}
                </p>

                <p>
                  Status:{" "}
                  {meeting.status}
                </p>

              </div>
            ))}

          </div>
        )}

      </main>
    </>
  );
}

export default MeetingHistory;