import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../../MyContext/MyContext';

function CheckboxDrinks({ i,
  ingredient,
  measure,
  id,
  drinkStepArray,
  setDrinkStepArray }) {
  const { store: { cocktails, setCocktails } } = useContext(MyContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const setDrinksObjectEffect = () => {
      setCocktails({ ...cocktails,
        [id]: [...drinkStepArray] });
    };
    setDrinksObjectEffect();
  }, [drinkStepArray]);

  useEffect(() => {
    const setDrinkStepArrayEffect = () => (isChecked
      ? setDrinkStepArray([...drinkStepArray, ingredient])
      : setDrinkStepArray(drinkStepArray.filter((f) => f !== ingredient)));
    setDrinkStepArrayEffect();
  }, [isChecked]);

  return (
    <label
      htmlFor={ i }
      data-testid="ingredient-step"
      style={ isChecked ? { textDecoration: 'none solid rgb(0, 0, 0)' }
        : { backgroundColor: 'red' } }
    >
      <input
        type="checkbox"
        id={ i }
        name={ i }
        onChange={ () => {
          setIsChecked(!isChecked);
          handleChange();
        } }
        checked={ isChecked }
      />
      {`${ingredient} - ${measure}`}
    </label>
  );
}

CheckboxDrinks.propTypes = {
  i: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  drinkStepArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDrinkStepArray: PropTypes.func.isRequired,
};

export default CheckboxDrinks;
