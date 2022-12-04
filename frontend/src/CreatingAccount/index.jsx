import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ImageUpload from './PhotoUpload';
import { useNavigate } from 'react-router-dom';
import { FromProcess, FromProcessContainer } from './CreatingElements';
import { TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
function CreatingAccount () {
  const btnStyle={margin:'8px 0',backgroundColor:'#7300ff'};
  let navigate = useNavigate();
  const [cookies] = useCookies(null)
  const [state, setState] = useState({
    user_id: cookies.UserId,
    currentStep: 1,
    name: '',
    doB: '',
    workplace: '',
    favorite: '',
    beverage: '',
    about: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,    // <-- copy previous state
      [name]: value // <-- update property
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
          <Button
            style={btnStyle}
            variant='contained'
            type='button'
            onClick={_prev}
          >
            Previous
          </Button>
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
        <Button
          style={btnStyle}
          type='button'
          onClick={_next}
          data-cy='next-process'
          variant='contained'
        >
          Next
        </Button>
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
 
    <Stack spacing={3}>
      <label>
        <TextField
          value={props.name}
          onChange={props.handleChange}
          type='text'
          id='name'
          name='name'
          placeholder='Your name'
          required
          data-cy='input-name-process'
        />
      </label>

      <label>
      <TextField
          value={props.DoB}
          onChange={props.handleChange}
          className="form-control"
          type="date"
          id='date'
          name="DoB"
          placeholder="Date of Birth"
          required
        />
      </label>
     
      <label>
        <TextField
          value={props.workplace}
          onChange={props.handleChange}
          type='text'
          id='text'
          name='workplace'
          placeholder='Workplace: (Optional)'
          data-cy='input-workplace-process'
        />
      </label>
    </Stack>
    
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <Stack spacing={2}>
      <label>
        <TextField
          value={props.favorite}
          onChange={props.handleChange}
          type='text'
          id='favorite'
          name='favorite'
          placeholder='Favorite: (Optional)' 
        />
      </label>
      <label>
        <TextField
          value={props.beverage}
          onChange={props.handleChange}
          type='text'
          id='beverage'
          name='beverage'
          placeholder='Beverage: (Optional)'
        />
      </label>
      </Stack>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <>
      <Stack spacing={2}>
      <ImageUpload/>
     
        <label>
          <TextField
            value={props.about}
            onChange={props.handleChange}
            className='form-control'
            type='text'
            id='about'
            name='about'
            placeholder='Caption (Optional)'
          />
        </label>
 
      <Button
        type='submit'
        variant='contained'
        data-cy='submit-process'
        style={{
         margin:'8px 0',backgroundColor:'#7300ff'
        }}
      >
        Save it
      </Button>
      </Stack>
    </>
  );
}

export default CreatingAccount;
