import "./App.css";
import WizardInput from "./components/wizardInput";
import PokemonInput from "./components/pokemonInput";

function App() {
  return (
    <div className="App">
      <h1>Wizard Data</h1>
      <WizardInput />
      <h1>Pokemon Data</h1>
      <PokemonInput />
    </div>
  );
}

export default App;
