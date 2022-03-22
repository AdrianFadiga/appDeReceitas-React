import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import FavoriteRecipeCard from '../../Components/FavoriteRecipeCard/FavoriteRecipeCard';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { getLocalStorage,
  removeFavStorageFood, removeFavStorageDrink } from '../../Helpers';
import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const buttons = ['Food', 'Drink'];

  const getFavoriteRecipes = () => {
    const data = getLocalStorage('favoriteRecipes');
    if (data !== null) {
      setFavoriteRecipes(data);
    } else {
      setFavoriteRecipes([]);
    }
  };

  const handleClick = (id, type) => {
    if (type === 'food') {
      removeFavStorageFood(id);
    } else {
      removeFavStorageDrink(id);
    }
    getFavoriteRecipes();
  };

  useEffect(() => {
    setPageTitle('Favorite Recipes');
    setShowSearchIcon(false);
    getFavoriteRecipes();
  }, []);

  // useEffect(() => {
  //   getFavoriteRecipes();
  // }, []);

  return (
    <>
      <Header />
      <section className="recipesSection">
        <div className="buttonGroup">
          <Button
            variant="secondary"
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => setFilter('') }
          >
            All
          </Button>
          {buttons.map((button) => (
            <Button
              variant="secondary"
              type="button"
              value={ button.toLowerCase() }
              key={ button }
              onClick={ ({ target }) => setFilter(target.value) }
              data-testid={ `filter-by-${button.toLowerCase()}-btn` }
            >
              {button}
            </Button>
          ))}
        </div>
        {favoriteRecipes.filter(({ type }) => type.includes(filter))
          .map(({ alcoholicOrNot,
            category, id, image, name, nationality, type }, index) => (
            (<FavoriteRecipeCard
              key={ index }
              index={ index }
              alcoholicOrNot={ alcoholicOrNot }
              category={ category }
              doneDate=""
              id={ id }
              image={ image }
              name={ name }
              nationality={ nationality }
              type={ type }
              handleClick={ () => handleClick(id, type) }
            />)
          ))}
      </section>
    </>
  );
}

export default FavoriteRecipes;
