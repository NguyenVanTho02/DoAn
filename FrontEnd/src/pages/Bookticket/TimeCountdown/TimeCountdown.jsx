import { useMemo } from "react";
import Countdown, { zeroPad } from "react-countdown";

const TimeCountdown = () => {
  const setTimeCount = useMemo(() => {
    return Date.now() + 300000;
  }, []);

  const style = {
    fontWeight: 500,
    fontSize: 34,
    color: "#fb4226",
    lineHeight: "39px",
  };

  return (
    <Countdown
      date={setTimeCount}
      renderer={({ minutes, seconds }) => (
        <span style={style}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
    />
  );
};

export default TimeCountdown;
