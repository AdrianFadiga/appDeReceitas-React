import React, { useEffect, useContext, useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { fetchFoods } from '../../Services';

function ExploreFoodsIngredients() {
  const {
    store: { setPageTitle, setShowSearchIcon },
  } = useContext(MyContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setPageTitle('Explore Ingredients');
    setShowSearchIcon(false);
  }, []);

  useEffect(() => {
    const setIngredientsEffect = async () => {
      const res = await fetchFoods('list.php?i=list');
      setIngredients(res);
    };
    setIngredientsEffect();
  }, []);

  return (
    <>
      <Header />
      {ingredients.map(({ strIngredient }, i) => (
        <div key={ i } data-testid={ `${i}-ingredient-card` }>
          <img
            data-testid={ `${i}-card-img` }
            alt={ strIngredient }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          />
          <p data-testid={ `${i}-card-name` }>{strIngredient}</p>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
