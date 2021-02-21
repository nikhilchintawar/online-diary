import "./CreateNote.css";
import { useState } from "react";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";
import axios from "axios";

const CreateNote = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const submitNote = (event) => {
    axios
      .post(`http://localhost:8000/api/notes/`, {
        title: note.title,
        description: note.description,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));
    setNote({
      title: "",
      description: "",
    });
    event.preventDefault();
  };

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div className="create-note-form">
      <form className="create-note">
        {isExpanded && (
          <div className="form-input">
            <FormInput
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
            {/* <FormInput
            type="date"
            name="date"
            onChange={handleChange}
            value={note.date}
            placeholder={note.date}
            /> */}
          </div>
        )}

        <textarea
          name="description"
          onClick={expand}
          onChange={handleChange}
          value={note.description}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && <CustomButton onClick={submitNote} children="ADD" />}
      </form>
    </div>
  );
};

export default CreateNote;
