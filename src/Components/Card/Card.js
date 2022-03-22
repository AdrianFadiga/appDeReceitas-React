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
      className="cardContainer"
      to={ `${link}` }
      style={ { textDecoration: 'none',
        color: 'black',
        width: '45%',
        maxHeight: '250px',
        display: 'flex',
        textAlign: 'center',
      } }
    >
      <NovoCard
        data-testid={ cardTestId }
        style={ { overflow: 'hidden',
          textOverflow: 'ellipsis' } }
      >
        <NovoCard.Body>
          <NovoCard.Img
            variant="top"
            src={ strThumb }
            alt={ recipeTitle }
            data-testid={ imgTestId }
          />
          <NovoCard.Title
            style={ { lineHeight: '20px',
              fontSize: '18px' } }
            data-testid={ titleTestid }

          >
            {recipeTitle}
          </NovoCard.Title>
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
