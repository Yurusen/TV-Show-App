import s from "./s.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { useState } from "react";

export function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  function submit(e) {
    if (e.key == "Enter" && e.target.value.trim() != "") {
      onSubmit(e.target.value);
      setValue("");
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <SearchIcon size={27} className={s.icon} />
      <input
        onKeyUp={submit}
        onChange={handleChange}
        type="text"
        value={value}
        className={s.input}
        placeholder="Search a movie you may like"
      />
    </>
  );
}
