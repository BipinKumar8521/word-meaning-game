import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [player1score, setPlayer1Score] = useState(0);
  const [player2score, setPlayer2Score] = useState(0);
  const [currentplayer, setCurrentPlayer] = useState(player1);
  const [player1meaning, setPlayer1Meaning] = useState("");
  const [player2meaning, setPlayer2Meaning] = useState("");
  const [words, setWords] = useState([]);
  const [player1time, setPlayer1Time] = useState(30);
  const [player2time, setPlayer2Time] = useState(30);
  const [totaltime, setTotalTime] = useState(600);

  const handler = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (totaltime === 0) {
        if (player1score > player2score) {
          alert(`${player1} won the game`);
        } else if (player2score > player1score) {
          alert(`${player2} won the game`);
        } else {
          alert("Game Draw");
        }
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayer1Meaning("A");
        setPlayer2Meaning("");
        setWords([]);
        setPlayer1Time(30);
        setPlayer2Time(30);
        setTotalTime(600);
        setCurrentPlayer(player1);
        return;
      }
      setTotalTime(totaltime - 1);
      if (currentplayer === player1) {
        setPlayer1Time(player1time - 1);
        if (player1time === 0) {
          setPlayer1Time(30);
          setCurrentPlayer(player2);
          setPlayer1Meaning("");
          setPlayer2Meaning(player1meaning.charAt(0).toUpperCase());
        }
      } else {
        setPlayer2Time(player2time - 1);
        if (player2time === 0) {
          setPlayer2Time(30);
          setCurrentPlayer(player1);
          setPlayer2Meaning("");
          setPlayer1Meaning(player2meaning.charAt(0).toUpperCase());
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (currentplayer === player1) {
      setPlayer1Meaning("A");
    } else {
      setPlayer2Meaning("A");
    }
  }, []);

  const handlePlayerInput = (e) => {
    if (e.target.value === "") {
      return;
    }
    if (currentplayer === player1) {
      setPlayer1Meaning(e.target.value);
    } else {
      setPlayer2Meaning(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (currentplayer === player1) {
      if (!words.find((word) => word === player1meaning)) {
        setWords([...words, player1meaning]);
        setPlayer1Score(player1score + 10);
        setPlayer2Meaning(
          player1meaning.charAt(player1meaning.length - 1).toUpperCase()
        );
        setPlayer1Time(30);
        setCurrentPlayer(player2);
        setPlayer1Meaning("");
      } else {
        navigator.vibrate =
          navigator.vibrate ||
          navigator.webkitVibrate ||
          navigator.mozVibrate ||
          navigator.msVibrate;

        if (navigator.vibrate) {
          // vibration API supported
          console.log("vibration supported");
          navigator.vibrate(1000);
        } else {
          // vibration API not supported
          console.log("vibration not supported");
        }
        setPlayer1Score(player1score - 5);
        setPlayer1Meaning(player1meaning.charAt(0).toUpperCase());
      }
    } else {
      if (!words.find((word) => word === player2meaning)) {
        setWords([...words, player2meaning]);
        setPlayer2Score(player2score + 10);
        setPlayer1Meaning(
          player2meaning.charAt(player2meaning.length - 1).toUpperCase()
        );
        setPlayer2Time(30);
        setCurrentPlayer(player1);
        setPlayer2Meaning("");
      } else {
        setPlayer2Score(player2score - 5);
        setPlayer2Meaning(player2meaning.charAt(0).toUpperCase());
      }
    }
  };

  return (
    <div className="main-container">
      <div className="game-container">
        <div className="player1-container">
          <h3>{player1}</h3>
          <h4>{currentplayer === player1 ? "Your" : "Opponent"} Turn</h4>
          <div className="player1-details">
            <div className="player1-time">
              {player1time > 9 ? player1time : `0${player1time}`}s
            </div>
            <div className="player1-score">Score : {player1score}</div>
          </div>
          <div className="player1-inputs">
            <input
              type="text"
              value={player1meaning}
              onChange={handlePlayerInput}
              onKeyDown={handler}
              {...(currentplayer === player2 && { disabled: true })}
            />
            <button
              onClick={handleSubmit}
              {...(currentplayer === player2 && { disabled: true })}
            >
              Submit
            </button>
            <div className="word-meaning">
              <h3>Meaning</h3>
            </div>
          </div>
        </div>
        <div className="total-time-container">
          Time -{" "}
          {Math.floor(totaltime / 60) > 9
            ? Math.floor(totaltime / 60)
            : `0${Math.floor(totaltime / 60)}`}
          :{totaltime % 60 > 9 ? totaltime % 60 : `0${totaltime % 60}`}
        </div>
        <div className="player2-container">
          <h3>{player2}</h3>
          <h4>{currentplayer === player2 ? "Your" : "Opponent"} Turn</h4>
          <div className="player2-details">
            <div className="player2-time">
              {player2time > 9 ? player2time : `0${player2time}`}s
            </div>
            <div className="player2-score">Score : {player2score}</div>
          </div>
          <div className="player2-inputs">
            <input
              type="text"
              value={player2meaning}
              onChange={handlePlayerInput}
              onKeyDown={handler}
              {...(currentplayer === player1 && { disabled: true })}
            />
            <button
              onClick={handleSubmit}
              {...(currentplayer === player1 && { disabled: true })}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
