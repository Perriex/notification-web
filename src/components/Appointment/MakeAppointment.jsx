import React, { useState } from "react";
import { listContext } from "../../App";
import { startDB } from "../Utility/IndexDB";

export const MakeAppointment = () => {
  const [form, setForm] = useState({ date: "", text: "" });
  const context = React.useContext(listContext);

  const add = (e) => {
    e.preventDefault();
    if (form.date !== "") {
      startDB("insert", form);
      startDB("get", { set: context.setList });
    }
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
