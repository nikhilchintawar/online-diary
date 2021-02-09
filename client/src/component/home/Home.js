import axios from "axios";
import "./Home.css";

import CreateNote from "../create-note/CreateNote";
import { useEffect, useState } from "react";
import Note from "../note/Note";
import UpdateNote from "../update-note/UpdateNote";
import Header from "../header/Header";
import SelectOption from "../select-option/SelectOption";

const Home = () => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/notes")
      .then((response) => {
        setNotes(response.data?.results);
        console.log(response);
      })
      .catch((error) => console.log(error.response));
  }, []);

  const [sortType] = useState([
    { value: "NEW", label: "NEWEST FIRST" },
    { value: "OLD", label: "OLDEST FIRST" },
  ]);
  const [value, setValue] = useState("NEW");

  // notes.map((note) => note.date.split("-")[0]);
  const [sortYear] = useState();
  const [yearValue, setYearValue] = useState("Choose Year");

  const [sortMonth] = useState([
    { value: "01", label: "Jan" },
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Apr" },
    { value: "05", label: "May" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Aug" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ]);
  const [monthValue, setMonthValue] = useState("month");

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      localStorage.setItem("notes", JSON.stringify([...prevNotes, newNote]));
      return [...prevNotes, newNote];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => index !== id);
    });
  };

  const updateNote = (id) => {
    notes.map((note, index) => {
      if (id === index) {
        return <UpdateNote id={id} />;
      } else {
        return "note is not available.";
      }
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (value === "NEW") {
      notes.sort((note1, note2) => {
        return note1.date > note2.date ? 1 : -1;
      });
    } else if (value === "OLD") {
      notes.sort((note1, note2) => {
        return note2.date > note1.date ? 1 : -1;
      });
    }
  };

  const handleMonthChange = (event) => {
    setNotes(JSON.parse(localStorage.getItem("notes")) || []);
    setMonthValue(event.target.value);
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.date.split("-")[1] === event.target.value)
    );
  };

  const handleYearChange = (event) => {
    setNotes(JSON.parse(localStorage.getItem("notes")) || []);
    setYearValue(event.target.value);
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.date.split("-")[0] === event.target.value)
    );
  };

  return (
    <div className="App">
      <Header />
      <CreateNote addNote={addNote} />

      {/* <div className="select-options">
        <SelectOption
          value={value}
          onChange={handleChange}
          sortType={sortType}
        />
        <select value={yearValue} onChange={handleYearChange}>
          {sortYear.map((value, index) => (
            <option value={value} key={index}>
              {value}
            </option>
          ))}
        </select>
        <SelectOption
          value={monthValue}
          onChange={handleMonthChange}
          sortType={sortMonth}
        />
      </div> */}

      <div className="all-notes">
        {notes === null && <p>Loading...</p>}
        {notes &&
          notes.map(({ id, title, description, created_at }) => {
            return (
              <Note
                key={id}
                id={id}
                title={title}
                content={description}
                date={created_at}
                deleteNote={deleteNote}
                updateNote={updateNote}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
