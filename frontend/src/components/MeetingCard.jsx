import { Link } from "react-router-dom";

function MeetingCard({ meeting, onDelete }) {
  return (
    <div className="meeting-card">
      <h3>{meeting.title}</h3>

      <p>
        {meeting.description}
      </p>

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

      <div className="meeting-actions">

        <Link
          to={`/meeting/${meeting._id}`}
        >
          View
        </Link>

        <Link
          to={`/edit-meeting/${meeting._id}`}
        >
          Edit
        </Link>

        <button
          onClick={() =>
            onDelete(meeting._id)
          }
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default MeetingCard;