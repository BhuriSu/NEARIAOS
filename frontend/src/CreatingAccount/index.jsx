import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ImageUpload from './PhotoUpload';
import { useNavigate } from 'react-router-dom';
import { FirstLineCreateAccount,CreatingContainer,FormAccount,
    FormSection,LabelAccount,InputAccount,InputAccountSubmit,
     MultipleContainer,MultipleInputAccount,MultipleLabelAccount,
     LabelAccountPhoto,PhotoContainer } from './CreateElements';

const CreatingAccount = () => {
  const [cookies] = useCookies(null);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    workplace: '',
    favorite: '',
    beverage: '',
    about: ''
  })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
      console.log('submitted')
      e.preventDefault()
      try {
          const response = await axios.put('http://localhost:8000/user', {formData})
          console.log(response)
          const success = response.status === 200
          if (success) navigate('/listUsers')
      } catch (err) {
          console.log(err)
      }
  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
          ...prevState,
          [name]: value
      }))
  }

  return (
      <>
          <CreatingContainer>
         
              <FirstLineCreateAccount>CREATE ACCOUNT</FirstLineCreateAccount>

              <FormAccount onSubmit={handleSubmit}>
                  <FormSection>
                      <LabelAccount htmlFor="name">First Name</LabelAccount>
                      <InputAccount
                          id="name"
                          type='text'
                          name="name"
                          placeholder="name"
                          required={true}
                          value={formData.name}
                          onChange={handleChange}
                      />

                      <MultipleLabelAccount>Birthday</MultipleLabelAccount>
                      <MultipleContainer>
                          <MultipleInputAccount
                              id="dob_day"
                              type="number"
                              name="dob_day"
                              placeholder="DD"
                              required={true}
                              value={formData.dob_day}
                              onChange={handleChange}
                          />

                          <MultipleInputAccount
                              id="dob_month"
                              type="number"
                              name="dob_month"
                              placeholder="MM"
                              required={true}
                              value={formData.dob_month}
                              onChange={handleChange}
                          />

                          <MultipleInputAccount
                              id="dob_year"
                              type="number"
                              name="dob_year"
                              placeholder="YYYY"
                              required={true}
                              value={formData.dob_year}
                              onChange={handleChange}
                          />
                      </MultipleContainer>

                      <LabelAccount htmlFor="workplace">Workplace</LabelAccount>
                      <InputAccount
                          id="workplace"
                          type="text"
                          name="workplace"
                          required={true}
                          placeholder="Corporation..."
                          value={formData.workplace}
                          onChange={handleChange}
                      />


                      <LabelAccount htmlFor="beverage">Beverage</LabelAccount>
                      <InputAccount
                          id="beverage"
                          type="text"
                          name="beverage"
                          required={true}
                          placeholder="Aberlour..."
                          value={formData.beverage}
                          onChange={handleChange}
                      />

                      <LabelAccount htmlFor="favorite">Favorite</LabelAccount>
                      <InputAccount
                          id="favorite"
                          type="text"
                          name="favorite"
                          required={true}
                          placeholder="Gaming..."
                          value={formData.favorite}
                          onChange={handleChange}
                      />

                      <LabelAccount htmlFor="about">About me</LabelAccount>
                      <InputAccount
                          id="about"
                          type="text"
                          name="about"
                          required={true}
                          placeholder="Software engineer..."
                          value={formData.about}
                          onChange={handleChange}
                      />

                      <InputAccountSubmit type="submit"/>
                  </FormSection>

                  <FormSection>

                      <LabelAccountPhoto htmlFor="url">Profile</LabelAccountPhoto>
                      <PhotoContainer>
                      <ImageUpload/>
                      </PhotoContainer>

                  </FormSection>

              </FormAccount>
        
          </CreatingContainer>
      </>
  )
}
export default CreatingAccount;