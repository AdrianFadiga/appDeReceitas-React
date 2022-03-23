import React, { useEffect, useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { fetchDrinks } from '../../Services';
import style from '../Explore/Explore.module.css';

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
    <section className={ style.father }>
      <Header />
      <section className={ style.exploreIngredients }>
        {ingredientes.map((({ strIngredient1 }, i) => (
          <Card
            key={ i }
            data-testid={ `${i}-ingredient-card` }
            style={ { width: '49%' } }
          >
            <Card.Img
              data-testid={ `${i}-card-img` }
              alt={ strIngredient1 }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            />
            <Card.Title data-testid={ `${i}-card-name` }>{strIngredient1}</Card.Title>
          </Card>
        )))}
      </section>
      <Footer />
    </section>
  );
}

export default ExploreDrinksIngredients;
