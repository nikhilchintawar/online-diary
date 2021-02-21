import axios from "axios";
import { useState, useEffect } from "react";
import { withRouter, Redirect, useParams } from "react-router-dom";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";

const UpdateNote = () => {
  const [redirect, setRedirect] = useState(false);
  const { noteId } = useParams();

  const [oldNote, setOldNote] = useState(null);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const { title, description } = note;

  const updateNote = () => {
    axios
      .put(oldNote.url, {
        title,
        description,
      })
      .then((response) => setRedirect(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/notes/${noteId}`, {
        title,
        description,
      })
      .then((response) => {
        setOldNote(response.data);
        setNote({
          title: response.data?.title,
          description: response.data?.description,
        });
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    updateNote();
    setNote({
      title: "",
      description: "",
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
        <textarea
          name="description"
          onChange={handleChange}
          value={note.description}
          placeholder={note.description}
          rows="3"
        />
        <CustomButton onClick={submitNote}>SUBMIT</CustomButton>
        {redirect ? <Redirect push to="/" /> : ""}
      </form>
    </div>
  );
};

export default withRouter(UpdateNote);
