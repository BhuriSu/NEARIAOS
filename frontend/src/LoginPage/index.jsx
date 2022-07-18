import React, { useEffect } from "react";
import { Link , useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { requestFetchLogin } from "../redux/action";
import { useAuth } from "../context";
import { LoginContainer, LoginText, ForgotButton, ButtonGoogle } from "./LoginPageElement";

function Login(props) {
  const { user, err, requestFetchLogin } = props;
  const [cookies, setCookie] = useCookies(["userName", "userNickname"]);
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  function handleRedirectToOrBack() {
    navigate(location.state?.from ?? "/listUsers" , { replace: true })
  }

  async function PutData(event) {
    event.preventDefault();
    try {
      const {
        mail: { value: email },
        password: { value: password }
      } = event.target;
      requestFetchLogin(email, password);
      navigate('/listUsers');
    } catch (err) {
      console.error(err);
      alert(err.message);
      console.log('Not Authorized');
    }
  }

  useEffect(() => {
    if (user.id) {
      setCookie("userName", user.id);
      setCookie("userNickname", user.nickname);
    }
  }, [user.id, setCookie, user.nickname]);

  return (
    <LoginContainer>
      {cookies.userName ? (
        user.profileId 
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
         
          <ButtonGoogle onClick ={() =>
              signInWithGoogle()
              .then(user => {
                handleRedirectToOrBack()
                console.log(user)
              })
              .catch(e => console.log(e.message))
            }>Sign in with Google</ButtonGoogle>

            <br/>
            <br/>
             <ForgotButton to="/forgotPassword" >Forgot Password?</ForgotButton>
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