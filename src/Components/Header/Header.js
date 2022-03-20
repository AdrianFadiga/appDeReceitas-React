import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { fetchFoods, fetchDrinks } from '../../Services';
import MyContext from '../../MyContext/MyContext';
import './Header.css';

function Header() {
  const history = useHistory();
  const { store: { setData, showSearchIcon, pageTitle } } = useContext(MyContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('filter.php?i=');

  const handleClick = async (endpoint, comparison) => {
    const fetchFoodsOrDrinks = (pageTitle.includes('Foods'))
      ? fetchFoods : fetchDrinks;
    const data = await fetchFoodsOrDrinks(endpoint, comparison);
    setData(data);
    if (data.length === 1) {
      const foodOrDrinkRecipeRedirect = (
        pageTitle.includes('Foods') ? `/foods/${data[0].idMeal}`
          : `/drinks/${data[0].idDrink}`
      );
      history.push(`${foodOrDrinkRecipeRedirect}`);
    }
  };

  const searchForm = (
    <>
      <ToggleButtonGroup
        type="radio"
        name="filter"
        className="mb-1"
        onChange={ (event) => setSearchType(event) }
      >
        <ToggleButton
          id="ingredient"
          type="radio"
          value="filter.php?i="
          name="filter"
          variant="secondary"
          data-testid="ingredient-search-radio"
        >
          Ingredient
        </ToggleButton>
        <ToggleButton
          id="name"
          type="radio"
          value="search.php?s="
          name="filter"
          variant="secondary"
          // onChange={ ({ target }) => setSearchType(target.value) }
          data-testid="name-search-radio"
        >
          Name
        </ToggleButton>
        <ToggleButton
          id="firstLetter"
          type="radio"
          value="search.php?f="
          name="filter"
          variant="secondary"
          onChange={ ({ target }) => setSearchType(target.value) }
          data-testid="first-letter-search-radio"
        >
          First Letter
        </ToggleButton>
        <Button
          variant="success"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleClick(`${searchType}${searchValue}`, searchValue) }
        >
          Search
        </Button>
      </ToggleButtonGroup>
      <form className="header">
        <input
          type="text"
          name="searchValue"
          value={ searchValue }
          onChange={ ({ target }) => setSearchValue(target.value) }
          data-testid="search-input"
        />
      </form>
    </>
  );

  return (
    <div className="headerContainer">
      <header className="header">
        <label htmlFor="profile">
          <input
            className="button"
            type="image"
            onClick={ () => history.push('/profile') }
            src={ profileIcon }
            data-testid="profile-top-btn"
            id="profile"
            alt="profile-icon-svg"
          />
        </label>
        <h3
          className="pageTitle"
          data-testid="page-title"
        >
          {pageTitle}
        </h3>
        {
          showSearchIcon
        && (
          <label htmlFor="search">
            <input
              type="image"
              onClick={ () => setShowSearchBar(!showSearchBar) }
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="search-icon"
            />
          </label>
        )
        }
      </header>
      {showSearchBar && searchForm }
    </div>
  );
}

export default Header;
