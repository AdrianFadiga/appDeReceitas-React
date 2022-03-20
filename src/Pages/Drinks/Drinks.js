import React, { useContext, useEffect, useState } from 'react';
import { fetchDrinks } from '../../Services';
import { MAX_LENGTH } from '../../data';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Card from '../../Components/Card/Card';
import MyContext from '../../MyContext/MyContext';
import CategoryListButton from '../../Components/CategoryListButton/CategoryListButton';

function Drinks() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [drinkCategories, setDrinkCategories] = useState([]);
  const FIVE = 5;

  const fetchInitDrinks = async () => {
    const result = await (await fetchDrinks('search.php?s='));
    setData(result.slice(0, MAX_LENGTH));
  };

  const fetchDrinksCategories = async () => {
    const resultCategories = await fetchDrinks('list.php?c=list');
    setDrinkCategories(resultCategories.slice(0, FIVE));
  };

  const handleSelect = async (strCategory) => {
    setSelectedCategory(strCategory);
    const validate = (
      selectedCategory === strCategory
      || strCategory === 'All'
    );
    if (validate) {
      fetchInitDrinks();
      setSelectedCategory('');
    } else {
      const result = await fetchDrinks(`filter.php?c=${strCategory}`);
      setData(result);
    }
  };

  useEffect(() => {
    setShowSearchIcon(true);
    setPageTitle('Drinks');
    fetchInitDrinks();
    fetchDrinksCategories();
  }, []);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleSelect('All') }
      >
        All

      </button>
      {drinkCategories.map(({ strCategory }, index) => (
        <CategoryListButton
          key={ index }
          strCategory={ strCategory }
          onClick={ () => handleSelect(strCategory) }
        />
      ))}
      <main>
        <h3>Drinks:</h3>
        <section className="all-recipes">
          {data.map((drink, index) => (
            <Card
              cardTestId={ `${index}-recipe-card` }
              titleTestid={ `${index}-card-name` }
              imgTestId={ `${index}-card-img` }
              key={ index }
              link={ `/drinks/${drink.idDrink}` }
              recipeTitle={ drink.strDrink }
              strThumb={ drink.strDrinkThumb }
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
