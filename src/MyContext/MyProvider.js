import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [pageTitle, setPageTitle] = useState('Foods');
  const [isFavorited, setIsFavorited] = useState(false);
  const [foodRecipe, setFoodRecipe] = useState([]);
  const [drinkRecipe, setDrinkRecipe] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [initRecipe, setInitRecipe] = useState(false);
  const [meals, setMeals] = useState({});
  const [cocktails, setCocktails] = useState({});

  const store = {
    data,
    setData,
    showSearchIcon,
    setShowSearchIcon,
    pageTitle,
    setPageTitle,
    isFavorited,
    setIsFavorited,
    foodRecipe,
    setFoodRecipe,
    foodIngredients,
    setFoodIngredients,
    drinkRecipe,
    setDrinkRecipe,
    drinkIngredients,
    setDrinkIngredients,
    initRecipe,
    setInitRecipe,
    meals,
    setMeals,
    cocktails,
    setCocktails,
  };
  return (
    <MyContext.Provider value={ { store } }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MyProvider;
