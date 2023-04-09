import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FirstLineCreateAccount,Create_a_accountContainer,FormAccount,
    FormSection,LabelAccount,InputAccount,InputAccountSubmit,ContainerDob
      } from './CreateElements';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Create_a_account = () => {
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
      const headers = {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json',
      };
      await axios.post("/users/profile", { formData }, { headers });
      navigate("/listUsers", { state: formData });
    } catch (error) {
      console.log(error);
    }
  };
 
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await axios.get("/api/csrf-token");
      setCsrfToken(response.data.csrfToken);
    };
    fetchCsrfToken();
  }, []);

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(name);
  }

  const handleChange = (e) => {
  const {name, value} = e.target;
  let isValid = true;
  if (name === 'name') {
    isValid = validateName(value);
  }
  setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: !isValid
  });
};

  return (
          <Create_a_accountContainer>
              <FirstLineCreateAccount>CREATE ACCOUNT</FirstLineCreateAccount>
              <FormAccount onSubmit={handleSubmit} >
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
          </Create_a_accountContainer>
  )
}
export default Create_a_account;