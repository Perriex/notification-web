export const MakeAppointment = () => {
  const notification = (e) => {
    e.preventDefault();
    const notification = new Notification("Perriex Says:", {
      body: "hello",
    });
  };

  return (
    <form>
      <input
        type="datetime-local"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        type="text"
        onChange={(e) => setForm({ ...form, value: e.target.value })}
      />
      <button onClick={notification}>apply</button>
    </form>
  );
};
