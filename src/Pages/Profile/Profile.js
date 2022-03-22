import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';
import './Profile.css';

function Profile() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const history = useHistory();
  const [email, setEmail] = useState();

  const getEmail = () => {
    const res = JSON.parse(localStorage.getItem('user'));
    if (res !== null) {
      setEmail(res.email);
    }
  };

  useEffect(() => {
    setPageTitle('Profile');
    setShowSearchIcon(false);
  }, []);

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <section className="profilePage">
      <Header />
      <section className="profileData">
        <h2 data-testid="profile-email">{ email }</h2>
        <Button
          variant="secondary"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </Button>

        <Button
          variant="secondary"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
      </section>
      <Footer />
    </section>
  );
}

export default Profile;
