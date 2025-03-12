import React, { useEffect, useState } from "react";
import hangmanImage from "../images/Hangman.webp"; // Importing the image if inside src/
import SpotDifferenceImage from "../images/games/spot-the-difference.jpg"; // Importing the image if inside src/
import WordSearchImg from "../images/games/wordsearch.png"; // Importing the image if inside src/
import colouringBookImg from "../images/games/colouring-book.jpg"; // Importing the image if inside src/
import HappyFishingImg from "../images/games/happy-fishing.jpg"; // Importing the image if inside src/
import CrashyCatImg from "../images/games/crashy-cat.jpg"; // Importing the image if inside src/





// Sample games data
const gamesData = [
  {
    id: 1,
    name: "Wordsearch",
    details: "",
    game_img: WordSearchImg, // Using imported image
    age_restriction: 8,
    game_url: "https://wordsearch.io/",
  },
  {
    id: 2,
    name: "Spot the Difference",
    details: "",
    game_img: SpotDifferenceImage, // Using imported image
    age_restriction: 8,
    game_url: "https://www.spotthedifference.com/",
  },
  {
    id: 3,
    name: "Hangman",
    details: "",
    game_img: hangmanImage, // Using imported image
    age_restriction: 8,
    game_url: "https://thewordsearch.com/hangman/",
  },
  {
    id: 4,
    name: "Colouring Book",
    details: "",
    game_img: colouringBookImg,
    age_restriction: 4,
    game_url: "https://kids.poki.com/game/coloring-book",
  },
  {
    id: 5,
    name: "Happy Fishing",
    details: "Description of the game",
    game_img: HappyFishingImg,
    age_restriction: 4,
    game_url: "https://kids.poki.com/game/happy-fishing",
  },
  {
    id: 6,
    name: "Crashy Cat",
    details: "Description of the game",
    game_img: CrashyCatImg,
    age_restriction: 4,
    game_url: "https://kids.poki.com/game/crashy-cat",
  }
];

const Games = () => {
  const [userAge, setUserAge] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.dob) {
        setUserAge(calculateAge(parsedUser.dob));
      }
    }
  }, []);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredGames = gamesData.filter((game) => game.age_restriction <= userAge);

  return (
    <div>
      <h1 className="available-games-heading">Here are some games for you to play!</h1>

      {userAge === null ? (
        <p>Loading...</p>
      ) : filteredGames.length === 0 ? (
        <p>No games available for your age group.</p>
      ) : (
        filteredGames.map((game) => (
          <div key={game.id}>
            <div className="games-border">
              <h2 className="gameName">{game.name}</h2>
              <img className="image" src={game.game_img} alt={`Image of ${game.name}`} />
              <button
                onClick={() => window.open(game.game_url, "_blank", "noopener noreferrer")}
                className="playGameButton"
              >
                Play {game.name}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Games;
