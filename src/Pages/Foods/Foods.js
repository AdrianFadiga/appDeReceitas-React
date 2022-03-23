import React, { useContext, useEffect, useState } from 'react';
import { fetchFoods } from '../../Services';
import { MAX_LENGTH } from '../../data';
import Card from '../../Components/Card/Card';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import CategoryListButton from '../../Components/CategoryListButton/CategoryListButton';
import style from './foods.module.css';

function Foods() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const SIX = 6;

  const fetchInitFoods = async () => {
    const result = await (await fetchFoods('search.php?s='));
    setData(result.slice(0, MAX_LENGTH));
  };

  const getCategories = async () => {
    const result = await fetchFoods('list.php?c=list');
    result.unshift({ strCategory: 'All' });
    setCategoryList(result.slice(0, SIX));
  };

  const handleSelect = async (strCategory) => {
    setSelectedCategory(strCategory);
    const validate = (
      selectedCategory === strCategory
      || strCategory === 'All'
    );
    if (validate) {
      fetchInitFoods();
      setSelectedCategory('');
    } else {
      const result = await fetchFoods(`filter.php?c=${strCategory}`);
      setData(result);
    }
  };

  useEffect(() => {
    setShowSearchIcon(true);
    setPageTitle('Foods');
    fetchInitFoods();
    getCategories();
  }, []);

  return (
    <section className={ style.foodsPage }>
      <Header />
      <section className={ style.buttonsContainer }>
        {categoryList.map(({ strCategory }, index) => (
          <CategoryListButton
            key={ index }
            strCategory={ strCategory }
            onClick={ () => handleSelect(strCategory) }
          />
        ))}
      </section>
      <section
        className={ style.recipesContainer }
      >
        {data.map((food, index) => (
          <Card
            cardTestId={ `${index}-recipe-card` }
            titleTestid={ `${index}-card-name` }
            imgTestId={ `${index}-card-img` }
            key={ index }
            link={ `/foods/${food.idMeal}` }
            recipeTitle={ food.strMeal }
            strThumb={ food.strMealThumb }
          />
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default Foods;
