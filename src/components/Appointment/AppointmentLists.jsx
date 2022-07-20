import React from "react";

export const AppointmentLists = () => {
  const [list, setLists] = React.useState([]);
  return (
    <ul>
      {list.map((item, _id) => {
        return <li>{item.task}</li>;
      })}
    </ul>
  );
};
