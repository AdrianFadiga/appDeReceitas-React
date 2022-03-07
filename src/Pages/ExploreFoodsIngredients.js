import React, { useEffect, useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function ExploreFoodsIngredients() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Explore Ingredients');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <h1>Página de ExploreFoodsIngredients</h1>
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
