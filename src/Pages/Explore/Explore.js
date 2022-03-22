import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import './Explore.css';

function Explore() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Explore');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <section className="explorePage">
        <Link to="/explore/foods" data-testid="explore-foods">Explore Foods</Link>
        <Link to="/explore/drinks" data-testid="explore-drinks">Explore Drinks</Link>
      </section>
      <Footer />
    </>
  );
}

export default Explore;
