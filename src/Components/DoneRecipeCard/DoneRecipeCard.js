import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge, Card as NovoCard } from 'react-bootstrap';
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
    <NovoCard
      style={ { display: 'flex',
        flexDirection: 'row' } }
    >
      <NovoCard.Img
        style={ { maxWidth: '50%',
          maxHeight: '50%',
          padding: '5px' } }
        type="image"
        src={ image }
        data-testid={ `${index}-horizontal-image` }
        alt="foto-da-receita"
        onClick={ () => history.push(`/${foodOrDrink}/${id}`) }
      />
      <NovoCard.Body
        style={ { width: '50%',
          heigth: '50%' } }
      >
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
        <NovoCard.Text
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Done in: ${doneDate}`}
        </NovoCard.Text>
        { tags.map((tag) => (
          <Badge
            style={ { backgroundColor: '#6c757d' } }
            key={ index }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </Badge>
        ))}
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
      </NovoCard.Body>
    </NovoCard>

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
