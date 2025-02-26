import React, { useEffect, useState } from "react";

// Sample games data (usually you will import this)
const gamesData = [
  {
    id: 1,
    name: "Hangman",
    details: "Hangman is a game.",
    game_img: "/assets/images/games/hangman",
    age_restriction: 8,
    game_url: "https://thewordsearch.com/hangman/",
  },
  {
    id: 2,
    name: "Spot the difference",
    details: "Spot the difference is a game",
    game_img: "/assets/images/games/food-theif.png",
    age_restriction: 4,
    game_url: "https://www.spotthedifference.com/",
  },
  {
    id: 3,
    name: "Guess the Word",
    details: "Guess the word is a game",
    game_img: "/assets/images/games/food-theif.png",
    age_restriction: 4,
    game_url: "https://wordly.org/",
  },
  {
    id: 4,
    name: "Guess the song lyric",
    details: "Description of the game",
    game_img: "/assets/images/games/food-theif.png",
    age_restriction: 8,
    game_url: "https://www.sporcle.com/games/quizzess/guess-the-song-by-the-lyrics",
  },
  {
    id: 5,
    name: "Food thief",
    details: "Description of the game",
    game_img: "/assets/images/games/food-theif.png",
    age_restriction: 8,
    game_url: "https://google.com",
  },
];

const Games = () => {
  const [userAge, setUserAge] = useState(null);

  // Fetch user data and calculate age based on dob
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.dob) {
        setUserAge(calculateAge(parsedUser.dob));
      }
    }
  }, []);

  // Function to calculate age from dob
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

  // Filter the games based on the calculated user age
  const filteredGames = gamesData.filter(game => game.age_restriction <= userAge);

  return (
    <div>
      <h1 className="available-games-heading">Available Games. Your age is {userAge}!</h1>
      
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
                onClick={() => window.open(game.game_url, '_blank', 'noopener noreferrer')}
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
