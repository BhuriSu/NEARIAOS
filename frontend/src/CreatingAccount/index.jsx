import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FirstLineCreateAccount,CreatingContainer,FormAccount,
    FormSection,LabelAccount,InputAccount,InputAccountSubmit,ContainerDob
      } from './CreateElements';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreatingAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    workplace: '',
    favorite: '',
    beverage: '',
    about: '',
  });

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/users", formData);
      navigate("/listUsers");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  return (

          <CreatingContainer>
         
              <FirstLineCreateAccount>CREATE ACCOUNT</FirstLineCreateAccount>

              <FormAccount onSubmit={handleSubmit}>
                  <FormSection>
                      <LabelAccount htmlFor="name">Name</LabelAccount>
                      <InputAccount
                          id="name"
                          type='text'
                          name="name"
                          placeholder="name"
                          required={true}
                          value={formData.name}
                          onChange={handleChange}
                      />

                      <LabelAccount htmlFor="birthday">Birthday</LabelAccount>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <ContainerDob>
                      <DatePicker 
                      label="Date of birth" 
                      id="dob"
                      type="number"
                      name="dob"
                      value={formData.dob}
                      onChange={formData => handleChange({ target: { value: formData, name: 'dob' } })}
                      required={true}
                      />
                      </ContainerDob>
                      </LocalizationProvider>

                      <LabelAccount htmlFor="workplace">Workplace</LabelAccount>
                      <InputAccount
                          id="workplace"
                          type="text"
                          name="workplace"
                          required={true}
                          placeholder="workplace..."
                          value={formData.workplace}
                          onChange={handleChange}
                      />


                      <LabelAccount htmlFor="beverage">Beverage</LabelAccount>
                      <InputAccount
                          id="beverage"
                          type="text"
                          name="beverage"
                          required={true}
                          placeholder="Beverage..."
                          value={formData.beverage}
                          onChange={handleChange}
                      />

                      <LabelAccount htmlFor="favorite">Favorite</LabelAccount>
                      <InputAccount
                          id="favorite"
                          type="text"
                          name="favorite"
                          required={true}
                          placeholder="Favorite..."
                          value={formData.favorite}
                          onChange={handleChange}
                      />

                      <LabelAccount htmlFor="about">About</LabelAccount>
                      <InputAccount
                          id="about"
                          type="text"
                          name="about"
                          required={true}
                          placeholder="About..."
                          value={formData.about}
                          onChange={handleChange}
                      />
   
                      <InputAccountSubmit type="submit"/>
                  </FormSection>
              </FormAccount>
        
          </CreatingContainer>
    
  )
}
export default CreatingAccount;