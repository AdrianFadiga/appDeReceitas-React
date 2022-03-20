import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryListButton = ({ onClick, strCategory }) => (
  <Button
    type="button"
    variant="secondary"
    onClick={ onClick }
    id={ strCategory }
    data-testid={ `${strCategory}-category-filter` }
    style={ { width: '100%' } }
  >
    {strCategory}
  </Button>
);

CategoryListButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  strCategory: PropTypes.string.isRequired,
};

export default CategoryListButton;
