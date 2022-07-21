import "./App.css";
import React from "react";
import { allow_notification } from "./components/Utility/Service";
import { AppointmentLists } from "./components/Appointment/AppointmentLists";
import { MakeAppointment } from "./components/Appointment/MakeAppointment";
import { startDB } from "./components/Utility/IndexDB";

export const listContext = React.createContext([]);

function App() {
  const [status, setStatus] = React.useState(undefined);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    allow_notification(setStatus);
    startDB("get", { set: setList });
  }, []);

  return (
    <listContext.Provider
      value={{
        list,
        setList,
      }}
    >
      <div className="App">
        {status === true ? (
          <h2 style={{ color: "green" }}>Your Notification is active!</h2>
        ) : status === undefined ? (
          <h2 style={{ color: "orange" }}>Pending!</h2>
        ) : (
          <h2 style={{ color: "red" }}>Your Notification is Off!</h2>
        )}
        <section>
          <AppointmentLists />
        </section>
        <section>
          <MakeAppointment />
        </section>
      </div>
    </listContext.Provider>
  );
}

export default App;
