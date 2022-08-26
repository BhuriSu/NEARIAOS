import React, { useState } from "react";
import axios from "axios";
import { LogIn } from "../redux/action";
import { connect } from "react-redux";
import ImageUpload from "./PhotoUpload";
import { useNavigate } from "react-router-dom";
import { FromProcess, FromProcessContainer, ButtonCreate } from "./CreatingElements";

function CreatingAccount (props) {
  const navigate = useNavigate();
  const [state,setState] = useState({
    currentStep: 1,
    name: "",
    DoB: "",
    activity: "",
    topics: "",
    drinks: "",
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
    e.preventDefault();
    const { user } = props;
    let { name, DoB, activity, topics, drinks, about } = state;
    await axios.post("/users/profile", {
      name,
      DoB,
      activity,
      topics,
      drinks,
      about,
      id: user.id
    })
    .catch(({error}) => {
      console.log(error);
    });
    const profileId = {
      person: user.id,
      name,
      DoB,
      activity,
      about,
      topics,
      drinks
    };
   LogIn(user.id, user.nickname, profileId);
   navigate("/listUsers");
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
          DoB={state.DoB}
          activity={state.activity}
        />
        <Step2
          currentStep={state.currentStep}
          handleChange={handleChange}
          topics={state.topics}
          drinks={state.drinks}
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
          value={props.DoB}
          onChange={props.handleChange}
          type="date"
          name="DoB"
          placeholder="Date of Birth"
          max="2010-01-01"
          min="1930-12-31"
          required
          data-cy="input-Dob-process"
        />
      </label>
      <label>
        <input
          value={props.activity}
          onChange={props.handleChange}
          type="text"
          name="activity"
          required
          placeholder="Place of work or study (required)"
          data-cy="input-activity-process"
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
          value={props.topics}
          onChange={props.handleChange}
          type="text"
          name="topics"
          placeholder="Favorite topics: (Optional)" 
        />
      </label>
      <label>
        <input
          type="text"
          value={props.drinks}
          onChange={props.handleChange}
          name="drinks"
          placeholder="Favorite drink: (Optional)"
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

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  LogIn: (id, nickname, profileId) => dispatch(LogIn(id, nickname, profileId))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreatingAccount);
