import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Recipetile from "./recipetile/Recipetile";
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";

function App() {
  const YOUR_APP_ID = "7184cf21";
  const YOUR_APP_KEY = "a9337d6a73353c7c9921eb69850b411c";
  const [query, setQuery] = useState("");
  const [healthLabel, setHealthLabel] = useState("vegetarian");
  const [recipes, setRecipes] = useState([]);

  //   const firebaseConfig = {
  //     apiKey: "AIzaSyA8e2vTVgpGRxxg9RMuzZ9UaaCZfaWeHTc",
  //     authDomain: "recipe-hubb-67453.firebaseapp.com",
  //     projectId: "recipe-hubb-67453",
  //     storageBucket: "recipe-hubb-67453.appspot.com",
  //     messagingSenderId: "33025724125",
  //     appId: "1:33025724125:web:83101b0ec3d41b0d649534",
  //   };
  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault(); //this will prevent page from reloading.
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>
        <u>Food Recipe Hub</u>🥗
      </h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Type the Ingredient"
          autoComplete="Off"
          className="app__input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <select className="app__healthLabels">
          <option
            value="vegan"
            onClick={() => {
              setHealthLabel("vegan");
            }}
          >
            vegan
          </option>
          <option
            value="vegetarian"
            onClick={() => {
              setHealthLabel("vegetarian");
            }}
          >
            vegetarian
          </option>
          <option
            value="low-sugar"
            onClick={() => {
              setHealthLabel("low-sugar");
            }}
          >
            low-sugar
          </option>
          <option
            value="dairy-free"
            onClick={() => {
              setHealthLabel("dairy-free");
            }}
          >
            dairy-free
          </option>
          <option
            value=" immuno-supportive "
            onClick={() => {
              setHealthLabel(" immuno-supportive ");
            }}
          >
            immuno-supportive
          </option>
          <option
            value="wheat-free"
            onClick={() => {
              setHealthLabel("wheat-free");
            }}
          >
            wheat-free
          </option>
        </select>
        <input type="submit" value="Get Recipe" className="app__submit" />
      </form>
      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <Recipetile recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default App;
