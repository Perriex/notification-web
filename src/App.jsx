import "./App.css";
import React from "react";
import { allow_notification } from "./components/Utility/Service";
import { AppointmentLists } from "./components/Appointment/AppointmentLists";
import { MakeAppointment } from "./components/Appointment/MakeAppointment";

function App() {
  const [status, setStatus] = React.useState(undefined);

  React.useEffect(() => {
    allow_notification(setStatus);
  }, []);

  return (
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
  );
}

export default App;
