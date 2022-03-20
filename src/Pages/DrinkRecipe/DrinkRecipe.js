import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link, useLocation, useParams } from 'react-router-dom';
import { getIngredients,
  checkDrinkIsFavorited,
  removeFavStorageDrink,
  saveDrinkFavStorage } from '../../Helpers';
import { fetchDrinks, fetchFoods } from '../../Services';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import MyContext from '../../MyContext/MyContext';

function DrinkRecipe() {
  const { store: { isFavorited,
    setIsFavorited,
    drinkRecipe,
    setDrinkRecipe,
    drinkIngredients,
    setDrinkIngredients,
    initRecipe,
    setInitRecipe } } = useContext(MyContext);
  const SIX = 6;
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const [recipeFoods, setRecipeFoods] = useState([]);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const iniciarReceita = (idDrink) => {
    setInitRecipe(true);
    history.push(`/drinks/${idDrink}/in-progress`);
  };

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    return !isFavorited ? saveDrinkFavStorage(drinkRecipe) : removeFavStorageDrink(id);
  };

  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 2,
  //   },
  // };

  useEffect(() => {
    const setRecipeEffect = async () => {
      setDrinkRecipe(await fetchDrinks(`lookup.php?i=${id}`));
    };
    setRecipeEffect();
  }, []);

  useEffect(() => {
    const setIngredientsEffect = async () => {
      if (drinkRecipe.length) {
        setDrinkIngredients(getIngredients(drinkRecipe));
      }
    };
    setIngredientsEffect();
  }, [drinkRecipe]);

  useEffect(() => {
    const setRecipeFoodsEffect = async () => {
      const data = await fetchFoods('search.php?s=');
      setRecipeFoods(data.slice(0, SIX));
    };
    setRecipeFoodsEffect();
  }, []);

  useEffect(() => {
    const setIsFavoritedEffect = () => {
      const check = checkDrinkIsFavorited(id);
      setIsFavorited(check);
    };
    setIsFavoritedEffect();
  }, []);

  return (
    <>
      {drinkRecipe.map(
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
              onClick={ handleClick }
            />

            <h3 data-testid="recipe-category">{strAlcoholic}</h3>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            <img data-testid="recipe-photo" src={ strDrinkThumb } alt="oi" />
            <h2>Ingredientes:</h2>
            {drinkIngredients.map(({ ingredient, measure }, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {`${ingredient} - ${measure}` }
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
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
