import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinks } from '../../Services';
import { getIngredients,
  saveDrinkProgress,
  checkDrinkIsFavorited,
  saveDrinkFavStorage,
  removeFavStorageDrink,
  validateFinishButton,
  saveDoneRecipe } from '../../Helpers';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import MyContext from '../../MyContext/MyContext';
import Checkbox from '../../Components/Checkbox/Checkbox';

function DrinksInProgress() {
  const { store: { isFavorited,
    setIsFavorited,
    setDrinkRecipe,
    setDrinkIngredients,
    drinkRecipe,
    drinkIngredients,
  } } = useContext(MyContext);
  const { id } = useParams();
  const history = useHistory();
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  let ingredientArray = [];

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    return !isFavorited ? saveDrinkFavStorage(drinkRecipe) : removeFavStorageDrink(id);
  };

  const handleChange = (isChecked, ingredient) => {
    if (isChecked) {
      ingredientArray.push(ingredient);
    } else {
      ingredientArray = ingredientArray.filter((f) => f !== ingredient);
    }
    saveDrinkProgress(ingredientArray, id);
    setIsDisabled(!validateFinishButton(ingredientArray, drinkIngredients));
  };

  useEffect(() => {
    const setDrinkAndIngredientsEffect = async () => {
      if (!drinkRecipe.length) {
        const data = await fetchDrinks(`lookup.php?i=${id}`);
        setDrinkRecipe(data);
        setDrinkIngredients(getIngredients(data));
      }
    };
    setDrinkAndIngredientsEffect();
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
          strCategory,
          strDrink,
          strDrinkThumb,
          strInstructions,
        }) => (
          <div key={ idDrink }>
            <button
              data-testid="share-btn"
              type="button"
              value={ `http://localhost:3000/drinks/${id}` }
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
              onClick={ () => handleClick() }
            />
            <h3 data-testid="recipe-category">{strCategory}</h3>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            <img data-testid="recipe-photo" src={ strDrinkThumb } alt="oi" />
            <h2>Ingredientes:</h2>
            {drinkIngredients.map(({ ingredient, measure }, i) => (
              <Checkbox
                key={ i }
                ingredient={ ingredient }
                measure={ measure }
                handleChange={ handleChange }
                type="cocktails"
                i={ i }
                id={ id }
              />
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
          </div>
        ),
      )}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ () => {
          saveDoneRecipe(drinkRecipe);
          history.push('/done-recipes');
        } }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default DrinksInProgress;
