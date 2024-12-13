export default async function getWizardData(dataType) {
  const apiURL = "https://api.potterdb.com";
  let data;

  switch (dataType) {
    case "books":
      data = {
        name: "Books",
        url: "/v1/books",
      };
      break;
    case "characters":
      data = {
        name: "Characters",
        url: "/v1/characters",
      };
      break;
    case "movies":
      data = {
        name: "Movies",
        url: "/v1/movies",
      };
      break;
    case "potions":
      data = {
        name: "Potions",
        url: "/v1/potions",
      };
      break;
    case "spells":
      data = {
        name: "Spells",
        url: "/v1/spells",
      };
      break;
    default:
      throw new Error("Invalid data type");
  }

  let requestedAPI = apiURL + data.url;
  try {
    const response = await fetch(requestedAPI);
    const APIdata = await response.json();
    return APIdata;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
