import React, { useEffect } from "react";
import { Link , Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { requestFetchLogin } from "../redux/action";
import { LoginContainer, LoginText } from "./LoginPageElement";

function Login(props) {
  const { user, err, requestFetchLogin } = props;
  const [cookies, setCookie] = useCookies(["userName", "userNickname"]);
 

  async function PutData(event) {
    event.preventDefault();
      const {
        mail: { value: email },
        password: { value: password }
      } = event.target;
      requestFetchLogin(email, password);
  }

  useEffect(() => {
    if (user.id) {
      setCookie("userName", user.id);
      setCookie("userNickname", user.nickname);
    }
  }, [user.id, user.nickname]);

  return (
    <LoginContainer>
      {cookies.userName ? (
        user.profileId ? (
          <Navigate from="/login" to="/listUsers" />
        ) : (
          <Navigate to="/process"/>
        )
      ) : (
        <form
          onSubmit={PutData}
          className="form"
        >
          <LoginText>Login</LoginText>
          <label>
            <input
              name="mail"
              type="email"
              placeholder="Email Address"
              required
              data-cy="input-email"
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              minLength="5"
              required
              data-cy="input-password"
            />
          </label>
          <button 
            className="LoginButton"
            type="submit"
            data-cy="login-submit-button"
          >
            LogIn 
          </button>
          <div style={{ color: "red", textAlign: "center" }}>{err.title}</div>
          <br />
          <Link to="/register">
            <button 
              className="LoginButton"
              type="submit"
            >
              SignUp 
            </button>
          </Link>
         
        </form>
      )}
    </LoginContainer>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  err: state.error
});
const mapDispatchToProps = dispatch => ({
  requestFetchLogin: (email, password) =>
    dispatch(requestFetchLogin(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);