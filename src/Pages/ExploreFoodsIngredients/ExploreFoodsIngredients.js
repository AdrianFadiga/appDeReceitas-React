import React, { useEffect, useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { fetchFoods } from '../../Services';
import style from '../Explore/Explore.module.css';

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
    <section className={ style.father }>
      <Header />
      <section
        className={ style.exploreIngredients }
      >
        {ingredients.map(({ strIngredient }, i) => (
          <Card
            key={ i }
            data-testid={ `${i}-ingredient-card` }
            style={ { width: '49%' } }
          >
            <Card.Img
              data-testid={ `${i}-card-img` }
              alt={ strIngredient }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            />
            <Card.Title data-testid={ `${i}-card-name` }>{strIngredient}</Card.Title>
          </Card>
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default ExploreFoodsIngredients;
