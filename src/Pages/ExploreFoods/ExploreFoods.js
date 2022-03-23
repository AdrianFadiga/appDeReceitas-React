import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { fetchFoods } from '../../Services';
import style from '../Explore/Explore.module.css';

function ExploreFoods() {
  const {
    store: { setPageTitle, setShowSearchIcon },
  } = useContext(MyContext);
  const history = useHistory();

  const redirectFoodAleatorio = async () => {
    const res = await fetchFoods('random.php');
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
      <section className={ style.explorePage }>
        <Button
          variant="secondary"
          onClick={ () => history.push('/explore/foods/ingredients') }
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Button>
        <Button
          variant="secondary"
          onClick={ () => history.push('/explore/foods/nationalities') }
          data-testid="explore-by-nationality"
        >
          By Nationality
        </Button>
        <Button
          onClick={ () => redirectFoodAleatorio() }
          variant="secondary"
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </Button>
      </section>
      <Footer />
    </>
  );
}

export default ExploreFoods;
