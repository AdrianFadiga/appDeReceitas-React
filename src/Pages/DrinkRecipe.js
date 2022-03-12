import React, { useEffect, useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { fetchDrinks, getIngredients, removeFavStorageDrink,
  saveDrinkFavStorage } from '../Services';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkRecipe() {
  const history = useHistory();
  const { pathname } = useLocation();
  const idd = pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipeFoods, setRecipeFoods] = useState([]);
  const [initRecipe, setInitRecipe] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritar, setFavoritar] = useState(false);
  const [countFav, setCountFav] = useState(0);

  const getFavStorage = () => {
    const res = localStorage.getItem('favoriteRecipes');
    const array = JSON.parse(res);
    if (array !== null) {
      const check = array.some(({ id: idDrink }) => idDrink === id);
      if (check) {
        setIsFavorited(true);
        setFavoritar(true);
      } else {
        setIsFavorited(false);
        setFavoritar(false);
      }
    }
  };

  const iniciarReceita = (idDrink) => {
    setInitRecipe(true);
    history.push(`/drinks/${idDrink}/in-progress`);
  };

  const fetchInitFoods = async () => {
    const result = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    result.meals.length = 6;
    setRecipeFoods(result.meals);
  };

  const teste = async () => {
    const response = await fetchDrinks(`lookup.php?i=${id}`);
    setRecipe(response);
    const res = getIngredients(response);
    setIngredients(res);
    fetchInitFoods();
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const favoritarReceita = () => {
    setFavoritar(!favoritar);
    setCountFav((prev) => prev + 1);
  };

  useEffect(() => {
    teste();
    getFavStorage();
  }, []);

  useEffect(() => {
    if (countFav !== 0) {
      if (favoritar) {
        saveDrinkFavStorage(recipe);
        setIsFavorited(true);
      } else {
        removeFavStorageDrink(id);
        setIsFavorited(false);
      }
    }
  }, [favoritar]);

  return (
    <>
      {recipe.map(
        ({
          idDrink,
          strDrink,
          strDrinkThumb,
          strInstructions,
          strAlcoholic,
        }) => (
          <div key={ idDrink }>
            <button
              data-testid="share-btn"
              type="button"
              value={ `http://localhost:3000${pathname}` }
              // Source: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
              onClick={ ({ target }) => {
                navigator.clipboard.writeText(target.value);
                setShowLinkCopied(true);
              } }
            >
              Compartilhar
            </button>
            {showLinkCopied
            && <p>Link copied!</p>}
            <input
              data-testid="favorite-btn"
              type="image"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="favoriteRecipe"
              onClick={ () => favoritarReceita() }
            />

            <h3 data-testid="recipe-category">{strAlcoholic}</h3>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            <img data-testid="recipe-photo" src={ strDrinkThumb } alt="oi" />
            <h2>Ingredientes:</h2>
            {ingredients.map(({ ingredient, measure }, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {`${ingredient} - ${measure}` }
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
            <Carousel responsive={ responsive }>
              {recipeFoods.map(({ idMeal, strMeal, strMealThumb }, i) => (
                <div
                  key={ i }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
                  <h2 data-testid={ `${i}-recomendation-title` }>{strMeal}</h2>
                  <Link to={ `/foods/${idMeal}` }>Detalhes</Link>
                </div>
              ))}
            </Carousel>
            <button
              onClick={ () => iniciarReceita(idDrink) }
              className="startRecipe"
              type="button"
              data-testid="start-recipe-btn"
            >
              {initRecipe ? 'Iniciar Receita' : 'Continue Recipe'}
            </button>
          </div>
        ),
      )}
    </>
  );
}

export default DrinkRecipe;
