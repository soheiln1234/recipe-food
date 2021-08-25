import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DoorDashFavorite from "./components/contentloader/DoorDashFavorite";
import Recipe from "./components/Recipe";

import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const APP_ID = "717c9df6";
  const APP_KEY = "7feb51559261af4abe4496663475d596";
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  useEffect(getRecipes, [query]);
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler} className="search-form">
        <input
          onChange={onChangeHandler}
          value={search}
          className="search-bar"
          type="text"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <motion.div
        transition={{ ease: "easeOut", duration: 2 }}
        animate={{ opacity: [0, 1], translateX: [-200, 0] }}
        className="recipes"
      >
        {recipes ? (
          recipes.map((recipe) => {
            return (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                imageSource={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            );
          })
        ) : (
          <div>
            <DoorDashFavorite />
            <DoorDashFavorite />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
