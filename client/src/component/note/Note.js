import "./Note.css";
import { Link } from "react-router-dom";
import CustomButton from "./../custom-button/CustomButton";

const Note = ({ id, title, content, date, deleteNote }) => {
  return (
    <div className="note">
      <header>
        <h1>{title}</h1>
        <span>
          {new Date(date).toLocaleString(navigator.language, {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}
        </span>
      </header>
      <p>{content}</p>

      <div className="note-buttons">
        <CustomButton onClick={() => deleteNote(id)}>Delete</CustomButton>
        <Link to={`/update/${id}`}>
          <CustomButton>edit</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default Note;
