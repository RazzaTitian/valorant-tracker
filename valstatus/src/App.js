import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

function App() {
  const [status, setStatus] = useState("Offline");

  useEffect(() => {
    socket.on("statusUpdate", (newStatus) => {
      setStatus(newStatus);
    });
  }, []);

  const handleStatusChange = () => {
    const newStatus = status === "Online" ? "Offline" : "Online";
    socket.emit("statusChange", newStatus);
  };

  return (
    <div>
      <h1>Valorant Account Status: {status}</h1>
      <button onClick={handleStatusChange}>
        Set to {status === "Online" ? "Offline" : "Online"}
      </button>
    </div>
  );
}

export default App;
