import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card as NovoCard, ListGroup, Carousel, Button } from 'react-bootstrap';
import { getIngredients,
  checkDrinkIsFavorited,
  removeFavStorageDrink,
  saveDrinkFavStorage } from '../../Helpers';
import { fetchDrinks, fetchFoods } from '../../Services';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import MyContext from '../../MyContext/MyContext';
import '../FoodRecipe/FoodRecipe.css';

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
    <section className="foodRecipe">
      {drinkRecipe.map(
        ({
          idDrink,
          strDrink,
          strDrinkThumb,
          strInstructions,
          strAlcoholic,
        }) => (
          <div key={ idDrink }>
            <NovoCard>
              <NovoCard.Img
                variant="top"
                src={ strDrinkThumb }
                data-testid="recipe-photo"
              />
              <NovoCard.Body>
                <NovoCard.Title
                  data-testid="recipe-title"
                >
                  {strDrink}
                </NovoCard.Title>
                <NovoCard.Subtitle
                  data-testid="recipe-category"
                >
                  {strAlcoholic}
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
              {drinkIngredients.map(({ ingredient, measure }, i) => (
                <ListGroup.Item
                  variant="secondary"
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  {`${ingredient} - ${measure}` }
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
            <Button
              onClick={ () => iniciarReceita(idDrink) }
              className="startRecipe"
              type="button"
              data-testid="start-recipe-btn"
            >
              {initRecipe ? 'Iniciar Receita' : 'Continue Recipe'}
            </Button>
            <Carousel
              fade
            >
              {recipeFoods.map(({ idMeal, strMeal, strMealThumb }, i) => (
                <Carousel.Item
                  key={ i }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <input
                    type="image"
                    className="d-block w-100"
                    data-testid="recipe-photo"
                    src={ strMealThumb }
                    alt="oi"
                    onClick={ () => history.push(`/foods/${idMeal}`) }
                  />
                  <Carousel.Caption
                    data-testid={ `${i}-recomendation-title` }
                  >
                    {strMeal}
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ),
      )}
    </section>
  );
}

export default DrinkRecipe;
