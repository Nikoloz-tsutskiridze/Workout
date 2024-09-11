import { useEffect, useState, useMemo, useCallback } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";

const formatTime = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  const partOfDay = useMemo(() => {
    const hours = new Date().getHours();
    return hours < 12 ? "AM" : "PM";
  }, []);

  const workouts = useMemo(
    () => [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ],
    [partOfDay]
  );

  const updateTime = useCallback(() => {
    setTime(formatTime(new Date()));
  }, []);

  useEffect(() => {
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, [updateTime]);

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
