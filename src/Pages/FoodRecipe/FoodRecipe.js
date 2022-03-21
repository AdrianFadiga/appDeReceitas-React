import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card as NovoCard, ListGroup, Carousel, Button } from 'react-bootstrap';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import { fetchFoods, fetchDrinks } from '../../Services';
import { checkFoodIsFavorited,
  getIngredients,
  saveFoodFavStorage,
  removeFavStorageFood } from '../../Helpers';
import MyContext from '../../MyContext/MyContext';
import './FoodRecipe.css';

function FoodRecipe() {
  const { store: { isFavorited,
    setIsFavorited,
    foodRecipe,
    setFoodRecipe,
    foodIngredients,
    setFoodIngredients,
    initRecipe,
    setInitRecipe } } = useContext(MyContext);
  const SIX = 6;
  const { id } = useParams();
  const history = useHistory();
  const [recipeDrinks, setRecipeDrinks] = useState([]);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    return !isFavorited ? saveFoodFavStorage(foodRecipe) : removeFavStorageFood(id);
  };

  useEffect(() => {
    const setRecipeEffect = async () => {
      setFoodRecipe(await fetchFoods(`lookup.php?i=${id}`));
    };
    setRecipeEffect();
  }, []);

  useEffect(() => {
    const setIngredientsEffect = async () => {
      // Esse if foi só para não quebrar o teste - aplicação funciona normal sem;
      if (foodRecipe.length) {
        setFoodIngredients(getIngredients(foodRecipe));
      }
    };
    setIngredientsEffect();
  }, [foodRecipe]);

  useEffect(() => {
    const setRecipeDrinksEffect = async () => {
      const data = await fetchDrinks('search.php?s=');
      setRecipeDrinks(data.slice(0, SIX));
    };
    setRecipeDrinksEffect();
  }, []);

  useEffect(() => {
    const setIsFavoritedEffect = () => {
      const check = checkFoodIsFavorited(id);
      setIsFavorited(check);
    };
    setIsFavoritedEffect();
  }, []);

  return (
    <section className="foodRecipe">
      {foodRecipe.map(
        ({
          idMeal,
          strCategory,
          strMeal,
          strMealThumb,
          strInstructions,
          strYoutube,
        }) => (
          <div key={ idMeal }>
            <NovoCard>
              <NovoCard.Img
                variant="top"
                data-testid="recipe-photo"
                src={ strMealThumb }
              />
              <NovoCard.Body>
                <NovoCard.Title data-testid="recipe-title">
                  {strMeal}
                </NovoCard.Title>
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
                  variant="secondary"
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  { `${ingredient} - ${measure}` }
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ListGroup>
              <h3>Modo de preparo:</h3>
              <ListGroup.Item
                data-testid="instructions"
                variant="secondary"
              >
                {strInstructions}
              </ListGroup.Item>
            </ListGroup>
            <NovoCard>
              <NovoCard.Body
                style={ { padding: '0px' } }
              >
                <iframe
                  width="100%"
                  height="315"
                  src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                />
              </NovoCard.Body>
            </NovoCard>

            <Button
              onClick={ () => {
                setInitRecipe(true);
                history.push(`/foods/${idMeal}/in-progress`);
              } }
              className="startRecipe"
              type="button"
              data-testid="start-recipe-btn"
            >
              {initRecipe ? 'Iniciar Receita' : 'Continue Recipe'}
            </Button>
          </div>
        ),
      )}
      <Carousel fade>
        {recipeDrinks.map(({ idDrink, strDrink, strDrinkThumb }, i) => (
          <Carousel.Item
            data-testid={ `${i}-recomendation-card` }
            key={ i }
          >
            <input
              type="image"
              className="d-block w-100"
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt="oi"
              onClick={ () => history.push(`/drinks/${idDrink}`) }
            />
            <Carousel.Caption
              data-testid={ `${i}-recomendation-title` }
            >
              {strDrink}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default FoodRecipe;
