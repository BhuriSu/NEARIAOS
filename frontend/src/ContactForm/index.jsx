import React ,{ useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import {
  StyledFormWrapper, StyledForm, TopicForm, StyledInput, StyledButton, StyledTextArea, StyledError,
} from './ContactFormElements';

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const toastifySuccess = () => {
    toast('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast',
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    const {
      name, email, subject, message,
    } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      // Use emailjs to email contact form data
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID,
      );

      // Reset contact form fields after submission
      reset();
      // Display success toast
      toastifySuccess();
      // Re-enable form submission
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledFormWrapper>

      <TopicForm>Contact Form</TopicForm>
      <br />
      <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Name */}
        <div className='row formRow'>
          <div className='col-6'>
            <StyledInput
              type='text'
              name='name'
              {...register('name', {
                required: {
                  value: true,
                  message: 'Please enter your name',
                },
                maxLength: {
                  value: 30,
                  message: 'Please use 30 characters or less',
                },
              })}
              placeholder='Name'
            />
            {errors.name && <StyledError>{errors.name.message}</StyledError>}
          </div>

          {/* Email */}
          <div className='col-6'>
            <StyledInput
              type='email'
              name='email'
              {...register('email', {
                required: true,
                pattern:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              placeholder='Email address'
            />
            {errors.email && (
            <StyledError>Please enter a valid email address</StyledError>
            )}
          </div>
        </div>

        {/* subject */}
        <div className='row formRow'>
          <div className='col'>
            <StyledInput
              type='text'
              name='subject'
              {...register('subject', {
                required: {
                  value: true,
                  message: 'Please enter a subject',
                },
                maxLength: {
                  value: 75,
                  message: 'Subject cannot exceed 75 characters',
                },
              })}
              placeholder='Subject'
            />
            {errors.subject && (
            <StyledError>{errors.subject.message}</StyledError>
            )}
          </div>
        </div>

        {/* message */}
        <div className='row formRow'>
          <div className='col'>
            <StyledTextArea
              rows={3}
              name='message'
              {...register('message', {
                required: true,
              })}
              placeholder='Message'
            />
            {errors.message && <StyledError>Please enter a message</StyledError>}
          </div>
        </div>

        <StyledButton disabled={disabled} type='submit'>
          Submit
        </StyledButton>

      </StyledForm>
      <ToastContainer />
    </StyledFormWrapper>
  );
}

export default ContactForm;
