import { useState, useEffect } from "react";
import {withRouter, Redirect} from "react-router-dom";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";

const UpdateNote = ({match}) => {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
    const [redirect, setRedirect] = useState(false);

    const [note, setNote] = useState({
      title: "",
      content: "",
      date: ""
  });
  
  useEffect(() => {
    const preload = (noteId) => {
        let requiredNote = notes.find((note, index) => parseInt(noteId) === index)
        setNote({title: requiredNote.title, content: requiredNote.content, date: requiredNote.date})
      }
    preload(match.params.noteId)
  },[match.params.noteId, notes])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const updateNote = (newNote) => {
    setNotes(prevNotes => {
      prevNotes.splice(match.params.noteId, 1, newNote)
      localStorage.setItem("notes", JSON.stringify([...prevNotes]))
      return [...prevNotes];
    });   
  }

  const submitNote = (event) => {
   updateNote(note)
   setRedirect(!redirect)
   setNote({
      title: "",
      content: "",
      date: ""
    });
    event.preventDefault();
  }

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
          rows= "3"
          
        />
        <CustomButton onClick={submitNote}>SUBMIT</CustomButton>
        {redirect ? <Redirect to="/" />: ""}
      </form>
    </div>
  );
};

export default withRouter(UpdateNote);