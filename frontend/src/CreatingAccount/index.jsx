import React from "react";
import axios from "axios";
import { LogIn } from "../redux/action";
import { connect } from "react-redux";
import ImageUpload from "./PhotoUpload";
import {FromProcess,FromProcessContainer,ButtonCreate} from "./CreatingElements"

class CreatingAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      name: "",
      DoB: "",
      activity: "",
      topics: "",
      drinks: "",
      about: "",
      random: 0
    };
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { user } = this.props;
    let { name, DoB, activity, topics, drinks, about } = this.state;
    await axios.post("/users/profile", {
      name,
      DoB,
      activity,
      topics,
      drinks,
      about,
      id: user.id
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
    this.props.LogIn(user.id, user.nickname, profileId);
    this.props.navigate("/listUsers");
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

 
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <>
          <ButtonCreate
            style={{ color: "#3103ff" }}
            className="btn"
            type="button"
            onClick={this._prev}
          >
            Previous
          </ButtonCreate>
          <br />
        </>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <ButtonCreate
          className="btn"
          type="button"
          onClick={this._next}
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

  render() {
    return (
      <>
       <FromProcessContainer>
        <FromProcess onSubmit={this.handleSubmit} >
          <p>Step {this.state.currentStep}</p>
          <br/>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            name={this.state.name}
            DoB={this.state.DoB}
            activity={this.state.activity}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            topics={this.state.topics}
            drinks={this.state.drinks}
          />
          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            about={this.state.about}
          />
          {this.previousButton()}
          {this.nextButton()}
        </FromProcess>
        </FromProcessContainer>
      </>
    );
  }
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
          min="1920-12-31"
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
