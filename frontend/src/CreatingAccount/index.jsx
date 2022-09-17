import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "./PhotoUpload";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import { FromProcess, FromProcessContainer, ButtonCreate } from "./CreatingElements";

function CreatingAccount () {
  let navigate = useNavigate();
  const [cookies] = useCookies(null)
  const [state, setState] = useState({
    user: cookies.UserId,
    currentStep: 1,
    name: "",
    doB: "",
    workplace: "",
    favorite: "",
    beverage: "",
    about: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,    // <-- copy previous state
      [name]: value, // <-- update property
    }));
  };

  const handleSubmit = async e => {
    console.log('submitted')
    e.preventDefault();
 
    try {
        const response = await axios.post('/users/profile', { state });
        console.log(response)
        const success = response.status === 200
        if (success) navigate('/listUsers')
    } catch (err) {
        console.log(err)
    }
  };

  const _next = () => {
    let currentStep = state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    setState(state => ({
      ...state,    // <-- copy previous state
      currentStep: currentStep// <-- update property
    }));
  };

  const _prev = () => {
    let currentStep = state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setState(state => ({
      ...state,    // <-- copy previous state
      currentStep: currentStep// <-- update property
    }));
  };
  
  function previousButton() {
    let currentStep = state.currentStep;
    if (currentStep !== 1) {
      return (
        <>
          <ButtonCreate
            style={{ color: "#3103ff" }}
            className="btn"
            type="button"
            onClick={_prev}
          >
            Previous
          </ButtonCreate>
          <br />
        </>
      );
    }
    return null;
  }
  
  function nextButton() {
    let currentStep = state.currentStep;
    if (currentStep < 3) {
      return (
        <ButtonCreate
          className="btn"
          type="button"
          onClick={_next}
          data-cy="next-process"
          style={{
            marginBottom: "25px",
            color: "#FFF",
            backgroundColor: "#3103ff"
          }}
        >
          Next
        </ButtonCreate>
      );
    }
    return null;
  }
  return (
    <>
     <FromProcessContainer>
      <FromProcess onSubmit={handleSubmit} >
        <p>Step {state.currentStep}</p>
        <br/>
        <Step1
          currentStep={state.currentStep}
          handleChange={handleChange}
          name={state.name}
          doB={state.doB}
          workplace={state.workplace}
        />
        <Step2
          currentStep={state.currentStep}
          handleChange={handleChange}
          favorite={state.favorite}
          beverage={state.beverage}
        />
        <Step3
          currentStep={state.currentStep}
          handleChange={handleChange}
          about={state.about}
        />
        {previousButton()}
        {nextButton()}
      </FromProcess>
      </FromProcessContainer>
    </>
  );
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <label>
        <input
          value={props.name}
          onChange={props.handleChange}
          type="text"
          name="name"
          placeholder="Your name"
          required
          data-cy="input-name-process"
        />
      </label>
      <label>
        <input
          value={props.doB}
          onChange={props.handleChange}
          type="date"
          name="doB"
          placeholder="Date of Birth"
          max="2010-01-01"
          min="1930-12-31"
          required
          data-cy="input-dob-process"
        />
      </label>
      <label>
        <input
          value={props.workplace}
          onChange={props.handleChange}
          type="text"
          name="workplace"
          placeholder="Workplace or study: (Optional)"
          data-cy="input-workplace-process"
        />
      </label>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <label>
        <input
          value={props.favorite}
          onChange={props.handleChange}
          type="text"
          name="favorite"
          placeholder="Favorite: (Optional)" 
        />
      </label>
      <label>
        <input
          type="text"
          value={props.beverage}
          onChange={props.handleChange}
          name="beverage"
          placeholder="Beverage: (Optional)"
        />
      </label>
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <>
      <ImageUpload/>
      <div className="form-group">
        <label>
          <input
            value={props.about}
            onChange={props.handleChange}
            className="form-control"
            type="text"
            name="about"
            placeholder="Caption (Optional)"
          />
        </label>
      </div>
      <button
        type="submit"
        className="btn"
        data-cy="submit-process"
        style={{
          backgroundColor: "#3103ff",
          marginBottom: "25px",
          color: "#FFF"
        }}
      >
        Save it
      </button>
      
    </>
  );
}


export default CreatingAccount;
