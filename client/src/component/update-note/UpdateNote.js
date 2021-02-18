import axios from "axios";
import { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";

const UpdateNote = ({ match }) => {
  const [redirect, setRedirect] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const preload = (noteId) => {
      axios
        .put(`http://localhost:8000/api/notes/${noteId}`, note)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    };
    preload(match.params.noteId);
  }, [match.params.noteId]);

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
    setRedirect(!redirect);
    setNote({
      title: "",
      content: "",
      date: "",
    });
    event.preventDefault();
  };

  return (
    <div>
      <form className="create-note">
        <FormInput
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder={note.title}
        />
        <FormInput
          type="date"
          name="date"
          onChange={handleChange}
          value={note.date}
        />

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <CustomButton onClick={submitNote}>SUBMIT</CustomButton>
        {redirect ? <Redirect to="/" /> : ""}
      </form>
    </div>
  );
};

export default withRouter(UpdateNote);
