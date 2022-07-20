import "./App.css";
import React from "react";

function App() {
  const [form, setForm] = React.useState({ date: "", value: "" });

  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }
    return true;
  }

  const allowNotif = () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
    } else {
      if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
          console.log(permission);
        });
      } else {
        Notification.requestPermission(function (permission) {
          console.log(permission);
        });
      }
    }
  };

  const Notif = (e) => {
    e.preventDefault();
    const text = form.value;
    const notification = new Notification("Perriex Says:", {
      body: text,
    });
  };

  return (
    <div className="App">
      <div>
        <ul>
          <li>
            <h4>{form.date}</h4>
          </li>
          <li>
            <h4>{form.value}</h4>
          </li>
        </ul>
      </div>
      <button onClick={allowNotif}>Enable notifications</button>

      <form>
        <input
          type="datetime-local"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="type"
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />
        <button onClick={Notif}>add</button>
      </form>
    </div>
  );
}

export default App;
