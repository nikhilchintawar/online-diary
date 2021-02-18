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
  const [reload, setReload] = useState(false);

  const [sortType] = useState([
    { value: "asc", label: "NEWEST FIRST" },
    { value: "desc", label: "OLDEST FIRST" },
  ]);
  const [sort, setSort] = useState(sortType[0].value);

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
  const [month, setMonth] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setNotes(JSON.parse(localStorage.getItem("notes")) || []);
    setYearValue(event.target.value);
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.date.split("-")[0] === event.target.value)
    );
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:8000/api/notes/${id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(sort);
    axios
      .get("http://localhost:8000/api/notes/", {
        params: {
          sort,
          month,
        },
      })
      .then((response) => {
        setNotes(response.data?.results);
        console.log(response);
      })
      .catch((error) => console.log(error.response));
  }, [sort, month]);

  return (
    <div className="App">
      <Header />
      <CreateNote />

      <div className="select-options">
        <SelectOption
          value={sort}
          onChange={handleChange}
          sortType={sortType}
        />
        {/*<select value={yearValue} onChange={handleYearChange}>
          {sortYear.map((value, index) => (
            <option value={value} key={index}>
              {value}
            </option>
          ))}
        </select>*/}
        <SelectOption
          value={month}
          onChange={handleMonthChange}
          sortType={sortMonth}
        />
      </div>

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
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
