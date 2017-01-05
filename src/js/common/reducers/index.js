import { combineReducers } from 'redux';

import login from '../../common/reducers/user-login';
import profile from '../../common/reducers/user-profile';
import alert from '../../common/reducers/rx-alert';
import disclaimer from '../../common/reducers/rx-disclaimer';
import modals from '../../common/reducers/rx-modals';
import prescriptions from '../../common/reducers/rx-prescriptions';


export default combineReducers({
  user: combineReducers({
    login,
    profile,
  }),
  health: combineReducers({
    rx: combineReducers({
      alert,
      disclaimer,
      modals,
      prescriptions
    }),
  }),
});

