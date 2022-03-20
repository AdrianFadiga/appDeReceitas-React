import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import { fetchFoodArea, fetchFoods } from '../../Services';

function ExploreFoodsNationalities() {
  const {
    store: { setPageTitle, setShowSearchIcon, data, setData },
  } = useContext(MyContext);
  const [nacionalidades, setNacionalidades] = useState();
  const [pais, setPais] = useState('All');
  const history = useHistory();
  const MAX_LENGTH = 12;

  const fetchInitFoods = async () => {
    const result = await fetchFoods('search.php?s=');
    setData(result.slice(0, MAX_LENGTH));
  };

  const handlePais = async (target) => {
    if (target === 'All') {
      fetchInitFoods();
    } else {
      setData(await fetchFoods(`filter.php?a=${target}`, MAX_LENGTH));
    }
    setPais(target);
    console.log(pais);
  };

  const fetchNacionalidade = async () => {
    const res = await fetchFoodArea();
    setNacionalidades(res);
  };

  useEffect(() => {
    setPageTitle('Explore Nationalities');
    setShowSearchIcon(true);
  }, []);

  useEffect(() => {
    fetchNacionalidade();
  }, []);

  useEffect(() => {
    fetchInitFoods();
  }, []);

  return (
    <>
      <Header />
      {nacionalidades !== undefined && (
        <form>
          <label htmlFor="nacionalidade">
            Filtrar por nacionalidade:
            <select
              onChange={ ({ target }) => handlePais(target.value) }
              data-testid="explore-by-nationality-dropdown"
              id="nacionalidade"
            >
              <option data-testid="All-option">All</option>
              {nacionalidades.map(({ strArea }) => (
                <option data-testid={ `${strArea}-option` } key={ strArea }>
                  {strArea}
                </option>
              ))}
            </select>
          </label>
          <section className="all-recipes">
            {data.map(({ strMeal, idMeal, strMealThumb }, i) => (
              <div key={ i } className="card" data-testid={ `${i}-recipe-card` }>
                <button type="button" onClick={ () => history.push(`/foods/${idMeal}`) }>
                  <h4 data-testid={ `${i}-card-name` }>{ strMeal }</h4>
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${i}-card-img` }
                  />
                </button>
              </div>
            ))}
          </section>
        </form>
      )}
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;
