import { useEffect, useState } from "react";
import { getTargetDate } from "../utils";
// Make sure the path is correct

const useCountdown = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = getTargetDate();
    const updateCountdown = () => {
      const now = new Date();
      const timeLeft = Math.max(0, targetDate - now); // Ensure we don't go negative
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    };

    const timerID = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerID);
  }, []);

  return countdown;
};

export default useCountdown;
