import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import DoneRecipeCard from '../../Components/DoneRecipeCard/DoneRecipeCard';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import style from '../FavoriteRecipes/FavoriteRecipes.module.css';

function DoneRecipes() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const buttons = ['Food', 'Drink'];

  useEffect(() => {
    setPageTitle('Done Recipes');
    setShowSearchIcon(false);
  }, []);

  useEffect(() => {
    const getDoneRecipesEffect = () => {
      const res = JSON.parse(localStorage.getItem('doneRecipes'));
      if (res !== null) {
        setDoneRecipes(res);
      }
    };
    getDoneRecipesEffect();
  }, []);

  return (
    <>
      <Header />
      <section className={ style.recipesSection }>
        <div className={ style.buttonGroup }>
          <Button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => setFilter('') }
            variant="secondary"
          >
            All
          </Button>
          {buttons.map((button) => (
            <Button
              type="button"
              value={ button.toLowerCase() }
              key={ button }
              onClick={ ({ target }) => setFilter(target.value) }
              data-testid={ `filter-by-${button.toLowerCase()}-btn` }
              variant="secondary"

            >
              {button}
            </Button>
          ))}
        </div>
        {doneRecipes.filter(({ type }) => type.includes(filter))
          .map(({ alcoholicOrNot,
            category, doneDate, id, image, name, nationality, tags, type }, index) => (
            (<DoneRecipeCard
              key={ index }
              index={ index }
              alcoholicOrNot={ alcoholicOrNot }
              category={ category }
              doneDate={ doneDate }
              id={ id }
              image={ image }
              name={ name }
              nationality={ nationality }
              tags={ tags }
              type={ type }
              showTagAndDoneDate
            />)
          ))}
      </section>
    </>
  );
}

export default DoneRecipes;
