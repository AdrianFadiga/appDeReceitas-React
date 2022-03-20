import React, { useEffect, useContext, useState } from 'react';
import DoneRecipeCard from '../../Components/DoneRecipeCard/DoneRecipeCard';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';

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
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      {buttons.map((button) => (
        <button
          type="button"
          value={ button.toLowerCase() }
          key={ button }
          onClick={ ({ target }) => setFilter(target.value) }
          data-testid={ `filter-by-${button.toLowerCase()}-btn` }
        >
          {button}
        </button>
      ))}
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
    </>
  );
}

export default DoneRecipes;
