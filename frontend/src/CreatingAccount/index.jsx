import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FirstLineCreateAccount,CreatingContainer,FormAccount,
    FormSection,LabelAccount,InputAccount,InputAccountSubmit
      } from './CreateElements';

const CreatingAccount = () => {
  const [cookies] = useCookies(null);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    name: '',
    dob: '',
    workplace: '',
    favorite: '',
    beverage: '',
    about: '',
  })

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", {formData});
      navigate("/listUsers");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
          ...prevState,
          [name]: value
      }))
  }

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
                      <InputAccount
                              id="dob"
                              type="number"
                              name="dob"
                              placeholder="Date of birth"
                              required={true}
                              value={formData.dob}
                              max="2002-03-13"
                              min="1920-12-31"
                              onChange={handleChange}
                          />

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