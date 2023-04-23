import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/pokemonDetails.css";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function PokemonDetails({ color }) {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      });
  }, [id]);

  return (
    <div className="details" style={{ backgroundColor: color }}>
      {pokemonData && (
        <>
          <div className="left-section">
            <div className="name-container">
              <div className="number-details">#{pokemonData.id}</div>
              <div className="pokemon-name-details">
                {capitalize(pokemonData.name)}
              </div>
            </div>
            <div className="image-container">
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
              />
            </div>
          </div>
          <div className="right-section">
            <div className="info-container">
              <div className="info-header">Type</div>
              <div className="info-value">
                {pokemonData.types
                  .map((type) => capitalize(type.type.name))
                  .join(", ")}
              </div>
            </div>
            <div className="info-container">
              <div className="info-header">Stats</div>
              <div className="info-value">
                {pokemonData.stats
                  .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
                  .join(", ")}
              </div>
            </div>
            <div className="info-container">
              <div className="info-header">Abilities</div>
              <div className="info-value">
                {pokemonData.abilities
                  .map((ability) => capitalize(ability.ability.name))
                  .join(", ")}
              </div>
            </div>
            <div className="info-container">
              <div className="info-header">Weight</div>
              <div className="info-value">{pokemonData.weight / 10} kg</div>
            </div>
            <div className="info-container">
              <div className="info-header">Height</div>
              <div className="info-value">{pokemonData.height / 10} m</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
