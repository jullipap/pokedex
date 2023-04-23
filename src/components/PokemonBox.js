import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/pokemonBox.css";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function PokemonBox({ url, color }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      });
  }, [url]);

  return (
    pokemonData && (
      <Link to={`/pokemon/${pokemonData.id}`}> 
        <div className="box" style={{ backgroundColor: color }}>
          <div>
            <div className="number">#{pokemonData.id}</div>
            <div className="pokemon-name">{capitalize(pokemonData.name)}</div>
          </div>
          <div>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
          </div>
        </div>
      </Link>
    )
  );
}
