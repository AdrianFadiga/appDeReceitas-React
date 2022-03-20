import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card as NovoCard } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ link,
  recipeTitle,
  strThumb,
  cardTestId,
  titleTestid,
  imgTestId,
}) {
  return (
    <Link
      to={ `${link}` }
      style={ { textDecoration: 'none',
        color: 'black',
        width: '45%' } }
    >
      <NovoCard
        data-testid={ cardTestId }
      >
        <NovoCard.Body>
          <NovoCard.Img
            variant="top"
            src={ strThumb }
            alt={ recipeTitle }
            data-testid={ imgTestId }
          />
          <NovoCard.Footer>
            <NovoCard.Title
              data-testid={ titleTestid }
            >
              {recipeTitle}
            </NovoCard.Title>
          </NovoCard.Footer>
        </NovoCard.Body>
      </NovoCard>
    </Link>
  );
}

Card.propTypes = {
  link: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  cardTestId: PropTypes.string.isRequired,
  titleTestid: PropTypes.string.isRequired,
  imgTestId: PropTypes.string.isRequired,
};

export default Card;
