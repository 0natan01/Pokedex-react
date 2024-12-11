import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import "./pokemon-details.css";
import "./pokemon-details.css";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../../context/theme-context";

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const res = await response.json();
  return res;
}

const PokesDetails = () => {
  const [abilities, setAbilities] = useState([]);
  const [abilitiesName, setAbilitiesNames] = useState([]);
  const [pokemon, setPokemons] = useState([]);
  const [moves, setMoves] = useState([]);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchDetails = async (abs) => {
      const getPokes = await getPokemon(id);
      setPokemons(getPokes);

      const getMoves = getPokes.moves.map((moves) => moves);
      setMoves(getMoves);

      const getType = getPokes.types.map((types) => types.type);
      setTypes(getType);

      const statsData = getPokes.stats.map((stats) => stats);
      setStats(statsData);

      const abilitiesData = getPokes.abilities.map(
        (abilities) => abilities.ability
      );
      
      const pokeAbilitiesDetails = await abilitiesData.map(async (ability) => {
         const response = await fetch(ability.url);
         const res = await response.json();
         return res;
       });
       
      const abilitiesFetched = await Promise.all(pokeAbilitiesDetails);
      console.log(abilitiesFetched);
      setAbilitiesNames(abilitiesFetched)

      abilitiesFetched.map((abilities) => {
        const abilitiesDescription = abilities.effect_entries.filter(
          (language) => language.language.name === "en"
        );        
        setAbilities(abilitiesDescription);
      });
    };
    fetchDetails();
  }, []);

  return (
    <Main>
      <Container
        style={{ color: theme.color, backgroundColor: theme.background }}
      >
        <CardPokemon>
          <div className="card-header">
            <Link to={"/"}>Back</Link>
            <PokeExp>Exp:{pokemon.base_experience}</PokeExp>
          </div>

          <div className="backGround">
            <Image src={pokemon.sprites?.front_default} alt="Pokemon" />
          </div>
          <PokeName>{pokemon.name}</PokeName>
          <PokeType
            style={{
              color: theme.color,
              backgroundColor: theme.cardBackground,
            }}
          >
            {types.map((type, i) => {
              return (
                <div key={i}>
                  <p>Type:{type.name}</p>
                </div>
              );
            })}
          </PokeType>
          <PokesStats
            style={{ color: theme.color, backgroundColor: theme.background }}
          >
            {stats.map((stats, i) => {
              return (
                <StatsDetails
                  key={i}
                  style={{
                    color: theme.color,
                    backgroundColor: theme.cardBackground,
                  }}
                >
                  <span>{stats.stat.name}</span>
                  <p>{stats.base_stat}</p>
                </StatsDetails>
              );
            })}
          </PokesStats>
        </CardPokemon>
        <Description>
          <h3 className="ability">Abilities</h3>

          <div>
              <AbilityName>{abilitiesName[0]?.name}</AbilityName>
          </div>
          <Abilities>
            {abilities.map((ability, i) => {
              return (
                <AbilityLi key={i}>
                
                  <span>{ability.effect}</span>
                </AbilityLi>
              );
            })}
          </Abilities>
        </Description>
        <Moves>
          <h3>Moves:</h3>
          <UlMoves>
            {moves.slice(0, 20).map((moves, i) => {
              return (
                <div key={i} className="moves">
                  <LiMoves
                    style={{
                      color: theme.color,
                      backgroundColor: theme.cardBackground,
                    }}
                  >
                    {moves.move.name}
                  </LiMoves>
                </div>
              );
            })}
          </UlMoves>
        </Moves>
      </Container>
    </Main>
  );
};

const UlMoves = styled.ul`
  display: block;
`;

const Main = styled.main`
  background-color: #b20022;
  width: 100vw;
  height: 100vh;
  align-center: center;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 20px 40px;

  @media (max-width: 825px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: #fff;
  @media (max-width: 1115px) {
    width: 100%;
  }

  @media (max-width: 825px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 312px) {
    width: 240px;
  }
  @media (max-width: 272px) {
    width: 200px;
  }
`;

const PokeExp = styled.span`
  font-size: 15px;
`;

const CardPokemon = styled.div`
  border-radius: 5px;
  width: 400px;
  padding: 10px;
  @media (max-width: 825px) {
    width: 500px;
    margin: 0px;
  }

  @media (max-width: 600px) {
    width: 400px;
    margin: 0px;
  }

  @media (max-width: 502px) {
    width: 300px;
    margin: 0px;
  }

  @media (max-width: 410px) {
    width: 260px;
    margin: 0px;
  }

  @media (max-width: 365px) {
    width: 240px;
    margin: 0px;
  }

  @media (max-width: 312px) {
    width: 200px;
    width: 100%;
  }

  @media (max-width: 265px) {
    width: 80%;
  }
`;

const PokeName = styled.h2`
  text-align: center;
`;

const Image = styled.img`
  width: 200px;
`;

const PokeType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-radius: 4px;
  background-color: #f0f0f0;
  @media (max-width: 266px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const PokesStats = styled.div``;

const StatsDetails = styled.div`
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  border-radius: 5px;
`;

const Description = styled.section`
  width: 500px;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    width: 400px;
  }

  @media (max-width: 505px) {
    width: 300px;
  }

  @media (max-width: 385px) {
    width: 260px;
  }
  @media (max-width: 312px) {
    width: 200px;
    width: 100%;
  }
`;

const Abilities = styled.ul`
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 95%;
  height: 100%;
  //overflow: hidden;
  //overflow-y: scroll;
  @media (max-width: 312px) {
    width: 160px;
    width: 100%;
  }
`;

const AbilityLi = styled.li`
  padding: 10px;
  @media (max-width: 505px) {
    width: 240px;
  }

  @media (max-width: 385px) {
    width: 180px;
  }

  @media (max-width: 312px) {
    width: 140px;
  }
`;

const AbilityName = styled.h4`
  text-align: center;
`;

const Moves = styled.div`
  width:250px;
  height 100%;
  @media (max-width:825px){
      width:500px;
  }

    @media (max-width:600px){
      width:400px;
  }

   @media (max-width:505px){
      width:300px;
  }

     @media (max-width:410px){
      width: 100%;
  }

    @media (max-width:312px){
      width: 100%;
  }

   @media (max-width:265px){
       width: 82%;
  }
`;

const LiMoves = styled.li`
  background-color: #f0f0f0;
  border-radius: 6px;
  margin: 2px;
`;

export default PokesDetails;
