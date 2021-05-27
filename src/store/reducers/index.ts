import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../history';
import auth from './auth';
import user from './user';
import ssr from './ssr';
import theme from './theme';
import leaderboard from './leaderboard';

const reducer = combineReducers({
  router: connectRouter(history),
  auth,
  user,
  ssr,
  theme,
  leaderboard,
});

export default reducer;
