import { useEffect, useState } from "react";

export default function CountUp({ value, duration = 1500, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const current = Math.floor(percentage * value);

      setCount(current);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, value, duration]);

  return <>{count}</>;
}
