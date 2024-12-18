import { useState, useEffect } from "react";
import getPokemonData from "../data/getPokemonData";

export default function PokemonInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [themes, setThemes] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData(searchTerm);
  }, []);

  function handleChange(event) {
    let input = event.target.value.toLowerCase();
    console.log("searching: ", searchTerm);
    setSearchTerm(input);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      fetchData(input);
    }, 1000);

    setTimeoutId(newTimeoutId);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      fetchData(searchTerm);
    }
  };

  async function fetchData(searchTerm) {
    try {
      const data = await getPokemonData(searchTerm);
      if (searchTerm === "") {
        setThemes(Object.entries(data));
      } else {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleThemeClick = (theme) => {
    const newSearchTerm = `${searchTerm}/${theme}`;
    setSearchTerm(newSearchTerm);
    fetchData(newSearchTerm);
  };

  const handleResultClick = (resultName) => {
    const newSearchTerm = `${searchTerm}/${resultName}`;
    setSearchTerm(newSearchTerm);
    fetchData(newSearchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="What do you want to look for"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={searchTerm}
      />
      {!searchTerm ? (
        <div className="themes">
          <p>Themes</p>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {themes.map(([theme, url]) => (
              <li key={theme}>
                <span onClick={() => handleThemeClick(theme)}>{theme}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="results">
          <p>Results: {themes.length}</p>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {results.map((result) => (
              <li key={result.name}>
                <span
                  onClick={() => handleResultClick(result.name)}
                  style={{ cursor: "pointer" }}
                >
                  {result.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
