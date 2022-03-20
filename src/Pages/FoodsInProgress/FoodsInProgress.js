import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchFoods } from '../../Services';
import { getIngredients,
  saveFoodProgress,
  checkFoodIsFavorited,
  saveFoodFavStorage,
  removeFavStorageFood,
  validateFinishButton,
  saveDoneRecipe } from '../../Helpers';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import MyContext from '../../MyContext/MyContext';
import Checkbox from '../../Components/Checkbox/Checkbox';

// Finalizado até o req 53;
// Caçar dois bugs:
// Um que faz a aplicação quebrar porque o includes da checkbox dá undefined;
// Outro que faz com que o localStorage apague toda a array de checados quando da f5 na página;

function FoodsInProgress() {
  const { store: { isFavorited,
    setIsFavorited,
    setFoodRecipe,
    setFoodIngredients,
    foodRecipe,
    foodIngredients,
  } } = useContext(MyContext);
  const { id } = useParams();
  const history = useHistory();
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  let ingredientArray = [];

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    return !isFavorited ? saveFoodFavStorage(foodRecipe) : removeFavStorageFood(id);
  };

  const handleChange = (isChecked, ingredient) => {
    if (isChecked) {
      ingredientArray.push(ingredient);
    } else {
      ingredientArray = ingredientArray.filter((f) => f !== ingredient);
    }
    saveFoodProgress(ingredientArray, id);
    setIsDisabled(!validateFinishButton(ingredientArray, foodIngredients));
  };

  useEffect(() => {
    const setFoodAndIngredientsEffect = async () => {
      if (!foodRecipe.length) {
        const data = await fetchFoods(`lookup.php?i=${id}`);
        setFoodRecipe(data);
        setFoodIngredients(getIngredients(data));
      }
    };
    setFoodAndIngredientsEffect();
  }, []);

  useEffect(() => {
    const setIsFavoritedEffect = () => {
      const check = checkFoodIsFavorited(id);
      setIsFavorited(check);
    };
    setIsFavoritedEffect();
  }, []);

  return (
    <>
      {foodRecipe.map(
        ({
          idMeal,
          strCategory,
          strMeal,
          strMealThumb,
          strInstructions,
        }) => (
          <div key={ idMeal }>
            <button
              data-testid="share-btn"
              type="button"
              value={ `http://localhost:3000/foods/${id}` }
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
            <h2 data-testid="recipe-title">{strMeal}</h2>
            <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
            <h2>Ingredientes:</h2>
            {foodIngredients.map(({ ingredient, measure }, i) => (
              <Checkbox
                key={ i }
                ingredient={ ingredient }
                measure={ measure }
                id={ id }
                handleChange={ handleChange }
                i={ i }
                type="meals"
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
          saveDoneRecipe(foodRecipe);
          history.push('/done-recipes');
        } }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default FoodsInProgress;
