import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { checkEmailSenha } from '../../Helpers';
import logo from '../../images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const setLocalStorage = () => {
    let key = 'mealsToken';
    localStorage.setItem(key, '1');
    key = 'cocktailsToken';
    localStorage.setItem(key, '1');
    const objEmail = { email };
    key = 'user';
    localStorage.setItem(key, JSON.stringify(objEmail));
    history.push('/foods');
  };

  useEffect(() => {
    const check = checkEmailSenha(email, senha);
    if (check) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, senha]);

  return (
    <div className="loginPage">
      <Form
        className="formContainer"
      >
        <div className="imgContainer">
          <img src={ logo } alt="logoIfood" />
        </div>
        <Form.Group
          className="mb-3"
        >
          <input
            data-testid="email-input"
            type="text"
            placeholder="Email..."
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
        >
          <input
            value={ senha }
            data-testid="password-input"
            type="password"
            placeholder="Senha..."
            onChange={ ({ target }) => setSenha(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={ setLocalStorage }
          disabled={ disabled }
          data-testid="login-submit-btn"
          type="button"
        >
          Enter
        </Button>
      </Form>
    </div>
  );
}

export default Login;
