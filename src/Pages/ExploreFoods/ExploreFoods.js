import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { fetchFoods } from '../../Services';

function ExploreFoods() {
  const {
    store: { setPageTitle, setShowSearchIcon },
  } = useContext(MyContext);
  const history = useHistory();

  const redirectFoodAleatorio = async () => {
    const res = await fetchFoods('random.php', 1);
    const { idMeal } = res[0];
    history.push(`/foods/${idMeal}`);
  };

  useEffect(() => {
    setPageTitle('Explore Foods');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <nav>
        <Link
          to="/explore/foods/ingredients"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Link>
        <Link
          to="/explore/foods/nationalities"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </Link>
        <button
          onClick={ () => redirectFoodAleatorio() }
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </nav>
      <Footer />
    </>
  );
}

export default ExploreFoods;
