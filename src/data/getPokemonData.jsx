export default async function getPokemonData(searchTerm) {
  const apiURL = `https://pokeapi.co/api/v2/${searchTerm}?limit=60`;

  try {
    const response = await fetch(apiURL);
    const APIdata = await response.json();
    console.log("API response: ", response);
    console.log("searchTerm: ", searchTerm);
    console.log("API data: ", APIdata);
    return APIdata;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
