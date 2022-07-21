import { getNextDate } from "./Time";

export const startDB = (act, data) => {
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  if (!indexedDB) {
    alert("IndexedDB could not be found in your browser.");
    return;
  }
  if (!localStorage.getItem("v")) {
    localStorage.setItem("v", 1);
  }
  const v = +localStorage.getItem("v");
  const request = indexedDB.open("PerriexDB", v);
  localStorage.setItem("v", v + 1);
  request.onerror = function (event) {
    console.log(
      "%c An error occurred with IndexedDB. Check console.",
      "background: #222; color: #bada55"
    );
    console.error(`%c ${event}`, "background: #222; color: #bada55");
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (event.oldVersion < 1) {
      const store = db.createObjectStore("notification", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("date", ["date"], { unique: true });
      store.createIndex("title", ["date", "title"], {
        unique: false,
      });
    }
    onUpdateDB(db);
  };

  request.onsuccess = (event) => {
    console.log("%c DB start!", "background: #222; color: #bada55");
    const db = event.target.result;

    const transaction = db.transaction("notification", "readwrite");

    const store = transaction.objectStore("notification");
    if (act) {
      if (act === "delete") {
        store.delete(data.id);
      }
      if (act === "insert") {
        store.add({
          title: data.text,
          date: data.date,
        });
      }
      if (act === "get") {
        const allRecords = store.getAll();
        allRecords.onsuccess = function () {
          data.set(allRecords.result);
        };
      }
    } else {
      const allRecords = store.getAll();
      allRecords.onsuccess = function () {
        if (allRecords.result.length === 0)
          store.add({
            id: 1,
            title: "Hey, welcome!",
            date: String(new Date()),
          });
      };
    }
    onUpdateDB(db);
  };
};

const onUpdateDB = (db) => {
  db.onversionchange = (event) => {
    db.close();

    console.log(
      "%c A new version of this page is ready. Please reload or close this tab!",
      "background: #222; color: #bada55"
    );
  };
};
