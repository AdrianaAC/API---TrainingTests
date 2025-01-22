import { useState } from "react";
import "./PokemonCard.css";

export default function PokemonCard({
  id,
  pokemon,
  handleNext,
  handlePrevious,
  handlePickRandom,
}) {
  const {
    name,
    weight,
    abilities,
    species,
    sprites,
    cries,
    base_experience,
    height,
    moves,
    types,
    stats,
  } = pokemon;
  const filtered = Object.keys(sprites).filter((key) => sprites[key] != null);

  const [imageNumber, setImageNumber] = useState(0);

  const nextImage = function () {
    if (imageNumber < filtered.length - 3) {
      setImageNumber((prev) => prev + 1);
    }
  };

  const prevImage = function () {
    if (imageNumber > 0) {
      setImageNumber((prev) => prev - 1);
    }
  };

  const handleButtons = function (ACTION) {
    setImageNumber(0);
    switch (ACTION) {
      case 1:
        handleNext();
        break;
      case 2:
        handlePrevious();
        break;
      case 3:
        handlePickRandom();
        break;
    }
  };
  return pokemon.species ? (
    <div className="PokeCard">
      <h1 className="PokeCard-Title">
        ID: {id} - {name}
      </h1>
      <h3 className="PokeCard-Statement">Species: {species.name}</h3>
      <h3 className="PokeCard-Statement">Sprite: {filtered[imageNumber]}</h3>
      <div className="PokeCard-Center">
        <button className="PokeCard-Inner-Btn" onClick={prevImage}>
          ←
        </button>
        <div className="PokeCard-Image">
          <img
            className="PokeCard-Image-Inner"
            width="100px"
            height="100px"
            src={sprites[filtered[imageNumber]]}
            alt={filtered[imageNumber]}
          />
        </div>
        <button className="PokeCard-Inner-Btn" onClick={nextImage}>
          →
        </button>
      </div>
      <div className="PokemonStats">
        {stats && (
          <ul>
            Stats:
            {stats.map((stat, index) => {
              return (
                <li key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              );
            })}
          </ul>
        )}
        {abilities && (
          <ul>
            Abilities:
            {abilities.map((ability, index) => {
              return <li key={index}>{ability.ability.name}</li>;
            })}
          </ul>
        )}
        {moves && (
          <ul>
            Moves:
            {moves.map((move, index) => {
              return <li key={index}>{move.move.name}</li>;
            })}
          </ul>
        )}
        {types && (
          <ul>
            Types:
            {types.map((type, index) => {
              return <li key={index}>{type.type.name}</li>;
            })}
          </ul>
        )}
        {weight && <p>Weight: {weight}</p>}
        {species && <p>Species: {species.name}</p>}
        {base_experience && <p>Base Experience: {base_experience}</p>}
        {height && <p>Height: {height}</p>}
      </div>
      <div>
        <button className="PokeCard-Button" onClick={() => handleButtons(2)}>
          -
        </button>
        <button className="PokeCard-Button" onClick={() => handleButtons(3)}>
          Random
        </button>
        <button className="PokeCard-Button" onClick={() => handleButtons(1)}>
          +
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
