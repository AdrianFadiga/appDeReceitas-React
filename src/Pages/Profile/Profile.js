import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../MyContext/MyContext';

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
    <>
      <Header />

      <h2 data-testid="profile-email">{ email }</h2>

      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>

      <Footer />
    </>
  );
}

export default Profile;
