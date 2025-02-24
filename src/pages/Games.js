import React from "react";
import gamesData from "./games.json"; // Renaming to gamesData to avoid naming conflict

const Games = () => {
  return (
    <>
      <div className="games">
        {gamesData.map((game, id) => {
          return (
            <div key={id} className="details">
              <h1 className="gameName">
                <a href={game.game_url} target="_blank" rel="noopener noreferrer">
                {game.name}
                </a>
                <img src={game.game_img}>
                </img>
              </h1>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Games;
