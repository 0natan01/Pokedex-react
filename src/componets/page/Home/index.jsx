import "./index.css";
import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import { FilterPokes } from "../../FilterPokemons/filter";
import { ThemeTogglerButton } from "../../theme-tloggler-button/theme-tloggler-button";

import { ThemeContext } from "../../../context/theme-context";

const LogoPokemon =
  "https://i.ebayimg.com/images/g/7GoAAOSwuWpdmJCJ/s-l400.png";

async function getPokemonsData(offset) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
  );
  const res = response.json();
  return res;
}

async function getPokemon(url) {
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}

const PokemonsList = () => {
  const [getpokemons, setGetPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const pokesQuantity = 12;
  const [search, setSearch] = useState("");
  const [selectType, setSelectType] = useState("");

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const pokemons = await getPokemonsData(offset);

      const pokemonsUrls = pokemons.results.map((pokemon) => pokemon.url);

      const pokemonsPromises = pokemonsUrls.map(
        async (pokemonUrl) => await getPokemon(pokemonUrl)
      );

      const pokemonsDados = await Promise.all(pokemonsPromises);

      setGetPokemons([...getpokemons, ...pokemonsDados]);
    };
    fetchData();
  }, [offset]);

  const morePokes = async () => {
    setOffset(offset + pokesQuantity);
  };

  const filterPokemons = (getpokemons) => {
    if (selectType === "") {
      return getpokemons;
    }

    const filteredPokemons = getpokemons.filter(
      (pokemon) => pokemon.types[0].type.name === selectType
    );
    return filteredPokemons;
  };

  return (
    <>
        <div
          className="main"
          style={{ color: theme.color, backgroundColor: theme.background }}
        >
          <Header>
            <div className="navbar">
              <img className="logo" src={LogoPokemon} alt="logo pokemon" />
              <FilterPokes
                selectType={selectType}
                setSelectType={setSelectType}
              />

              <input
                type="text"
                value={search}
                onChange={(ev) => setSearch(ev.target.value)}
                placeholder="find your pokemon"
                className="input-search"
              ></input>

              <ThemeTogglerButton />
            </div>
          </Header>
          <h1 className="title">Pokedex</h1>
          <div className="container">
            {filterPokemons(getpokemons)
              .filter((pokemon) => {
                const pokemonsFiltereds = pokemon.name.toLowerCase();
                const searchValue = search.toLowerCase();
                return pokemonsFiltereds.includes(searchValue);
              })
              .map((pokemon, index) => {
                return (
                  <div
                    key={index}
                    className="card"
                    style={{
                      color: theme.color,
                      backgroundColor: theme.cardBackground,
                    }}
                  >
                    <div className="image">
                      <img
                        src={pokemon.sprites?.front_default}
                        alt={pokemon.name}
                      />
                    </div>
                    <div className="name">
                      <H4 className="name">{pokemon.name}</H4>
                    </div>

                    <P>
                      {" "}
                      <Link to={`/pokemon/${pokemon.id}`}>Details</Link>
                    </P>
                  </div>
                );
              })}
          </div>
          <div className="more">
            <button onClick={() => morePokes()} className="add-pokemons">
              More Pokemons
            </button>
          </div>
        </div>
    </>
  );
};

const H4 = styled.h4`
  font-size: 18px;
`;

const P = styled.p`
  display: flex;
  justify-content: center;
  font-size: 15px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  @media (max-width: 280px) {
    width: 100%;
  }
`;

export default PokemonsList;
