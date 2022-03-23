import React, { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { fetchDrinks } from '../../Services';
import MyContext from '../../MyContext/MyContext';
import style from '../Explore/Explore.module.css';

function ExploreDrinks() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const history = useHistory();

  const redirectDrinkdAleatorio = async () => {
    const res = await fetchDrinks('random.php', 1);
    const { idDrink } = res[0];
    history.push(`/drinks/${idDrink}`);
  };

  useEffect(() => {
    setPageTitle('Explore Drinks');
    setShowSearchIcon(false);
  }, []);

  return (
    <section className={ style.father }>
      <Header />
      <section className={ style.explorePage }>
        <Button
          variant="secondary"
          onClick={ () => history.push('/explore/drinks/ingredients') }
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Button>
        <Button
          variant="secondary"
          onClick={ () => redirectDrinkdAleatorio() }
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </Button>
      </section>
      <Footer />
    </section>
  );
}

export default ExploreDrinks;
