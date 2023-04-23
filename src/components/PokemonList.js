import { useState, useEffect } from 'react';
import PokemonBox from './PokemonBox';
import '../styles/pokemonList.css';

const colors = ["#8bbe8a", "#ffa756", "#58abf6", "#8bd674", "#7f007f", "#e4b9d4"]

export default function PokemonList(){

    const [pokemonList, setPokemonList] = useState(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${24 * page}&limit=24`)
        .then((response) => response.json())
        .then((data) => {
            setPokemonList(data.results);
        });
    }, [page]);

    function handlePrevious(){
        if(page>0){
            setPage(page - 1);
        }
    }

    function handleNext(){
        setPage(page + 1);

    }


    return(
        <>
        <div className='pokemonList'>
            {pokemonList && pokemonList.map((pokemon) => (
                <PokemonBox key={pokemon.name} url={pokemon.url} color={colors[Math.floor(Math.random()*colors.length)]}></PokemonBox>
            ))}
        </div>

        <div className='button-div'>
            {page===0 ? "" :<button  className='button' onClick={handlePrevious}>Previous</button>}
            <button className='button' onClick={handleNext}>Next</button>
        </div>
        </>
        
    );
}