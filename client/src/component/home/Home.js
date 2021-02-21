import axios from "axios";
import "./Home.css";

import CreateNote from "../create-note/CreateNote";
import { useEffect, useState } from "react";
import Note from "../note/Note";
import Header from "../header/Header";
import SelectOption from "../select-option/SelectOption";

const Home = () => {
  const [notes, setNotes] = useState(null);

  const [sortType] = useState([
    { value: "desc", label: "NEWEST FIRST" },
    { value: "asc", label: "OLDEST FIRST" },
  ]);
  const [sort, setSort] = useState(sortType[0].value);

  const [sortYear, setSortYear] = useState(null);

  const [year, setYear] = useState(new Date().getFullYear());

  const [sortMonth] = useState([
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sep" },
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
    setYear(event.target.value);
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:8000/api/notes/${id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(sort);
    const params = {
      sort,
      month,
      year,
    };
    axios
      .get("http://localhost:8000/api/notes/", {
        params,
      })
      .then((response) => {
        setNotes(response.data?.results);
        console.log(response);
        setSortYear([
          ...new Set(response.data?.results.map((note) => note.year)),
        ]);
        // console.log([
        //   ...new Set(response.data?.results.map((note) => note.year)),
        // ]);
      })
      .catch((error) => console.log(error.response));
  }, [sort, month, year]);

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
        {sortYear !== null && (
          <select value={year} onChange={handleYearChange}>
            {sortYear.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>
        )}
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
