import axios from "axios";

export const getPokemon = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
  return response.data.results;
};
