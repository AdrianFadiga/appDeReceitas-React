import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card as NovoCard, ListGroup, Button } from 'react-bootstrap';
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
import shareIcon from '../../images/shareIcon.svg';
import MyContext from '../../MyContext/MyContext';
import Checkbox from '../../Components/Checkbox/Checkbox';
import '../FoodsInProgress/FoodsInProgress.css';

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
            <NovoCard
              style={ { width: '95%' } }
            >
              <NovoCard.Img
                variant="top"
                data-testid="recipe-photo"
                src={ strDrinkThumb }
              />
              <NovoCard.Body>
                <NovoCard.Title data-testid="recipe-title">{strDrink}</NovoCard.Title>
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
                    value={ `http://localhost:3000/drinks/${id}` }
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
              <h2>Ingredientes:</h2>
              {drinkIngredients.map(({ ingredient, measure }, i) => (
                <ListGroup.Item
                  variant="secondary"
                  key={ i }
                >
                  <Checkbox
                    ingredient={ ingredient }
                    measure={ measure }
                    handleChange={ handleChange }
                    type="cocktails"
                    i={ i }
                    id={ id }
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
          saveDoneRecipe(drinkRecipe);
          history.push('/done-recipes');
        } }
      >
        Finalizar Receita
      </Button>
    </>
  );
}

export default DrinksInProgress;
