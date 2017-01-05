import { combineReducers } from 'redux';

import userLogin from '../../common/reducers/user-login';
import userProfile from '../../common/reducers/user-profile';
import alert from '../../common/reducers/rx-alert';
import disclaimer from '../../common/reducers/rx-disclaimer';
import modals from '../../common/reducers/rx-modals';
import prescriptions from '../../common/reducers/rx-prescriptions';


export default combineReducers({
  userLogin,
  userProfile,
  health: combineReducers({
    rx: combineReducers({
      alert,
      disclaimer,
      modals,
      prescriptions
    }),
  }),
});

