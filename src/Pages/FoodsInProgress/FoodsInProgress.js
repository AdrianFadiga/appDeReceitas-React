import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card as NovoCard, ListGroup, Button } from 'react-bootstrap';
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
import shareIcon from '../../images/shareIcon.svg';
import MyContext from '../../MyContext/MyContext';
import Checkbox from '../../Components/Checkbox/Checkbox';
import '../FoodRecipe/FoodRecipe.css';

// Finalizado até o req 53;
// Cacar bug que faz com que o localStorage apague toda a array de checados quando da f5 na página;

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
            <NovoCard
              style={ { width: '95%' } }
            >
              <NovoCard.Img
                variant="top"
                data-testid="recipe-photo"
                src={ strMealThumb }
              />
              <NovoCard.Body>
                <NovoCard.Title data-testid="recipe-title">{strMeal}</NovoCard.Title>
                <NovoCard.Subtitle
                  data-testid="recipe-category"
                >
                  {strCategory}

                </NovoCard.Subtitle>
                <div className="inputs">
                  <input
                    data-testid="share-btn"
                    src={ shareIcon }
                    type="image"
                    alt="compartilhar"
                    value={ `http://localhost:3000/foods/${id}` }
                    // Source: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
                    onClick={ ({ target }) => {
                      navigator.clipboard.writeText(target.value);
                      setShowLinkCopied(true);
                    } }
                  />
                  {showLinkCopied
            && <p>Link copied!</p>}
                  <input
                    data-testid="favorite-btn"
                    type="image"
                    src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
                    alt="favoriteRecipe"
                    onClick={ () => handleClick() }
                  />
                </div>
              </NovoCard.Body>
            </NovoCard>
            <ListGroup>
              <h3>Ingredientes:</h3>
              {foodIngredients.map(({ ingredient, measure }, i) => (
                <ListGroup.Item
                  key={ i }
                  variant="secondary"
                >
                  <Checkbox
                    ingredient={ ingredient }
                    measure={ measure }
                    id={ id }
                    handleChange={ handleChange }
                    i={ i }
                    type="meals"
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ListGroup>
              <h3>Modo de preparo:</h3>
              <ListGroup.Item
                variant="secondary"
                data-testid="instructions"
              >
                {strInstructions}
              </ListGroup.Item>
            </ListGroup>
          </div>
        ),
      )}
      <Button
        data-testid="finish-recipe-btn"
        variant={ isDisabled ? 'secondary' : 'primary' }
        type="button"
        disabled={ isDisabled }
        onClick={ () => {
          saveDoneRecipe(foodRecipe);
          history.push('/done-recipes');
        } }
      >
        Finalizar Receita
      </Button>
    </>
  );
}

export default FoodsInProgress;
