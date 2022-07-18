import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { requestFetchRegister } from "../redux/action";
import "./Register.css";
import { RegisterContainer, RegisterText } from "./RegisterElements";

function Register(props) {
  const [ setCookie ] = useCookies(["userName", "userNickname"]);
  const { requestFetchRegister, err, user } = props;
  const navigate = useNavigate();
  function PutData(event) {
    event.preventDefault();
    try {
      const {
        nick: { value: nickname },
        mail: { value: email },
        password: { value: password },
      } = event.target;
      requestFetchRegister(nickname, email, password);
      navigate('/process');
    } catch (err) {
      console.error(err);
      alert(err.message);
      console.log('Not Authorized');
    }
  }
  
  useEffect(() => {
    if (user.id) {
      setCookie("userNickname", user.nickname);
      setCookie("userName", user.id);
    }
  }, [user.id, setCookie, user.nickname]);

  return (
    <RegisterContainer>
     
     
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
          <div style={{ color: "red", textAlign: "center" }}>{err.title}</div>
          <br />
          <Link to="/login">
            <button
              className="RegisterButton"
            >
              LogIn
            </button>
          </Link>
        </form>

      
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
