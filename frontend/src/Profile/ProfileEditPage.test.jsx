import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProfileEditPage from './index';
import { beforeEach, describe, expect, it } from 'vitest'

const mockStore = configureStore([]);

describe('ProfileEditPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentUser: {
          _id: '123',
          username: 'testuser',
          date: '2024-05-06',
          beverage: 'Coffee',
          workplace: 'Home',
          favorite: 'Music',
          about: 'Lorem ipsum dolor sit amet',
          profilePicture: 'https://example.com/profile.jpg',
        },
        loading: false,
        error: null,
      },
    });
  });

  it('renders with currentUser data', () => {
    render(
      <Provider store={store}>
        <ProfileEditPage />
      </Provider>
    );

    expect(screen.getByLabelText('username')).toHaveValue('testuser');
    expect(screen.getByLabelText('date')).toHaveValue('2024-05-06');
    expect(screen.getByLabelText('beverage')).toHaveValue('Coffee');
    expect(screen.getByLabelText('workplace')).toHaveValue('Home');
    expect(screen.getByLabelText('favorite')).toHaveValue('Music');
    expect(screen.getByLabelText('about')).toHaveValue('Lorem ipsum dolor sit amet');
    expect(screen.getByAltText('user')).toHaveAttribute('src', 'https://example.com/profile.jpg');
  });
});
