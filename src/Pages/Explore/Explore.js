import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import style from './Explore.module.css';

function Explore() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    setPageTitle('Explore');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <section className={ style.explorePage }>
        <Button
          onClick={ () => history.push('/explore/foods') }
          variant="secondary"
          data-testid="explore-foods"
        >
          Explore Foods

        </Button>
        <Button
          variant="secondary"
          onClick={ () => history.push('/explore/drinks') }
          data-testid="explore-drinks"
        >
          Explore Drinks

        </Button>
      </section>
      <Footer />
    </>
  );
}

export default Explore;
