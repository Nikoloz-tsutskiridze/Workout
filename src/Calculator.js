import { useState, useMemo, memo, useEffect } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const playSound = function () {
    if (!allowSound) return;
    const sound = new Audio(clickSound);
    sound
      .play()
      .catch((error) => console.error("Audio playback failed:", error));
  };

  const duration = useMemo(
    function () {
      return (number * sets * speed) / 60 + (sets - 1) * durationBreak;
    },
    [number, sets, speed, durationBreak]
  );

  const formatTime = function (duration) {
    const mins = Math.floor(duration);
    const seconds = Math.floor((duration - mins) * 60);
    return { mins, seconds };
  };

  useEffect(
    function () {
      document.title = `Your ${number}-exercise workout`;
    },
    [number]
  );

  const { mins, seconds } = formatTime(duration);

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            aria-label="Number of sets"
          />
          <span>{sets}</span>
        </div>

        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            aria-label="Exercise speed"
          />
          <span>{speed} sec/exercise</span>
        </div>

        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(Number(e.target.value))}
            aria-label="Break duration"
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>

      <section>
        <button
          onClick={() => {
            setNumber((prev) => Math.max(1, prev - 1));
            playSound();
          }}
        >
          –
        </button>
        <p>
          {mins < 10 ? "0" : ""}
          {mins}:{seconds < 10 ? "0" : ""}
          {seconds}
        </p>
        <button
          onClick={() => {
            setNumber((prev) => prev + 1);
            playSound();
          }}
        >
          +
        </button>
      </section>
    </>
  );
}

export default memo(Calculator);
