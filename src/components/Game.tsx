import { useEffect, useRef, useState } from "react";

const SPEED = 6;
const UPDATE_INTERVAL = 1000 / 60; // 60 frames per second

interface Player {
  x: number;
  y: number;
  speed: number;
  direction: [number, number];
}

const Game: React.FC = () => {
  const [player, setPlayer] = useState<Player>({
    x: 0,
    y: 0,
    speed: 0,
    direction: [0, 0],
  });
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const updateIntervalId = useRef<number>();

  const updatePlayerPosition = (x: number, y: number) => {
    console.log(`update->${x} ${y}`);
    setPlayer({
      ...player,
      x: x,
      y: y,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current[event.key] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(updateIntervalId.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    updateIntervalId.current = Number(
      setInterval(() => {
        let x = player.x;
        let y = player.y;

        if (keysPressed.current["ArrowLeft"]) {
          x -= SPEED;
        }
        if (keysPressed.current["ArrowRight"]) {
          x += SPEED;
        }
        if (keysPressed.current["ArrowUp"]) {
          y -= SPEED;
        }
        if (keysPressed.current["ArrowDown"]) {
          y += SPEED;
        }
        updatePlayerPosition(x, y);
      }, UPDATE_INTERVAL)
    );
    return () => {
      clearInterval(updateIntervalId.current);
    };
  }, [player]);

  return (
    <div>
      <div style={{ position: "absolute", left: player.x, top: player.y }}>
        Player
      </div>
    </div>
  );
};

export default Game;
