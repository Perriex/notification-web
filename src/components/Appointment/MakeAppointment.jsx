import { useState } from "react";
import { startDB } from "../Utility/IndexDB";

export const MakeAppointment = () => {
  const [form, setForm] = useState({ date: "", text: "" });

  const add = (e) => {
    e.preventDefault();
    if (form.date !== "") startDB("insert", form);
  };

  return (
    <form>
      <input
        required
        type="datetime-local"
        onChange={(e) =>
          setForm({ ...form, date: String(new Date(e.target.value)) })
        }
      />
      <input
        value={form.text}
        type="text"
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <button onClick={add}>apply</button>
    </form>
  );
};
