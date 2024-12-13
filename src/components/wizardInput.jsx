import { useState } from "react";
import getWizardData from "../data/getWizardData";

export default function WizardInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

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
      const data = await getWizardData(searchTerm);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="What do you want to look for"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={searchTerm}
      />
    </div>
  );
}
