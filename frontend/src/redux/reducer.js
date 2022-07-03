import { LOGIN, PROFILE_INIT } from './action-types';

const init = {
  id: '',
  nickname: '',
  profileId: '',
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.id,
        nickname: action.nickname,
        profileId: action.profileId,
      };
    case PROFILE_INIT:
      return {
        ...state,
        profileId: action.profileId,
      };

    default:
      return state;
  }
};
export default reducer;
