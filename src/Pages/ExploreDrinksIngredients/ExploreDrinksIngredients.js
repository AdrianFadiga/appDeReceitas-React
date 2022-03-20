import React, { useEffect, useContext, useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { fetchDrinks } from '../../Services';

function ExploreDrinksIngredients() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const [ingredientes, setIngredientes] = useState([]);

  const requestIngredients = async () => {
    const res = await fetchDrinks('list.php?i=list', 1);
    setIngredientes(res);
  };

  useEffect(() => {
    setPageTitle('Explore Ingredients');
    setShowSearchIcon(false);
  }, []);

  useEffect(() => {
    requestIngredients();
  }, []);

  return (
    <>
      <Header />
      {ingredientes.map((({ strIngredient1 }, i) => (
        <div key={ i } data-testid={ `${i}-ingredient-card` }>
          <img
            data-testid={ `${i}-card-img` }
            alt={ strIngredient1 }
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          />
          <p data-testid={ `${i}-card-name` }>{strIngredient1}</p>
        </div>
      )))}
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
