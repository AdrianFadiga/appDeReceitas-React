import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipeCard({ index,
  alcoholicOrNot,
  category,
  doneDate,
  id,
  image,
  name,
  nationality,
  tags,
  type,
}) {
  const validate = (type === 'food');
  const foodOrDrink = (validate ? 'foods' : 'drinks');
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const history = useHistory();

  return (
    <div>
      <Link to={ `/${foodOrDrink}/${id}` }>
        <input
          style={ { width: '300px' } }
          type="image"
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="foto-da-receita"
          onClick={ () => history.push(`/${foodOrDrink}/${id}`) }
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {validate ? (`${nationality} - ${category}`) : alcoholicOrNot}
        </p>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {doneDate}
      </p>
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
      { tags.map((tag) => (
        <span
          key={ index }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default DoneRecipeCard;
