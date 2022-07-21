import React from "react";
import { useEffect } from "react";
import { startDB } from "../Utility/IndexDB";

export const AppointmentLists = () => {
  const [list, setLists] = React.useState([]);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    startDB("get", { set: setLists });
  }, []);

  return (
    <ul style={{ listStyle: "none" }}>
      <li style={{ color: "black" }}>
        <h3>
          Today:
          <span
            style={{
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            }}
          >
            {new Date().toLocaleDateString("en-US", options)}
          </span>
        </h3>
      </li>
      {list.map((item, _id) => {
        return (
          <li style={{ color: "black" }} key={item.id}>
            <h5>
              {item.id}- {item.title} , Notification Date :
              <span style={{ color: "navy" }}>
                {new Date(item.date).toLocaleDateString("en-US", options)}
              </span>
            </h5>
          </li>
        );
      })}
    </ul>
  );
};
