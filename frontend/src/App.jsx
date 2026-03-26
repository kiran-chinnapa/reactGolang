import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const response = await fetch("/api/hello");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
        setTimestamp(data.timestamp);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    loadMessage();
  }, []);

  return (
    <main className="app">
      <section className="card">
        <h1>React + Go</h1>
        <p className="message">{error ? `Error: ${error}` : message}</p>
        {timestamp && <p className="timestamp">UTC time: {timestamp}</p>}
      </section>
    </main>
  );
}

export default App;
