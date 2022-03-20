import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card as NovoCard } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipeCard({ index,
  alcoholicOrNot,
  category,
  id,
  image,
  name,
  nationality,
  type,
  handleClick,
}) {
  const validate = (type === 'food');
  const foodOrDrink = (validate ? 'foods' : 'drinks');
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const history = useHistory();
  return (
    <NovoCard
      style={ { width: '100%', height: '25%' } }
    >
      <NovoCard.Img
        style={ { width: '300px' } }
        type="image"
        src={ image }
        data-testid={ `${index}-horizontal-image` }
        alt="foto-da-receita"
        onClick={ () => history.push(`/${foodOrDrink}/${id}`) }
      />
      <NovoCard.Body>
        <NovoCard.Subtitle
          data-testid={ `${index}-horizontal-top-text` }
        >
          {validate ? (`${nationality} - ${category}`) : alcoholicOrNot}
        </NovoCard.Subtitle>
        <NovoCard.Title
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </NovoCard.Title>
        <label htmlFor={ index }>
          <input
            data-testid={ `${index}-horizontal-share-btn` }
            value={ `http://localhost:3000/${foodOrDrink}/${id}` }
            type="image"
            src={ shareIcon }
            id={ index }
            alt="share-icon"
            onClick={ ({ target }) => {
              setShowLinkCopied(true);
              navigator.clipboard.writeText(target.value);
            } }
          />
        </label>
        {showLinkCopied && <p>Link copied!</p>}
        <label htmlFor="favorite-btn">
          <input
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="image"
            src={ blackHeartIcon }
            alt="botao-favoritado"
            onClick={ () => handleClick(id, type) }
          />
        </label>
      </NovoCard.Body>
    </NovoCard>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  // doneDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
