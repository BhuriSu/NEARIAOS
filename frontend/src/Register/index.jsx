import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { requestFetchRegister } from '../redux/action';
import './Register.css';
import { RegisterContainer, RegisterText } from './RegisterElements';

function Register(props) {
  const [cookies, setCookie] = useCookies(['userName', 'userNickname']);

  const { requestFetchRegister, err, user } = props;

  function PutData(event) {
    event.preventDefault();
    const {
      nick: { value: nickname },
      mail: { value: email },
      password: { value: password },
    } = event.target;
    requestFetchRegister(nickname, email, password);
  }
  useEffect(() => {
    if (user.id) {
      setCookie('userNickname', user.nickname);
      setCookie('userName', user.id);
    }
  }, [user.id, setCookie, user.nickname]);

  return (
    <RegisterContainer>
     
      {cookies.userName ? (
        <Navigate to="/process" />
      ) : (

        <form
          onSubmit={PutData}
          className="form "
        >
          <RegisterText>New Account</RegisterText>
          <label>
            <input
              name="nick"
              type="text"
              placeholder="Nickname"
              required
            />
          </label>
          <label>
            <input
              name="mail"
              type="email"
              placeholder="Email Address"
              required
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              minLength="5"
              required
            />
          </label>
          <button
            type="submit"
            className="RegisterButton"
          >
            Create
          </button>
          <div style={{ color: 'red', textAlign: 'center' }}>{err.title}</div>
          <br />
          <Link to="/login">
            <button
              className="RegisterButton"
            >
              LogIn
            </button>
          </Link>
        </form>

      )}
    </RegisterContainer>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  err: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  requestFetchRegister: (nickname, email, password) => dispatch(requestFetchRegister(nickname, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
